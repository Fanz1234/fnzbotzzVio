let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];

  let cok = `「 *C O O K I N G* 」
    
▧ ayambakar 🍖
〉Need 2 ayam 🐓 & 1 Coal 🕳️

▧ steak 🥩
〉Need 2 sapi 🐮 & 1 Coal 🕳️

▧ kepiting bakar 🦀
〉Need 2 kepiting 🦀 & 1 Coal 🕳️

example .masak ayambakar

gunakan spasi`;

  try {
    if (/masak|cook/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(5, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);

      switch (type) {
        case "ayambakar":
          if (user.ayam >= count * 2 && user.coal >= count) {
            user.ayam -= count * 2;
            user.coal -= count;
            user.ayambakar += count;
            conn.reply(m.chat, `Sukses memasak ${count} ayam bakar🍖`, m);
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk memasak ayam bakar\nAnda butuh 2 ayam dan 1 coal untuk memasak`,
              m
            );
          }
          break;
        case "steak":
          if (user.sapi >= count * 2 && user.coal >= count) {
            user.sapi -= count * 2;
            user.coal -= count;
            user.steak += count;
            conn.reply(m.chat, `Sukses memasak ${count} Steak`, m);
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk memasak steak\nAnda butuh 2 sapi dan 1 coal untuk memasak`,
              m
            );
          }
          break;
        case "kepitingbakar":
          if (user.kepiting >= count * 2 && user.coal >= count) {
            user.kepiting -= count * 2;
            user.coal -= count;
            user.kepitingbakar += count;
            conn.reply(m.chat, `Sukses memasak ${count} kepiting bakar🍖`, m);
          } else {
            conn.reply(
              m.chat,
              `Anda tidak memiliki cukup bahan untuk memasak kepiting bakar\nAnda butuh 2 kepiting dan 1 coal untuk memasak`,
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

handler.help = ["masak <masakan> <args>", "cook <masakan> <args>"];
handler.tags = ["rpg"];
handler.command = /^(masak|cook)$/i;

export default handler;
