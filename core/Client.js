import { Zalo } from "../zca-js/dist/index.js";
import { EventFormat } from "./ClientEvent.js";
import fs from "node:fs";
import { LoadEnv } from "./util/Env.js";

globalThis.commands = new Map();
globalThis.aliases = new Map();
globalThis.cooldowns = new Map();

async function StartBot() {
  await LoadEnv();

  const zalo = new Zalo(
    {
      cookie: globalThis.env["Cookie"],
      imei: globalThis.env["IMEI"],
      userAgent: globalThis.env["UserAgent"],
    },
    {
      selfListen: globalThis.env["SELFLISTEN"],
      checkUpdate: globalThis.env["CHECKUPDATE"],
    },
  );

  const api = await zalo.login();

  // api.listener.on("message", (message) => {
  //   console.log(message);
  //   const e = EventFormat("message", api, message);
  //   console.log(e);
  //   e.user.send("Hi");
  // });

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    try {
      const command = (await import(`../commands/${file}`)).default;
      globalThis.commands.set(command.name, command);
    } catch (error) {
      console.error(`File command ${file} bị lỗi`);
      console.error(error);
    }
  }

  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    try {
      const event = (await import(`../events/${file}`)).default;
      try {
        api.listener.on(event.name, async (e) => {
          const Fevent = await EventFormat(event.name, api, e);
          event.execute(Fevent, api)
        });
      } catch (e) {
        console.error(`Đã có lỗi khi chạy event ${file}:\n`, e);
      }
    } catch (error) {
      console.error(
        `File event ${file} bị lỗi`,
      );
      console.error(error);
    }
  }

  api.listener.start();
}

export { StartBot };
