import { encodeAES, handleZaloResponse, makeURL, request } from "../utils.js";
import { GroupMessage, Message, MessageType } from "../models/Message.js";
import { Zalo, ZaloApiError } from "../index.js";
import { appContext } from "../context.js";

export function sendRemoteVideoFactory(api) {
  return async function sendRemoteVideo(
    videoUrl,
    thumbnailUrl,
    duration,
    thread_id,
    thread_type = MessageType.DirectMessage,
    width = 1280,
    height = 720,
    message,
    ttl = 0,
  ) {
    let fileSize = 0;

    try {
      const headers = await request(videoUrl, {
        method: "GET",
      });
      fileSize = headers["content-length"] || 0;
    } catch (error) {
      throw new ZaloAPIError("Unable to get url content");
    }

    const payload = {
      params: {
        clientId: Date.now(),
        ttl: ttl,
        zsource: 704,
        msgType: 5,
        msgInfo: JSON.stringify({
          videoUrl: videoUrl,
          thumbUrl: thumbnailUrl,
          duration: duration,
          width: width,
          height: height,
          fileSize: fileSize,
          properties: {
            color: -1,
            size: -1,
            type: 1003,
            subType: 0,
            ext: {
              sSrcType: -1,
              sSrcStr: "",
              msg_warning_type: 0,
            },
          },
          title: message && message.text ? message.text : "",
        }),
      },
    };

    if (message && message.mention) {
      payload.params.mentionInfo = message.mention;
    }

    let url = "";
    if (thread_type === MessageType.DirectMessage) {
      url = makeURL(`https://tt-files-wpa.chat.zalo.me/api/message/forward`, {
        zpw_ver: Zalo.API_VERSION,
        zpw_type: Zalo.API_TYPE,
        nretry: 0,
      });
      payload.params.toId = thread_id;
      payload.params.imei = appContext.imei;
    } else if (thread_type === MessageType.GroupMessage) {
      url = makeURL(`https://tt-files-wpa.chat.zalo.me/api/group/forward`, {
        zpw_ver: Zalo.API_VERSION,
        zpw_type: Zalo.API_TYPE,
        nretry: 0,
      });
      payload.params.grid = thread_id;
      payload.params.visibility = 0;
    } else {
      throw new ZaloAPIError("Invalid thread type");
    }

    // payload.params = helpers.encodePayload(payload.params);
    const encryptedParams = encodeAES(
      appContext.secretKey,
      JSON.stringify(payload.params),
    );

    const response = await request(url, {
      method: "POST",
      json: true,
      body: new URLSearchParams({
        params: encryptedParams,
      }),
    });

    const result = await handleZaloResponse(response);
    if (result.data) {
      return response.data;
    } else {
      throw new ZaloApiError(result.error.message, result.error.code);
    }
  };
}
