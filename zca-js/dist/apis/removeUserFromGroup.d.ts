export type RemoveUserFromGroupResponse = {
    errorMembers: string[];
};
export declare function removeUserFromGroupFactory(serviceURL: string): (groupId: string, members: string | string[]) => Promise<RemoveUserFromGroupResponse>;
