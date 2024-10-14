const requestCountTime = 2;

export default {
  name: "message",
  execute: function (message, api) {
    const prefix = globalThis.env["PREFIX"];

    // Kiểm tra nếu message.content là chuỗi
    if (typeof message.content === "string") {
      if (!message.content.startsWith(prefix)) return;
    } else if (typeof message.content === "object") {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/\s|\n/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;

    const command = globalThis.commands.get(cmd) || globalThis.aliases.get(cmd);

    if (!command) return;

    const command_name = command.name;

    if (!globalThis.cooldowns.has(command_name)) {
      globalThis.cooldowns.set(command_name, {
        requestCount: new Map(),
        cooldowns: new Map(),
      });
    }

    const now = Date.now();
    const timestamps = globalThis.cooldowns.get(command_name).cooldowns;
    const requestCount = globalThis.cooldowns.get(command_name).requestCount;
    const defaultCooldownDuration = 5;
    const cooldownAmount = (command.cooldown || defaultCooldownDuration) * 1000;

    if (requestCount.get(message.senderID) == 1) return;

    if (!timestamps) return;

    if (timestamps.has(message.senderID)) {
      const expirationTime = timestamps.get(message.senderID) + cooldownAmount;

      requestCount.set(message.senderID, 1);
      setTimeout(
        () => requestCount.delete(message.senderID),
        requestCountTime * 1000
      );

      if (now < expirationTime) {
        return message.send(
          `Xin chờ, bạn đang dùng lệnh \`${command_name}\` quá nhanh. Bạn có thể dùng lại sau ${(
            (expirationTime - now) /
            1000
          ).toFixed(0)}s.`
        );
      }
    }

    requestCount.set(message.senderID, 1);
    setTimeout(
      () => requestCount.delete(message.senderID),
      requestCountTime * 1000
    );
    timestamps.set(message.senderID, now);
    setTimeout(() => timestamps.delete(message.senderID), cooldownAmount);

    command.onCall(api, message, args);
  },
};
