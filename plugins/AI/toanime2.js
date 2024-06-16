import fetch from "node-fetch";
import { TelegraPh } from "../../lib/uploader.js";
let handler = async (m, { conn, text }) => {
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Kirim/Reply Gambar Dengan Caption .toanime")
  m.reply(mess.wait);
    let media = await conn.downloadAndSaveMediaMessage(q, makeid(5));
    let url = await TelegraPh(media);
    let hasil = `https://aemt.me/toanime?url=${url}`;
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
handler.help = ["toanime2"];
handler.tags = ["ai"];
handler.command = /^(jadianime2|toanime2)$/i;
handler.premium = false;
handler.limit = true;

export default handler;
