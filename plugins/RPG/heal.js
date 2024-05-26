import { join } from "path";
import { promises } from "fs";

let handler = async (m, { q, args, usedPrefix, __dirname }) => {
  let user = global.db.data.users[m.sender];
  if (q == "health") {
    if (user.health >= 100) return m.reply(`Your ❤️health is full!`);
    const heal = 40 + user.cat * 4;
    let count =
      Math.max(
        1,
        Math.min(
          Number.MAX_SAFE_INTEGER,
          (isNumber(args[0]) && parseInt(args[0])) ||
            Math.round((100 - user.health) / heal)
        )
      ) * 1;
    if (user.potion < count)
      return m.reply(
        `ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴜʏ ${count - user.potion} ᴍᴏʀᴇ 🥤ᴩᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ.ʏᴏᴜ'ᴠᴇ ${
          user.potion
        } 🥤ᴩᴏᴛɪᴏɴ ɪɴ ʙᴀɢ.`.trim()
      );
    user.potion -= count * 1;
    user.health += heal * count;
    m.reply(`sᴜᴄᴄᴇssғᴜʟʟʏ ${count} 🥤ᴩᴏᴛɪᴏɴ ᴜsᴇ ᴛᴏ ʀᴇᴄᴏᴠᴇʀ ʜᴇᴀʟᴛʜ.`);
  } else if (q == "stamina") {
    if (user.stamina >= 100) return m.reply(`Kamu Sudah Sehat`.trim());
    let buf = user.cat;
    let buff =
      buf == 0
        ? "5"
        : "" || buf == 1
        ? "10"
        : "" || buf == 2
        ? "15"
        : "" || buf == 3
        ? "20"
        : "" || buf == 4
        ? "25"
        : "" || buf == 5
        ? "30"
        : "" || buf == 6
        ? "35"
        : "" || buf == 7
        ? "40"
        : "" || buf == 8
        ? "45"
        : "" || buf == 9
        ? "50"
        : "" || buf == 10
        ? "100"
        : "" || buf == 11
        ? "100"
        : "";
    const heal = 15 + buff * 4;
    let count =
      Math.max(
        1,
        Math.min(
          Number.MAX_SAFE_INTEGER,
          (isNumber(args[0]) && parseInt(args[0])) ||
            Math.round((100 - user.stamina) / heal)
        )
      ) * 1;
    if (user.potion < count)
      return m.reply(
        `
Potion Kamu Ga Ada Kak, Kamu Memiliki *${user.potion}* Potion
Ketik *${usedPrefix}shop buy potion ${count - user.potion}* Untuk Membelinya
`.trim()
      );
    user.potion -= count * 1;
    user.stamina += heal * count;
    m.reply(
      `
Sukses Menggunakan Potion, Kamu Sehat WalAfiat Sekarang
`.trim()
    );
  } else m.reply("Masukan query health atau stamina");
};

handler.help = ["heal"];
handler.tags = ["rpg"];
handler.command = /^(heal)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
