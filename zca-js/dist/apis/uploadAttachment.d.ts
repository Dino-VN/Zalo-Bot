import { API } from "../index.js";
import { MessageType } from "../models/Message.js";
type ImageResponse = {
    normalUrl: string;
    photoId: string;
    finished: number;
    hdUrl: string;
    thumbUrl: string;
    clientFileId: string;
    chunkId: number;
    fileType: "image";
    width: number;
    height: number;
    totalSize: number;
    hdSize: number;
};
type VideoResponse = {
    finished: number;
    clientFileId: number;
    chunkId: number;
    fileType: "video";
    fileUrl: string;
    fileId: string;
    checksum: string;
    totalSize: number;
    fileName: string;
};
type FileResponse = {
    finished: number;
    clientFileId: number;
    chunkId: number;
    fileType: "others";
    fileUrl: string;
    fileId: string;
    checksum: string;
    totalSize: number;
    fileName: string;
};
export type ImageData = {
    fileName: string;
    totalSize: number | undefined;
    width: number | undefined;
    height: number | undefined;
};
export type FileData = {
    fileName: string;
    totalSize: number;
};
export type UploadAttachmentType = ImageResponse | VideoResponse | FileResponse;
export type UploadAttachmentResponse = UploadAttachmentType[];
export declare function uploadAttachmentFactory(serviceURL: string, api: API): (filePaths: string[], threadId: string, type?: MessageType) => Promise<UploadAttachmentType[]>;
export {};
