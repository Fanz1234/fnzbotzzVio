import axios from 'axios'
import fetch from "node-fetch";
import fs from 'fs-extra'
import { BingImageCreator } from "../../lib/bingimg.js

let handler = async (m, { conn, isPremium,   prefix, isOwner,command,   setReply,   q}) => {
	
let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return m.reply("*Example:* .bingimg 1girl");
  }
  const { BingImageCreator } = await import("../../lib/bingimg.js");
  await reply("Please wait...");
  try {
    const res = new BingImageCreator({
      cookie: `15CNAF27LIWupbHQwhHI6VaTkKERkK-gsuGDyUe9o9KXCzAvTBzpfxe3sgwqWzoeEVBCxP5CxLSQOkkbXyes6LhKPqORO7VXmwaJGuJHpawuZedJVbCg6_FWrs4c1-JS75JfVJgqzEFr_qw3FoaKjFD-J3vk0EBTCzMQLbEpYgKsQuPOH8ooKp6pjtxxFo58dMn0i0_KZsrRbI3smdcgoVw`,//Isi kuki mu_
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
          await reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await reply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await reply(`${error}\n\n${error.message}`);
  }
};
handler.command = ["bingimg", "bingimage"];

export default handler;