import speed from "performance-now";
let handler = async (m, { conn, setReply }) => {
  let teks = "\n\n––––––『 *VOICE NOTE* 』––––––\n\n";
  for (let awokwkwk of Object.keys(db.data.audio)) {
    teks += `• ${awokwkwk}\n`;
  }
  teks += `\n*Total ada : ${Object.keys(db.data.audio).length}*`;
  teks += `\n\n📮 *Note:* ↓
        • Untuk mengambil vn ketik nama vn
        • Gunaka huruf sesuai dengan nama vn
        • Dilarang spam berlebihan menggunakan vn
        • Request vn silakan hubungi owner\n`;
  setReply(teks);
};
handler.help = ["speedtest"];
handler.tags = ["spesifikasi"];
handler.command = ["listvn"];
export default handler;
