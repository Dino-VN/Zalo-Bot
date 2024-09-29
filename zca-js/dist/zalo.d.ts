import { getOwnId } from "./apis/getOwnId.js";
import { Listener } from "./apis/listen.js";
import { Options } from "./context.js";
import { addReactionFactory } from "./apis/addReaction.js";
import { addUserToGroupFactory } from "./apis/addUserToGroup.js";
import { changeGroupAvatarFactory } from "./apis/changeGroupAvatar.js";
import { changeGroupNameFactory } from "./apis/changeGroupName.js";
import { createGroupFactory } from "./apis/createGroup.js";
import { fetchAccountInfoFactory } from "./apis/fetchAccountInfo.js";
import { fetchGroupInfoFactory } from "./apis/fetchGroupInfo.js";
import { findUserFactory } from "./apis/findUser.js";
import { getGroupInfoFactory } from "./apis/getGroupInfo.js";
import { getStickersFactory } from "./apis/getStickers.js";
import { getStickersDetailFactory } from "./apis/getStickersDetail.js";
import { removeUserFromGroupFactory } from "./apis/removeUserFromGroup.js";
import { sendStickerFactory } from "./apis/sendSticker.js";
import { undoFactory } from "./apis/undo.js";
import { uploadAttachmentFactory } from "./apis/uploadAttachment.js";
import { sendMessageFactory } from "./apis/sendMessage.js";
import { getCookieFactory } from "./apis/getCookie.js";
import { removeMessageFactory } from "./apis/deleteMessage.js";
import { getUserInfoFactory } from "./apis/getUserInfo.js";
export type J2Cookies = {
    url: string;
    cookies: {
        domain: string;
        expirationDate: number;
        hostOnly: boolean;
        httpOnly: boolean;
        name: string;
        path: string;
        sameSite: string;
        secure: boolean;
        session: boolean;
        storeId: string;
        value: string;
    }[];
};
export type Credentials = {
    imei: string;
    cookie: string | J2Cookies;
    userAgent: string;
    language?: string;
};
export declare class Zalo {
    static readonly API_TYPE = 30;
    static readonly API_VERSION = 637;
    private enableEncryptParam;
    constructor(credentials: Credentials, options?: Partial<Options>);
    private parseCookies;
    private validateParams;
    login(): Promise<API>;
}
export declare class API {
    private secretKey;
    zpwServiceMap: Record<string, string[]>;
    listener: Listener;
    addReaction: ReturnType<typeof addReactionFactory>;
    getOwnId: typeof getOwnId;
    getStickers: ReturnType<typeof getStickersFactory>;
    getStickersDetail: ReturnType<typeof getStickersDetailFactory>;
    sendSticker: ReturnType<typeof sendStickerFactory>;
    findUser: ReturnType<typeof findUserFactory>;
    uploadAttachment: ReturnType<typeof uploadAttachmentFactory>;
    undo: ReturnType<typeof undoFactory>;
    getGroupInfo: ReturnType<typeof getGroupInfoFactory>;
    createGroup: ReturnType<typeof createGroupFactory>;
    changeGroupAvatar: ReturnType<typeof changeGroupAvatarFactory>;
    removeUserFromGroup: ReturnType<typeof removeUserFromGroupFactory>;
    addUserToGroup: ReturnType<typeof addUserToGroupFactory>;
    changeGroupName: ReturnType<typeof changeGroupNameFactory>;
    sendMessage: ReturnType<typeof sendMessageFactory>;
    getCookie: ReturnType<typeof getCookieFactory>;
    deleteMessage: ReturnType<typeof removeMessageFactory>;
    fetchAccountInfo: ReturnType<typeof fetchAccountInfoFactory>;
    fetchGroupInfo: ReturnType<typeof fetchGroupInfoFactory>;
    getUserInfo: ReturnType<typeof getUserInfoFactory>;
    constructor(secretKey: string, zpwServiceMap: Record<string, string[]>, wsUrl: string);
}
