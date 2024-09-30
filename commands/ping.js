import { MessageType } from "../zca-js/dist/index.js";

export default {
  name: "ping",
  onCall: function(api,message,args) {
    message.send("Pong!");
    // console.log(message)
    // api.sendRemoteVideo(
    //   "https://dl.snapcdn.app/get?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3YxMS1vLmRvdXlpbnZvZC5jb20vNTk5YTk2YTAzMTgwNDMwMTBiODY5ZTQyZmU1YzBlNTUvNjZmYTMxNTkvdmlkZW8vdG9zL2NuL3Rvcy1jbi12ZS0xNS9vY2pzekFFeU5RQlJndUFoSXphQUJkNDlETmltZVh0aXJCWXZmei8_YT0yMzI5JmNoPTI2JmNyPTMmZHI9MCZscj1hbGwmY2Q9MCU3QzAlN0MwJTdDMyZjdj0xJmJyPTE2NjUmYnQ9MTY2NSZjcz0wJmRzPTYmZnQ9LkxsbW9wTFhQV1QyTnZqSFEzcX5lNjd1c01ucFEubmFnbGM5cCZtaW1lX3R5cGU9dmlkZW9fbXA0JnFzPTAmcmM9YVRNNE56eGtORFU1TmpjOGFXazBNMEJwYW1kemVHdzVjbXB5ZERNek5Ha3pNMEF1THk0MU5sNHhYMkl4TTJNdVhqQXpZU011TURKck1tUnpZWEpnTFMxa0xXRnpjdyUzRCUzRCZidGFnPTgwMDEwZTAwMDA4MDA4JmNjPTNlJmNkbl90eXBlPTEmY3F1ZXJ5PTEwMUZfMTAxb18xMDFsXzEwMW5fMTAwZCZkeV9xPTE3Mjc2NjkwNTcmZmVhdHVyZV9pZD1mMDE1MGExNmEzMjQzMzZjZGE1ZDZkZDBiNjllZDI5OSZsPTIwMjQwOTMwMTIwNDE3RkM1MzU0QTc4RjI4NkU0OUVCQTEmcGRwPW9ubGluZV94eSZwd2lkPTEmcmVxX2Nkbl90eXBlPXIiLCJmaWxlbmFtZSI6IlRpa1ZpZGVvLkFwcF83NDAzMjIyNjI1NTYxOTM5MjM1Lm1wNCIsIm5iZiI6MTcyNzY2OTA1OCwiZXhwIjoxNzI3NjcyNjU4LCJpYXQiOjE3Mjc2NjkwNTh9.jfBboyWvf3bfM-jtpBcsQJCsL36Uzi7m7vgNwlPl7AI",
    //   "https://files.catbox.moe/34xdgb.jpeg",
    //   1000,
    //   message.groupId,
    //   MessageType.GroupMessage,
    //   1280,
    //   720,
    //   {
    //     text: "Pong!",
    //   }
    // );
  }
}