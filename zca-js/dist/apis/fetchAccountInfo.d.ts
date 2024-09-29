export type FetchAccountInfoResponse = {
    userId: string | number;
    name?: string;
    avatarUrl?: string;
    email?: string;
    phoneNumber?: string;
};
export declare function fetchAccountInfoFactory(serviceURL: string): () => Promise<FetchAccountInfoResponse>;
