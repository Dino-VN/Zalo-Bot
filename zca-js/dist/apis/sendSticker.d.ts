import { API } from "../index.js";
import { MessageType } from "../models/Message.js";
import { StickerDetailResponse } from "./getStickersDetail.js";
export type SendStickerResponse = {
    msgId: number;
};
export declare function sendStickerFactory(api: API): (sticker: StickerDetailResponse, threadId: string, type?: MessageType) => Promise<SendStickerResponse>;
