export type AddUserToGroupResponse = {
    errorMemebers: string[];
    error_data: Record<string, any>;
};
export declare function addUserToGroupFactory(serviceURL: string): (groupId: string, members: string | string[]) => Promise<AddUserToGroupResponse>;
