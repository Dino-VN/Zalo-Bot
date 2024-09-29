export type GroupInfo = {
    groupId: string;
    groupName: string;
    groupDescription?: string;
    membersCount: number;
    [key: string]: any;
};
export type FetchGroupInfoResponse = {
    data: GroupInfo[];
    error?: {
        code: number;
        message: string;
    };
};
export declare function fetchGroupInfoFactory(serviceURL: string): (groupId: string | number | Record<string, any>) => Promise<FetchGroupInfoResponse | null>;
