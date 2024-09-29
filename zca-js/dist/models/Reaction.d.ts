export declare enum Reactions {
    HEART = "/-heart",
    LIKE = "/-strong",
    HAHA = ":>",
    WOW = ":o",
    CRY = ":-((",
    ANGRY = ":-h",
    NONE = ""
}
export type TReaction = {
    actionId: string;
    msgId: string;
    cliMsgId: string;
    msgType: string;
    uidFrom: string;
    idTo: string;
    dName: string;
    content: {
        rMsg: {
            gMsgID: string;
            cMsgID: string;
            msgType: number;
        }[];
        rIcon: Reactions;
        rType: number;
        source: number;
    };
    ts: string;
    ttl: number;
};
export declare class Reaction {
    data: TReaction;
    threadId: string;
    isSelf: boolean;
    isGroup: boolean;
    constructor(data: TReaction, isGroup: boolean);
}
