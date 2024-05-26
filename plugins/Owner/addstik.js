import { FileSize } from "../../lib/myfunc.js";
import fs from 'fs-extra'
let handler = async (m, { q, isOwner, setReply, command }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const client = require("filestack-js").init(fileStackApi);
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (!isQuotedSticker) return setReply("Reply sticker");
  if (!q) return setReply("Nama stickernya apa?");

if(command == 'addstikbot'){
  if (db.data.stickerBot[q]) return setReply("Nama tersebut sudah ada di dalam database");
  let media = await conn.downloadAndSaveMediaMessage(quoted, q);
  await client.upload(media, {}, { filename: q }, {}).then((data) => {
    db.data.stickerBot[q] = {
      name: data._file.name,
      id: data.handle,
      size: FileSize(data._file.size),
      link: data.url,
    };
  });
  let teks = `Berhasil menambahkan sticker
        ke dalam database stickerBOt dengan nama *${q}*`;
  await setReply(teks);
  await fs.unlinkSync(media);
} else {

  if (db.data.sticker[q]) return setReply("Nama tersebut sudah ada di dalam database");
  let media = await conn.downloadAndSaveMediaMessage(quoted, q);
  await client.upload(media, {}, { filename: q }, {}).then((data) => {
    db.data.sticker[q] = {
      name: data._file.name,
      id: data.handle,
      size: FileSize(data._file.size),
      link: data.url,
    };
  });
  let teks = `Berhasil menambahkan sticker
        ke dalam database dengan nama *${q}*`;
  await setReply(teks);
  await fs.unlinkSync(media);

}




  
};
handler.command = ["addstikbot","addstik", "addstick", "addsticker"];
handler.owner = true;
handler.owner = true
export default handler;
