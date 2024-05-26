import fetch from "node-fetch";
import {TelegraPh} from '../../lib/uploader.js'
Object.value = function parseMention(text) {
  let match = text.match(/@(\d+)/);
  return match ? match[1] : null;
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) return m.reply('where is the photo? u want me to take a pic of ur mom?')
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)

    let wait = "Menunggu..."
    m.reply(wait);

    let img = await conn.downloadMed(q,makeid(5));
    let url = await TelegraPh(img);
Log(url)
    let apiResponse = await fetch(`https://api.yanzbotz.my.id/api/ai/bardimg?query=${text}&url=${url}&apiKey=ReiiNt`);
    let data = await apiResponse.json();
Log(data)
    const erka = data.result;
    m.reply(erka)
  } catch (e) {
    console.error("Error:", e);
    conn.reply(m.chat, `${e}`, m);
  }
};

handler.help = ["bardimg"];
handler.tags = ["ai", "tools"];
handler.command = ["bardimg"];

export default handler;