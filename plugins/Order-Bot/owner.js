import {hitungUmur} from "../../lib/myfunc.js"

let handler = async (m, { conn, text, setReply, command }) => {
 
  let teks = `
––––––『 *OWNER BOT* 』––––––
⭔ *Nama* : ${ownerName}
⭔ *Nomor* : wa.me/${nomerOwner}
⭔ *Gender* : ${global.gender}
⭔ *Agama* : ${global.agama}
⭔ *Tanggal lahir* : ${global.tanggalLahir}
⭔ *Umur* : ${hitungUmur(global.tanggalLahir)} tahun
⭔ *Hobby* : ${global.hobi}
⭔ *Sifat* : ${global.sifat}
⭔ *Tinggal* : ${global.tempatTinggal}
⭔ *Waifu* : ${global.waifu}
•·–––––––––––––––––––––––––·•
📮 *Note:* ↓
• Owner berhak blockir tanpa alasan
• Berbicaralah yang sopan & tidak spam
• Owner Hanya merespon yang berkaitan dengan BOT
• No Call jika tidak penting
•·–––––––––––––––––––––––––·•
        
`;
  let teks2 = `${copyright} - ${calender}`;
  setReply(teks + teks2);
};
handler.help = ["no"]
handler.tags = ["info"];
handler.command = ["owner"];
export default handler;
