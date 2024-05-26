 
import fs from "fs-extra";
const {  TelegraPh} =
  await import(`../../lib/uploader.js?v=${Date.now()}`).catch((err) =>
    console.log(err)
  );

let handler = async (m, { usedPrefix, text }) => {
    let chat = db.data.chats[m.chat]
    let p = m.quoted ? m.quoted : m;
    let mime = (p.msg || p).mimetype || "";
  
    if (/image/.test(mime)) {
      await m.reply(wait);
      let media = await p.download(true);
      let ous = await TelegraPh(media);
      chat.leaveImage = ous
      m.reply('Berhasil mengganti leave image')
      fs.unlinkSync(media);
    } else m.reply("Reply image");

}

 
handler.command = ['setleaveimage','setimageleave']
handler.group = true
handler.admin = true
export default handler 
