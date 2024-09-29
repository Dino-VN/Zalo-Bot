import FormData from "form-data";
import fs from "fs";
import { appContext } from "../context.js";
import { Zalo, ZaloApiError } from "../index.js";
import { MessageType } from "../models/Message.js";
import { encodeAES, getFileExtension, getFileName, getFileSize, getImageMetaData, getMd5LargeFileObject, handleZaloResponse, makeURL, request, } from "../utils.js";
const urlType = {
    image: "photo_original/upload",
    video: "asyncfile/upload",
    others: "asyncfile/upload",
};
export function uploadAttachmentFactory(serviceURL, api) {
    const { sharefile } = appContext.settings.features;
    function isExceedMaxFile(totalFile) {
        return totalFile > sharefile.max_file;
    }
    function isExceedMaxFileSize(fileSize) {
        return fileSize > sharefile.max_size_share_file_v3 * 1024 * 1024;
    }
    function isExtensionValid(ext) {
        return sharefile.restricted_ext_file.indexOf(ext) == -1;
    }
    /**
     * Upload an attachment to a thread
     *
     * @param filePaths Path to the file
     * @param threadId group or user id
     * @param type Message type (DirectMessage or GroupMessage)
     *
     * @throws ZaloApiError
     */
    return async function uploadAttachment(filePaths, threadId, type = MessageType.DirectMessage) {
        if (!appContext.secretKey)
            throw new ZaloApiError("Secret key is not available");
        if (!appContext.imei)
            throw new ZaloApiError("IMEI is not available");
        if (!appContext.cookie)
            throw new ZaloApiError("Cookie is not available");
        if (!appContext.userAgent)
            throw new ZaloApiError("User agent is not available");
        if (!filePaths || filePaths.length == 0)
            throw new ZaloApiError("Missing filePaths");
        if (isExceedMaxFile(filePaths.length))
            throw new ZaloApiError("Exceed maximum file of " + sharefile.max_file);
        if (!threadId)
            throw new ZaloApiError("Missing threadId");
        const chunkSize = appContext.settings.features.sharefile.chunk_size_file;
        const isGroupMessage = type == MessageType.GroupMessage;
        let attachmentsData = [];
        let url = `${serviceURL}/${isGroupMessage ? "group" : "message"}/`;
        const query = {
            zpw_ver: Zalo.API_VERSION,
            zpw_type: Zalo.API_TYPE,
            type: isGroupMessage ? "11" : "2",
        };
        let clientId = Date.now();
        for (const filePath of filePaths) {
            if (!fs.existsSync(filePath))
                throw new ZaloApiError("File not found");
            const extFile = getFileExtension(filePath);
            const fileName = getFileName(filePath);
            if (isExtensionValid(extFile) == false)
                throw new ZaloApiError(`File extension "${extFile}" is not allowed`);
            const data = {
                filePath,
                chunkContent: [],
                params: {},
            };
            if (isGroupMessage)
                data.params.grid = threadId;
            else
                data.params.toid = threadId;
            switch (extFile) {
                case "jpg":
                case "jpeg":
                case "png":
                case "webp":
                    let imageData = await getImageMetaData(filePath);
                    if (isExceedMaxFileSize(imageData.totalSize))
                        throw new ZaloApiError(`File ${fileName} size exceed maximum size of ${sharefile.max_size_share_file_v3}MB`);
                    data.fileData = imageData;
                    data.fileType = "image";
                    data.params.totalChunk = Math.ceil(data.fileData.totalSize / chunkSize);
                    data.params.fileName = fileName;
                    data.params.clientId = clientId++;
                    data.params.totalSize = imageData.totalSize;
                    data.params.imei = appContext.imei;
                    data.params.isE2EE = 0;
                    data.params.jxl = 0;
                    data.params.chunkId = 1;
                    break;
                case "mp4":
                    let videoSize = await getFileSize(filePath);
                    if (isExceedMaxFileSize(videoSize))
                        throw new ZaloApiError(`File ${fileName} size exceed maximum size of ${sharefile.max_size_share_file_v3}MB`);
                    data.fileType = "video";
                    data.fileData = {
                        fileName,
                        totalSize: videoSize,
                    };
                    data.params.totalChunk = Math.ceil(data.fileData.totalSize / chunkSize);
                    data.params.fileName = fileName;
                    data.params.clientId = clientId++;
                    data.params.totalSize = videoSize;
                    data.params.imei = appContext.imei;
                    data.params.isE2EE = 0;
                    data.params.jxl = 0;
                    data.params.chunkId = 1;
                    break;
                default:
                    const fileSize = await getFileSize(filePath);
                    if (isExceedMaxFileSize(fileSize))
                        throw new ZaloApiError(`File ${fileName} size exceed maximum size of ${sharefile.max_size_share_file_v3}MB`);
                    data.fileType = "others";
                    data.fileData = {
                        fileName,
                        totalSize: fileSize,
                    };
                    data.params.totalChunk = Math.ceil(data.fileData.totalSize / chunkSize);
                    data.params.fileName = fileName;
                    data.params.clientId = clientId++;
                    data.params.totalSize = fileSize;
                    data.params.imei = appContext.imei;
                    data.params.isE2EE = 0;
                    data.params.jxl = 0;
                    data.params.chunkId = 1;
                    break;
            }
            const fileBuffer = await fs.promises.readFile(filePath);
            for (let i = 0; i < data.params.totalChunk; i++) {
                const formData = new FormData();
                const slicedBuffer = fileBuffer.subarray(i * chunkSize, (i + 1) * chunkSize);
                formData.append("chunkContent", slicedBuffer, {
                    filename: fileName,
                    contentType: "application/octet-stream",
                });
                data.chunkContent[i] = formData;
            }
            attachmentsData.push(data);
        }
        const requests = [], results = [];
        for (const data of attachmentsData) {
            for (let i = 0; i < data.params.totalChunk; i++) {
                const encryptedParams = encodeAES(appContext.secretKey, JSON.stringify(data.params));
                if (!encryptedParams)
                    throw new ZaloApiError("Failed to encrypt message");
                requests.push(request(makeURL(url + urlType[data.fileType], Object.assign(query, { params: encryptedParams })), {
                    method: "POST",
                    headers: data.chunkContent[i].getHeaders(),
                    body: data.chunkContent[i].getBuffer(),
                }).then(async (response) => {
                    /**
                     * @todo better type rather than any
                     */
                    const result = await handleZaloResponse(response);
                    if (result.error)
                        throw new ZaloApiError(result.error.message, result.error.code);
                    const resData = result.data;
                    if (resData && resData.fileId != -1 && resData.photoId != -1)
                        await new Promise((resolve) => {
                            if (data.fileType == "video" || data.fileType == "others") {
                                const uploadCallback = async (wsData) => {
                                    let result = Object.assign(Object.assign(Object.assign({ fileType: data.fileType }, resData), wsData), { totalSize: data.fileData.totalSize, fileName: data.fileData.fileName, checksum: (await getMd5LargeFileObject(data.filePath, data.fileData.totalSize)).data });
                                    results.push(result);
                                    resolve();
                                };
                                appContext.uploadCallbacks.set(resData.fileId, uploadCallback);
                            }
                            if (data.fileType == "image") {
                                let result = Object.assign({ fileType: "image", width: data.fileData.width, height: data.fileData.height, totalSize: data.fileData.totalSize, hdSize: data.fileData.totalSize }, resData);
                                results.push(result);
                                resolve();
                            }
                        });
                }));
                data.params.chunkId++;
            }
        }
        await Promise.all(requests);
        return results;
    };
}
