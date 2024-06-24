import axios from 'axios'
import fetch from "node-fetch";
import fs from 'fs-extra'
import { BingImageCreator } from "../../lib/bingimg.js"

let handler = async (m, { conn, isPremium, args, prefix, isOwner,command, setReply, q}) => {
	
let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return m.reply("*Example:* .bingimg 1girl");
  }
  const { BingImageCreator } = await import("../../lib/bingimg.js");
  await setReply("Please wait...");
  try {
    const res = new BingImageCreator({
      cookie: `1XnJiepo1YheVhXoCzLGtLQX-cfkL9EbiDyCmrvzQs2TfuwL-kB-TuGsXmSmynnMapE4s-fPa3zwmk-Qxwd_lKOj1XZwCMt2diyKh_R_yjzs0NhLGrvwMzuUEU9JnWu49D2mtnSszjqV79QS-bmTTf3gkeIVL4GwjOtoRJXQsVJ`,//Isi kuki mu_
    });
    const data = await res.createImage(text);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(
              m.chat,
              data[i],
              "",
              `Image *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`,
              m,
              false,
              { mentions: [m.sender] },
            );
          }
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await setReply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await setReply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await setReply(`${error}\n\n${error.message}`);
  }
};

handler.command = ["bingimage", "bingimg"];

export default handler;