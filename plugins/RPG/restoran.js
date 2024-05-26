let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];

  let cok = `ʜᴀʟʟᴏ 
    Kᴀᴍɪ Mᴇɴᴊᴜᴀʟ Bᴇʙᴇʀᴀᴘᴀ Mᴀᴋᴀɴᴀɴ Cᴇᴘᴀᴛ Sᴀᴊɪ
    
    ᴀᴘᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ᴘᴇsᴀɴ?
···☉ 🍕 ᴘɪᴢᴢᴀ
Pʀɪᴄᴇs : 100rb 💰

···☉ 🍔 ʙᴜʀɢᴇʀ
Pʀɪᴄᴇs : 50ʀʙ  💰

ᴄᴀʀᴀ ᴍᴇᴍᴇsᴀɴ ᴍᴀᴋᴀɴᴀɴ 
.order [Makanan ] [jumlah]
`;

  let skyid = {
    text: cok.trim(),
    contextInfo: {
      externalAdReply: {
        title: `Rᴇsᴛᴀᴜʀᴀɴᴛ`,
        body: "",
        thumbnailUrl: `https://telegra.ph/file/a4b35032e2a6df52a6727.jpg`,
        sourceUrl: `www.Teguh.MD`,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  try {
    if (/restoran|order/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(5, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);

      switch (type) {
        case "burger":
          if (user.money >= count * 1 && user.money >= count) {
            user.money -= count * 1;
            user.money -= count * 50000;
            user.burger += count;
            conn.reply(
              m.chat,
              `Kamu Memesan ${count} Burger \n\n Burger Akan Segera Datang Ke Inventory Mu Dalam 1 Detik`,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `kamu Tidak Memiliki Cukup Uang Untuk Order ${count} Burger`,
              m
            );
          }
          break;
        case "pizza":
          if (user.money >= count * 1 && user.money >= count) {
            user.money -= count * 1;
            user.money -= count * 100000;
            user.pizza += count;
            conn.reply(
              m.chat,
              `Kamu Memesan ${count} pizza \n\n Pizzamu Akan Segera Datang Ke Inventory Mu Dalam 1 Detik`,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `kamu Tidak Memiliki Cukup Uang Untuk Order ${count} pizza`,
              m
            );
          }
          break;
        default:
          await conn.sendMessage(m.chat, skyid, { quoted: m });
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

handler.help = ["restoran"];
handler.tags = ["rpg"];
handler.command = /^(restoran|order)$/i;

export default handler;
