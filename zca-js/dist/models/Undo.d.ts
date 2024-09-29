import { TAttachmentContent, TOtherContent } from "./Message.js";
export type TUndo = {
    actionId: string;
    msgId: string;
    cliMsgId: string;
    msgType: string;
    uidFrom: string;
    idTo: string;
    dName: string;
    ts: string;
    status: number;
    content: string | TAttachmentContent | TOtherContent;
    notify: string;
    ttl: number;
    userId: string;
    uin: string;
    cmd: number;
    st: number;
    at: number;
    realMsgId: string;
};
export declare class Undo {
    data: TUndo;
    threadId: string;
    isSelf: boolean;
    isGroup: boolean;
    constructor(data: TUndo, isGroup: boolean);
}
