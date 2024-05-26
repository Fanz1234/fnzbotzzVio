const cooldown = 86400000;
let handler = async (m, { conn, args, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let ctimer = new Date() - user.lastcode;
  let _ctimer = cooldown - ctimer;
  let timers = clockString(_ctimer);
  if (args.length == 0)
    return conn.reply(m.chat, `𝘏𝘢𝘳𝘢𝘱 𝘔𝘢𝘴𝘶𝘬𝘢𝘯 𝘒𝘰𝘥𝘦 𝘚𝘱𝘦𝘴𝘪𝘢𝘭 𝘈𝘯𝘥𝘢..!!`, m);
  let kodes =
    args[0] == "season1" ||
    args[0] == "443321" ||
    args[0] == "662522" ||
    args[0] == "322929" ||
    args[0] == "562622" ||
    args[0] == "432282" ||
    args[0] == "002819" ||
    args[0] == "715611" ||
    args[0] == "882910" ||
    args[0] == "882010" ||
    args[0] == "937100" ||
    args[0] == "736390" ||
    args[0] == "762837" ||
    args[0] == "028393" ||
    args[0] == "625529" ||
    args[0] == "727638" ||
    args[0] == "992719" ||
    args[0] == "092739" ||
    args[0] == "727269" ||
    args[0] == "629461" ||
    args[0] == "239210";
  if (kodes) {
    if (user.lastgift < cooldown) {
      conn.reply(
        m.chat,
        `*𝘉𝘦𝘳𝘩𝘢𝘴𝘪𝘭 𝘙𝘦𝘥𝘦𝘦𝘮 𝘒𝘰𝘥𝘦 𝘚𝘱𝘦𝘴𝘪𝘢𝘭*\n1 Exclusive Tbox\n 100 limit \n 50 pizza`,
        m
      );
      user.exp += 25000;
      user.tbox += 1;
      user.limit += 100;
      user.pizza += 50;
      user.lastgift = new Date() * 1;
    } else {
      return m.reply(
        `Hei Anda sudah mengambill code gift, Code gift anda sudah kadaluarsa..\nTunggu besok iya kak..\n${timers}`.trim()
      );
    }
  } else {
    return m.reply(" 𝙺𝚘𝚍𝚎 𝚁𝚎𝚍𝚎𝚎𝚖 𝚂𝚊𝚕𝚊𝚑 ");
  }
};
handler.help = ["redeem"];
handler.tags = ["tgh"];
handler.command = /^(redemcode|coderedem|redeem)$/i;

handler.cooldown = cooldown;
export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    d,
    " *Days ☀️*\n ",
    h,
    " *Hours 🕐*\n ",
    m,
    " *Minute ⏰*\n ",
    s,
    " *Second ⏱️* ",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
