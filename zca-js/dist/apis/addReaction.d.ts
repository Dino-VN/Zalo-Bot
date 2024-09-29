import { Message } from "../models/Message.js";
import { Reactions } from "../models/Reaction.js";
export type AddReactionResponse = {
    msgIds: string;
};
export declare function addReactionFactory(serviceURL: string): (icon: Reactions, message: Message) => Promise<AddReactionResponse>;
