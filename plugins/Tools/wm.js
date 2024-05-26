import webp from "node-webpmux"
import fs from 'fs-extra'
let handler = async (m, { q, conn, setReply, usedPrefix, command }) => {
   const isQuotedSticker = m.type === 'extendedTextMessage' && m.content.includes('stickerMessage')
   if(!isQuotedSticker) throw 'Reply stickernya'
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  if (!q) return setReply("masukan teks contoh take lala|lulu");
  if (!q.includes("|")) return setReply("masukan teks contoh take lala|lulu");
  const media = await conn.downloadMed(quoted, makeid(5));
  let author = q.split("|")[0];
  let packname = q.split("|")[1];
  const tmpFileOut = getRandomFile('.webp')
  const tmpFileIn = media 

     const img = new webp.Image()
     const json = { 
     "sticker-pack-id": Exif.packId, 
     "sticker-pack-name": author, 
     "sticker-pack-publisher": packname, 
     "sticker-pack-publisher-email": Exif.packEmail, 
     "sticker-pack-publisher-website": Exif.packWebsite, 
     "android-app-store-link": Exif.androidApp, 
     "ios-app-store-link": Exif.iOSApp, 
     "emojis": Exif.emojis, 
     "is-avatar-sticker": Exif.isAvatar 
  }
     const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
     const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
     const exif = Buffer.concat([exifAttr, jsonBuff])
     await exif.writeUIntLE(jsonBuff.length, 14, 4)
     await img.load(tmpFileIn)
      img.exif = exif
     await img.save(tmpFileOut)
     await conn.sendMessage(m.chat, {sticker: fs.readFileSync(tmpFileOut)}, {quoted: m})
fs.unlinkSync(media)
fs.unlinkSync(tmpFileOut)


};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["wm",'take'];

export default handler;
