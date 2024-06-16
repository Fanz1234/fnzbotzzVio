import fetch from "node-fetch";
import { TelegraPh } from "../../lib/uploader.js";
import { miftah, nazmy, nekohime } from '../../lib/restApi.js';

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
  
  if (!mime) return m.reply("Kirim/Reply Gambar Dengan Caption .toanime");

  m.reply(mess.wait);
  
  try {
    let media = await conn.downloadAndSaveMediaMessage(q, makeid(5));
    let url = await TelegraPh(media);
    
    // Fetching the image from the specified API endpoint
    let response = await fetch(`https://aemt.me/toanime?url=${url}`);
    let data = await response.json();
    
    // Assuming the API returns a direct image URL
    let imageUrl = data.image; // Adjust this based on the actual JSON response structure
    
    // Sending the image URL as a message
    await conn.sendMessage(
      m.chat,
      {
        image: { url: imageUrl },
        caption: "Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan",
      },
      { quoted: m }
    );
    
  } catch (e) {
    m.reply(`${e}`);
  }
};

handler.help = ["toanime2"];
handler.tags = ["ai"];
handler.command = /^(jadianime2|toanime2)$/i;

export default handler;
