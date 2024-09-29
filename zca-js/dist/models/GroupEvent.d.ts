export declare enum GroupEventType {
    JOIN_REQUEST = 0,
    JOIN = 1,
    LEAVE = 2,
    REMOVE_MEMBER = 3,
    BLOCK_MEMBER = 4,
    UPDATE_SETTING = 5,
    UPDATE = 6,
    NEW_LINK = 7,
    ADD_ADMIN = 8,
    REMOVE_ADMIN = 9,
    UNKNOWN = 10
}
export type Member = {
    id: string;
    dName: string;
    avatar: string;
    type: number;
    avatar_25: string;
};
export type GroupSetting = {
    blockName: number;
    signAdminMsg: number;
    addMemberOnly: number;
    setTopicOnly: number;
    enableMsgHistory: number;
    joinAppr: number;
    lockCreatePost: number;
    lockCreatePoll: number;
    lockSendMsg: number;
    lockViewMember: number;
    bannFeature: number;
    dirtyMedia: number;
    banDuration: number;
};
export type TGroupEventBase = {
    subType: number;
    groupId: string;
    creatorId: string;
    groupName: string;
    sourceId: string;
    updateMembers: Member[];
    groupSetting: GroupSetting;
    groupTopic: null;
    info: {
        group_link?: string;
        link_expired_time?: number;
        [key: string]: any;
    };
    extraData: {
        featureId?: number;
        [key: string]: any;
    };
    time: string;
    avt: null;
    fullAvt: null;
    isAdd: number;
    hideGroupInfo: number;
    version: string;
    groupType: number;
    clientId: number;
    errorMap: Record<string, any>;
    e2ee: number;
};
export type TGroupEventJoinRequest = {
    uids: string[];
    totalPending: number;
    groupId: string;
    time: string;
};
export type TGroupEvent = TGroupEventBase | TGroupEventJoinRequest;
export type GroupEvent = {
    type: GroupEventType.JOIN_REQUEST;
    data: TGroupEventJoinRequest;
    threadId: string;
    isSelf: boolean;
} | {
    type: Exclude<GroupEventType, GroupEventType.JOIN_REQUEST>;
    data: TGroupEventBase;
    threadId: string;
    isSelf: boolean;
};
export declare function initializeGroupEvent(data: TGroupEvent, type: GroupEventType): GroupEvent;
