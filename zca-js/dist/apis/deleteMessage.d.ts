import { API } from "../index.js";
import { GroupMessage, Message } from "../models/Message.js";
export type DeleteMessageResponse = {
    status: number;
};
export declare function removeMessageFactory(api: API): (message: Message | GroupMessage, onlyMe?: boolean) => Promise<DeleteMessageResponse>;
