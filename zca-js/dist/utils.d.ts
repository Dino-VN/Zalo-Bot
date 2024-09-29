import cryptojs from "crypto-js";
import { GroupEventType } from "./models/GroupEvent.js";
export declare function getSignKey(type: string, params: Record<string, any>): cryptojs.lib.WordArray;
export declare function makeURL(baseURL: string, params: Record<string, any>): string;
export declare class ParamsEncryptor {
    private zcid;
    private enc_ver;
    private zcid_ext;
    private encryptKey;
    constructor({ type, imei, firstLaunchTime }: {
        type: number;
        imei: string;
        firstLaunchTime: number;
    });
    getEncryptKey(): string;
    createZcid(type: number, imei: string, firstLaunchTime: number): void;
    createEncryptKey(e?: number): boolean;
    getParams(): {
        zcid: string;
        zcid_ext: string;
        enc_ver: string;
    } | null;
    static processStr(e: string): {
        even: null;
        odd: null;
    } | {
        even: string[];
        odd: string[];
    };
    static randomString(e?: number, t?: number): string;
    static encodeAES(e: string, message: string, type: "hex" | "base64", uppercase: boolean, s?: number): string | null;
}
export declare function decryptResp(key: string, data: string): Record<string, any> | null | string;
export declare function decodeBase64ToBuffer(data: string): Buffer;
export declare function decodeUnit8Array(data: Uint8Array): string | null;
export declare function encodeAES(secretKey: string, data: any, t?: number): string | null;
export declare function decodeAES(secretKey: string, data: string, t?: number): string | null;
export declare function getDefaultHeaders(): {
    Accept: string;
    "Accept-Encoding": string;
    "Accept-Language": string;
    "content-type": string;
    Cookie: string;
    Origin: string;
    Referer: string;
    "User-Agent": string;
};
export declare function request(url: string, options?: RequestInit): Promise<Response>;
export declare function getImageMetaData(filePath: string): Promise<{
    fileName: string;
    totalSize: number | undefined;
    width: number | undefined;
    height: number | undefined;
}>;
export declare function getFileSize(filePath: string): Promise<number>;
export declare function getGifMetaData(filePath: string): Promise<{
    fileName: string;
    totalSize: number | undefined;
    width: number | undefined;
    height: number | undefined;
}>;
export declare function decodeEventData(parsed: any, cipherKey?: string): Promise<any>;
export declare function getMd5LargeFileObject(filePath: string, fileSize: number): Promise<{
    currentChunk: number;
    data: string;
}>;
export declare const logger: {
    verbose: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
export declare function getClientMessageType(msgType: string): 1 | 32 | 31 | 36 | 37 | 38 | 44 | 46 | 49 | 43;
export declare function strPadLeft(e: any, t: string, n: number): any;
export declare function getFullTimeFromMilisecond(e: number): string;
export declare function getFileExtension(e: string): string;
export declare function getFileName(e: string): string;
export declare function removeUndefinedKeys(e: Record<string, any>): Record<string, any>;
export declare function getGroupEventType(act: string): GroupEventType;
type ZaloResponse<T> = {
    data: T | null;
    error: {
        message: string;
        code?: number;
    } | null;
};
export declare function handleZaloResponse<T = any>(response: Response): Promise<ZaloResponse<T>>;
export {};
