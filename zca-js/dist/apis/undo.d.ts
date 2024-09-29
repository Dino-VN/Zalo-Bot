import { API } from "../index.js";
import { GroupMessage, Message } from "../models/Message.js";
export type UndoResponse = {
    status: number;
};
export declare function undoFactory(api: API): (message: Message | GroupMessage) => Promise<UndoResponse>;
