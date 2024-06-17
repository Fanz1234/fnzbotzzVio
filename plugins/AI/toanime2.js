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
    
    // Mengirim permintaan GET ke endpoint untuk mendapatkan hasil URL gambar
    let response = await fetch(`https://aemt.me/toanime?url=${url}`);
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    let hasil = await response.json(); // Mendapatkan hasil JSON dari endpoint
    
    // Memastikan hasil.image ada dan tidak kosong
    if (!hasil || !hasil.image) {
      throw new Error("Tidak dapat mendapatkan URL gambar dari respons");
    }
    
    // Mendapatkan URL gambar dari hasil JSON
    let imageUrl = hasil.image;
    
    // Memastikan URL absolut
    if (!imageUrl.startsWith("http")) {
      imageUrl = "https://aemt.me" + imageUrl; // Ganti dengan domain yang sesuai jika diperlukan
    }
    
    // Mengunduh gambar dari URL yang diberikan oleh hasil JSON
    let imageResponse = await fetch(imageUrl); // URL gambar dari hasil JSON
    let imageBuffer = await imageResponse.buffer(); // Mengambil buffer gambar
    
    // Mengirim gambar sebagai pesan dengan teks tambahan
    await conn.sendMessage(
      m.chat,
      imageBuffer, // Mengirim buffer gambar
      MessageType.image, // Tipe pesan gambar
      { quoted: m, caption: "Gambar sudah jadi" } // Menambahkan teks caption
    );
    
  } catch (e) {
    m.reply(`${e}`);
  }
};

handler.help = ["toanime2"];
handler.tags = ["ai"];
handler.command = /^(jadianime2|toanime2)$/i;
handler.premium = false;
handler.limit = true;

export default handler;
