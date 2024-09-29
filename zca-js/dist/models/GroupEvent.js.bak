import { appContext } from "../context.js";
export var GroupEventType;
(function (GroupEventType) {
    GroupEventType[GroupEventType["JOIN_REQUEST"] = 0] = "JOIN_REQUEST";
    GroupEventType[GroupEventType["JOIN"] = 1] = "JOIN";
    GroupEventType[GroupEventType["LEAVE"] = 2] = "LEAVE";
    GroupEventType[GroupEventType["REMOVE_MEMBER"] = 3] = "REMOVE_MEMBER";
    GroupEventType[GroupEventType["BLOCK_MEMBER"] = 4] = "BLOCK_MEMBER";
    GroupEventType[GroupEventType["UPDATE_SETTING"] = 5] = "UPDATE_SETTING";
    GroupEventType[GroupEventType["UPDATE"] = 6] = "UPDATE";
    GroupEventType[GroupEventType["NEW_LINK"] = 7] = "NEW_LINK";
    GroupEventType[GroupEventType["ADD_ADMIN"] = 8] = "ADD_ADMIN";
    GroupEventType[GroupEventType["REMOVE_ADMIN"] = 9] = "REMOVE_ADMIN";
    GroupEventType[GroupEventType["UNKNOWN"] = 10] = "UNKNOWN";
})(GroupEventType || (GroupEventType = {}));
export function initializeGroupEvent(data, type) {
    const threadId = data.groupId;
    if (type == GroupEventType.JOIN_REQUEST) {
        return { type, data: data, threadId, isSelf: false };
    }
    else {
        const baseData = data;
        return {
            type,
            data: baseData,
            threadId,
            isSelf: baseData.updateMembers.some((member) => member.id == appContext.uid) ||
                baseData.sourceId == appContext.uid,
        };
    }
}
