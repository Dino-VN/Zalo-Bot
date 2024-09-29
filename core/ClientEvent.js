import { MessageType } from "../zca-js/dist/index.js";

function UserMessage(api, event) {
  function send(content, threadId) {
    return new Promise((resolve, reject) => {
        api.sendMessage(content, threadId, MessageType.DirectMessage)
            .then((t) => {
                if (t && t.message && t.message.msgId) {
                    const rdata = {
                        messageId: t.message.msgId,
                        send: (c) => {
                            return send(c, threadId);
                        },
                    };
                    resolve(rdata);
                } else {
                    resolve({
                        messageId: null, 
                        send: (c) => {
                            return send(c, threadId);
                        },
                    });
                }
            })
            .catch((e) => {
                reject(new Error(`API error: ${e.message}`));
            });
    });
 }
  const data = {
    user: {
      id: event.threadId,
      name: event.data.dName,
      /**
       * @param {object} content
       * @returns
       */
      send: (c) => {
        return send(c, event.threadId);
      },
    },
    send: (c) => {
      return send(c, event.threadId);
    },
    content: event.data.content,
    isSelf: event.isSelf,
  };
  if (event.data.quote) {
    const replyMessage = event.data.quote;
    data.replyMessage = {
      content: replyMessage.msg,
      user: {
        name: replyMessage.fromD,
      },
    };
  }
  return data;
}

async function GroupMessage(api, event) {
  const group = await api.getGroupInfo(event.threadId);
  function send(content, threadId) {
    return new Promise((resolve, reject) => {
        api.sendMessage(content, threadId, MessageType.GroupMessage)
            .then((t) => {
                if (t && t.message && t.message.msgId) {
                    const rdata = {
                        messageId: t.message.msgId,
                        send: (c) => {
                            return send(c, threadId);
                        },
                    };
                    resolve(rdata);
                } else {
                    resolve({
                        messageId: null, 
                        send: (c) => {
                            return send(c, threadId);
                        },
                    });
                }
            })
            .catch((e) => {
                reject(new Error(`API error: ${e.message}`));
            });
    });
 }
  const data = {
    user: {
      id: event.threadId,
      name: event.data.dName,
      /**
       * @param {object} content
       * @returns
       */
      send: (c) => {
        return send(c, event.data.uidFrom);
      },
    },
    group: group,
    send: (c) => {
      return send(c, event.threadId);
    },
    mentions: event.data.mentions,
    content: event.data.content,
    isSelf: event.isSelf,
  };
  if (event.data.quote) {
    const replyMessage = event.data.quote;
    data.replyMessage = {
      content: replyMessage.msg,
      user: {
        name: replyMessage.fromD,
      },
    };
  }
  return data;
}

/**
 * @param {string} type
 * @param {object} event
 */
export function EventFormat(type, api, event) {
  return new Promise((resolve, _reject) => {
    if (type == "message") {
      // console.log(event);
      if (event.type == MessageType.DirectMessage) {
        event = UserMessage(api, event);
      } else if (event.type == MessageType.GroupMessage) {
        event = GroupMessage(api, event);
      }
    }
    resolve(event);
  });
}
