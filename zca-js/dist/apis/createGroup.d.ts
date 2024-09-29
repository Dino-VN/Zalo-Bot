import { API } from "../index.js";
export type CreateGroupResponse = {
    groupType: number;
    sucessMembers: string[];
    groupId: string;
    errorMembers: string[];
    error_data: Record<string, any>;
};
export declare function createGroupFactory(serviceURL: string, api: API): (options: {
    name?: string;
    members: string[];
    avatarPath?: string;
}) => Promise<CreateGroupResponse>;
