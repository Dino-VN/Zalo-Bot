import { API } from "../index.js";
import { GroupMessage, Message, MessageType } from "../models/Message.js";
export type SendMessageResult = {
    msgId: number;
};
export type SendMessageResponse = {
    message: SendMessageResult | null;
    attachment: SendMessageResult[];
};
export type Mention = {
    /**
     * mention position
     */
    pos: number;
    /**
     * id of the mentioned user
     */
    uid: string;
    /**
     * length of the mention
     */
    len: number;
};
export type MessageContent = {
    /**
     * Text content of the message
     */
    msg: string;
    /**
     * Quoted message (optional)
     */
    quote?: Message | GroupMessage;
    /**
     * Mentions in the message (optional)
     */
    mentions?: Mention[];
    /**
     * Attachments in the message (optional)
     */
    attachments?: string[];
};
export declare function sendMessageFactory(api: API): (message: MessageContent | string, threadId: string, type?: MessageType) => Promise<{
    message: SendMessageResult | null;
    attachment: SendMessageResult[];
}>;
