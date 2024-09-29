export type ChangeGroupNameResponse = {
    status: number;
};
export declare function changeGroupNameFactory(serviceURL: string): (groupId: string, name: string) => Promise<ChangeGroupNameResponse>;
