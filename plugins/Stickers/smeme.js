import { TelegraPh } from "../../lib/uploader.js";
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs-extra";

let handler = async (m, { q, conn, args, setReply, prefix, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (!q) return setReply(`Masukan teks, contoh: ${prefix}smeme teks atas|teks bawah`);
  setReply(mess.wait)
  var top = q.split("|")[0] ? q.split("|")[0] : "";
  var bottom = q.split("|")[1] ? q.split("|")[1] : "";

  if (isQuotedSticker) {
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile('.png');

    await ffmpeg(media)
      .save(ran)
      .on('error', (err) => {
        console.error(err);
        fs.unlinkSync(media);
        return m.reply(err);
      })
      .on('end', async () => {
        fs.unlinkSync(media);
   log('oke')
      });
  } else if (isQuotedImage || isImage) {
    let olalah = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let anuah = await TelegraPh(olalah);
   
    let media = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${anuah}`;
    log(media)
    await conn.toSticker(m.chat, media, m);
    await fs.unlinkSync(olalah);
  } else {
    setReply("Balas foto/stiker");
  }
};

handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["smeme"];

export default handler;
