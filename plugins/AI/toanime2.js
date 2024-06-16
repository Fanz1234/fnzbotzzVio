import fetch from "node-fetch";
import { TelegraPh } from "../../lib/uploader.js";
import { miftah,nazmy,nekohime } from '../../lib/restApi.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Kirim/Reply Gambar Dengan Caption .toanime")
  m.reply(mess.wait);
  try {
    let media = await conn.downloadAndSaveMediaMessage(q, makeid(5));
    let url = await TelegraPh(media);
    let hasil = `https://aemt.me/toanime?url=${url}`;
    conn.sendMessage(m.chat,{image:{url: hasil}},{quoted:m})
    }
handler.help = ["toanime2"];
handler.tags = ["ai"];
handler.command = /^(jadianime2|toanime2)$/i;
 
export default handler;