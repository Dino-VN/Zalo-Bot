import path from "path";
import fs from "fs";
import axios from "axios";
const cache = './.temp';

async function stream(url, type, title) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filePath = `${cache}/${title}.${type}`;
        fs.writeFileSync(filePath, response.data);
        setTimeout(() => fs.unlinkSync(filePath), 1000 * 60); // Delete the file after 60 seconds
        return path.resolve(filePath);
    } catch (error) {
        console.error("Error in streaming file:", error);
    }
}

function formatted(number) {
    switch (true) {
        case number >= 1000000:
            return (number / 1000000).toFixed(1) + "M";
        case number >= 1000:
            return (number / 1000).toFixed(1) + "k";
        default:
            return number;
    }
}

export default {
  name: "message",
  execute: async function (event, api) {
    try {
      console.log(event);

      if (!event.content) return;
       
      let url;
    if (event.content.title) {
      url = event.content.title.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
      );
   } else {
      url = event.content.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
      );
    }


      if (!url) return;

      // Gửi request lên API để tải video
      const apiUrl = `https://api-c2c.onrender.com/api/down/media?url=${url[0]}&format=json`; // Use the first match from the regex
      let response;
      try {
        response = await axios.get(apiUrl);
      } catch (error) {
        console.error("Error fetching video from API:", error);
        return;
      }

      // Kiểm tra nếu API trả về thành công và có dữ liệu video
      if (response?.data?.attachments?.[0]?.url) {
        const videoUrl = response.data.attachments[0].url;
        const title = response.data.message || "Không Có Tiêu Đề";
        const statistics = response.data.statistics;
        
        // Stream the video
        const videoPath = await stream(videoUrl, "mp4", title);

        // Send video through the event
        await event.send({ msg: `${title}\n\n❤ ${formatted(statistics.like)} 💬 ${formatted(statistics.comment)} 🔁 ${formatted(statistics.share)}`, attachments: [videoPath] });
      } else {
        console.error("No media URL found in API response.");
      }

    } catch (error) {
      console.error("Error processing message event:", error);
    }
  },
};