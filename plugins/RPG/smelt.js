let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];

  let cok = `「 *Sᴍᴇʟᴛɪɴɢ* 」
    
▧ Gᴏʟᴅ 🪙
〉Need 5 raw Gold 🔸 & 1 Coal ▪️

▧ Dɪᴀᴍᴏɴᴅ 💎
〉Need 6 raw Diamond 💠 & 1 Coal ▪️

▧ iʀᴏɴ ⛓️
〉Need 2 raw iron ◽ & 1 Coal ▪️
`;

  try {
    if (/smelt|smelting/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(10, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);

      switch (type) {
        case "gold":
          if (user.rawgold >= count * 5 && user.coal >= count) {
            user.rawgold -= count * 5;
            user.coal -= count;
            user.gold += count;
            conn.reply(
              m.chat,
              `Sukses melebur raw Dan Menjadikan nya sebagai ${count} Gold 🪙`,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk melebur Emas b\nAnda butuh 5 Gold raw dan 1 coal untuk Melebur`,
              m
            );
          }
          break;
        case "diamond":
          if (user.rawdiamond >= count * 6 && user.coal >= count) {
            user.rawdiamond -= count * 6;
            user.coal -= count;
            user.diamond += count;
            conn.reply(m.chat, `Sukses melebur ${count} diamond`, m);
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk melebur diamond\nAnda butuh setidaknya 6 diamond raw dan 1 coal untuk meleburnya`,
              m
            );
          }
          break;
        case "iron":
          if (user.rawiron >= count * 2 && user.coal >= count) {
            user.rawiron -= count * 2;
            user.coal -= count;
            user.iron += count;
            conn.reply(m.chat, `Sukses Melebur ${count} Besi `, m);
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk melebur besu \nAnda butuh setidaknya 2 iron raw dan 1 coal untuk meleburnya`,
              m
            );
          }
          break;
        default:
          await conn.reply(m.chat, cok, m);
      }
    }
  } catch (e) {
    conn.reply(
      m.chat,
      `Sepertinya ada yang error, coba laporkan ke owner ya`,
      m
    );
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
          MessageType.text
        );
      }
    }
  }
};

handler.help = ["smelt <Type> <Jumlah>", "smeltinh <Type> <Jumlah>"];
handler.tags = ["rpg"];
handler.command = /^(smelt|smelting)$/i;

export default handler;
