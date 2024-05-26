import axios from "axios";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";
import { TelegraPh } from "../../lib/uploader.js";

let handler = async (m, { conn, args, text, usedPrefix, command, quoted }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return  m.reply(`Send/Reply your image with .${command} ⧼style⧽`)

  const media = await conn.downloadAndSaveMediaMessage(q, makeid(5));
  const imageUrl = await TelegraPh(media);
  let xyz = "&apikey=teguhmd";
  let response = await axios.get(
    "https://xzn.wtf/api/aitoonme?url=" + imageUrl + xyz
  );
  let imageURL = response.data.url;

  await m.reply("Sedang diproses...");
  await conn.sendFile(m.chat, imageURL, "", wm, m);
};

handler.help = ["jadikartun"];
handler.tags = ["ai"];
handler.command = /^(jadikartun|tnm)$/i;
handler.limit = true;

export default handler;
