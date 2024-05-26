let handler = async (m, { command, usedPrefix, args }) => {
  let user = global.db.data.users[m.sender];
  let upgrd = (args[0] || "").toLowerCase();
  let type = (args[0] || "").toLowerCase();
  let _type = (args[1] || "").toLowerCase();
  let jualbeli = (args[0] || "").toLowerCase();
  const list = `
╭━━━━「 *Sisa Potion & Minuman* 」
┊ 🍾 ᴡɪɴᴇ : ${user.wine}
┊ 🥤 ᴘᴏᴛɪᴏɴ : ${user.potion}
┊ 🍺 ʙᴇᴇʀ : ${user.beer}
╰═┅═━––––––─ׄ✧
example .minum beer

gunakan spasi
`.trim();
  //try {
  if (/minum|drink/i.test(command)) {
    const count =
      args[1] && args[1].length > 0
        ? Math.min(99999999, Math.max(parseInt(args[1]), 1))
        : !args[1] || args.length < 3
        ? 1
        : Math.min(1, count);
    switch (type) {
      case "wine":
        if (user.stamina < 100) {
          if (user.wine >= count * 1) {
            user.wine -= count * 1;
            user.stamina += 20 * count;
            user.strength += 2 * count;
            conn.reply(
              m.chat,
              `Kamu Meminum Sebotol Wine Dan Merasakan Kekuatan Yang Dahsyat \n\n Kamu Mendapatkan 2 Strength Dan 20 Stamina`,
              m
            );
          } else conn.reply(m.chat, ` wine kamu kurang`, m);
        } else conn.reply(m.chat, `Stamina kamu sudah penuh`, m);
        break;
      case "potion":
        if (user.health < 100) {
          if (user.potion >= count * 1) {
            user.potion -= count * 1;
            user.health += 20 * count;
            conn.reply(
              m.chat,
              `You Feel Healthy Kamu Meminum ${count} potion`,
              m
            );
          } else conn.reply(m.chat, `kamu Tidak Memiliki Potion Yang Cukup`, m);
        } else conn.reply(m.chat, `Darah Mu Sudah Penuh`, m);
        break;
      case "beer":
        if (user.level < 200) {
          if (user.beer >= count * 1) {
            user.beer -= count * 1;
            user.lastmining = 0;
            user.lastmisi = 0;
            user.lastadventure = 0;
            user.lastdungeon = 0;
            user.stamina += 20 * count;
            conn.reply(
              m.chat,
              `Semua Cooldown Mu Dihapus Kamu Bisa Kerja , Mining & Dll Sekarang`,
              m
            );
          } else conn.reply(m.chat, `Beer Mu Tidak Cukup`, m);
        } else
          conn.reply(
            m.chat,
            `Kamu Tidak Bisa Lagi Meminum Beer Karena Level Mu Sudah Diatas 200`,
            m
          );
        break;
      default:
        await conn.reply(m.chat, list, m);
    }
  } else if (/p/i.test(command)) {
    const count =
      args[2] && args[2].length > 0
        ? Math.min(99999999, Math.max(parseInt(args[2]), 1))
        : !args[2] || args.length < 4
        ? 1
        : Math.min(1, count);
    switch (_type) {
      case "p":
        break;
      default:
        return conn.reply(m.chat, list, m);
    }

    console.log(e);
    if (DevMode) {
      for (let jid of global.owner
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .filter((v) => v != conn.user.jid)) {
        conn.reply(
          jid,
          "shop.js error\nNo: *" +
            m.sender.split`@`[0] +
            "*\nCommand: *" +
            m.text +
            "*\n\n*" +
            e +
            "*",
          m
        );
      }
    }
  }
};

handler.help = ["drink", "minum"];
handler.tags = ["rpg"];
handler.register = true;
handler.command = /^(drink|minum)$/i;
export default handler;
