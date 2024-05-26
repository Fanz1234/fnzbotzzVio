import { createHash } from "crypto";
let handler = async function (m, { args, usedPrefix, command }) {
  // if (!args[0]) return m.reply( `ðŸ“®Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`)
  let user = global.db.data.users[m.sender];
  //let sn = createHash('md5').update(m.sender).digest('hex')
  // if (args[0] !== sn) return m.reply( `ðŸš«Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`)
  user.registered = false;
  user.unreg = true;
  m.reply(`Kamu Berhasil keluar dari database\n\n${copyright}`);
};
handler.help = ["unreg"];
handler.tags = ["xp"];
handler.command = /^unreg(ister)?$/i;
handler.register = true;

export default handler;
