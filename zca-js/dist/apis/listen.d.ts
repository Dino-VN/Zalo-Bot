import EventEmitter from "events";
import { type GroupEvent } from "../models/GroupEvent.js";
import { GroupMessage, Message, Reaction, Undo } from "../models/index.js";
type MessageEventData = Message | GroupMessage;
type UploadEventData = {
    fileUrl: string;
    fileId: string;
};
export type OnMessageCallback = (message: MessageEventData) => void | Promise<void>;
interface ListenerEvents {
    connected: [];
    closed: [];
    error: [error: any];
    message: [message: MessageEventData];
    reaction: [reaction: Reaction];
    upload_attachment: [data: UploadEventData];
    undo: [data: Undo];
    group_event: [data: GroupEvent];
}
export declare class Listener extends EventEmitter<ListenerEvents> {
    private url;
    private cookie;
    private userAgent;
    private onConnectedCallback;
    private onClosedCallback;
    private onErrorCallback;
    private onMessageCallback;
    private cipherKey?;
    private selfListen;
    private pingInterval?;
    constructor(url: string);
    onConnected(cb: Function): void;
    onClosed(cb: Function): void;
    onError(cb: Function): void;
    onMessage(cb: OnMessageCallback): void;
    start(): void;
}
export {};
