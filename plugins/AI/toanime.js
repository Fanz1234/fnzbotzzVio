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
    let hasil = `https://skizo.tech/api/toanime?url=${url}&apikey=officialdittaz`;
    await conn.sendMessage(
      m.chat,
      {
        image: { url: hasil },
        caption: "Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan",
      },
      { quoted: m }
    );
  } catch (e) {
    m.reply(`${e}`);
  }
};
handler.help = ["toanime"];
handler.tags = ["ai"];
handler.command = /^(jadianime|toanime)$/i;
handler.premium = false;
handler.limit = true;

export default handler;
