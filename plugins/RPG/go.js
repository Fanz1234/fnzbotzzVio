let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];
  if (user.horse < 4)
    return m.reply("ᴋᴀᴍᴜ ʜᴀʀᴜs ᴍᴇᴍɪʟɪᴋɪ 🐴 ʜᴏʀsᴇ ʟᴇᴠᴇʟ 4 ᴜɴᴛᴜᴋ ʙᴇʀᴘᴇʀɢɪᴀɴ");

  let cok = `Kemana Kamu Ingin Pergi?
    
   - ᴍᴇʀᴄʜᴀɴᴛ sᴀᴀᴛ ɪɴɪ ʙᴇʀᴀᴅᴀ ᴅɪ ᴅᴇsᴇʀᴛ
    
 [ ❓ ]  Example .go Desert
`;

  try {
    if (/go|pergi/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(1, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);

      switch (type) {
        case "desert":
          if (user.strength >= 100 && user.speed >= 100) {
            user.stamina -= 50;
            user.lokasi = 1;
            conn.sendMessage(
              m.chat,
              {
                video: {
                  url: "https://telegra.ph/file/2cf5e9386ff08d3a75625.mp4",
                },
                caption: "You Traveled To Desert",
                gifPlayback: true,
                gifAttribution: 0,
              },
              {
                quoted: m,
              }
            );
          } else {
            conn.reply(
              m.chat,
              `Kamu Belum Cukup Kuat Untuk Pergi ke Desert \n\n Kamu Harus Memiliki Kemampuan \n Speed : 100 \n Strength : 100`,
              m
            );
          }
          break;
        case "rumah":
          if (user.rumah >= 1) {
            user.stamina -= 50;
            user.lokasi = 4;
            conn.sendMessage(
              m.chat,
              {
                video: {
                  url: "https://telegra.ph/file/09a64b4970f7a92435af0.mp4",
                },
                caption: "Kamu Kembali Ke rumahmu",
                gifPlayback: true,
                gifAttribution: 0,
              },
              {
                quoted: m,
              }
            );
          } else {
            conn.reply(
              m.chat,
              `Kamu Belum Cukup Kuat Untuk Pergi ke Desert \n\n Kamu Harus Memiliki Kemampuan \n Speed : 100 \n Strength : 100`,
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
        case "hell":
          if (user.strength >= 1000 && user.defense >= 1000) {
            user.stamina -= 50;
            user.lokasi = 2;
            conn.sendMessage(
              m.chat,
              {
                video: {
                  url: "https://telegra.ph/file/1418eb51d327340b4c2a4.mp4",
                },
                caption: "You Are Going To Hell , Theres A Demon Waiting You",
                gifPlayback: true,
                gifAttribution: 0,
              },
              {
                quoted: m,
              }
            );
          } else {
            conn.reply(
              m.chat,
              `Kamu Belum Cukup Kuat Untuk Pergi ke Neraka (Hell) \n\n Kamu Harus Memiliki Kemampuan \n defense : 1000 \n Strength : 1000`,
              m
            );
          }
          break;
        case "forest":
          if (user.strength >= 10 && user.defense >= 10) {
            user.stamina -= 50;
            user.lokasi = 3;
            conn.sendMessage(
              m.chat,
              {
                video: {
                  url: "https://telegra.ph/file/356040480448b1c79431a.mp4",
                },
                caption: "ʏᴏᴜ ɢᴏɪɴɢ ᴛᴏ ғᴏʀᴇsᴛ ᴀɴᴅ ᴍᴇᴇᴛ sᴏᴍᴇ ᴄʀᴇᴇᴘʏ ᴄʀᴇᴀᴛᴜʀᴇs",
                gifPlayback: true,
                gifAttribution: 0,
              },
              {
                quoted: m,
              }
            );
          } else {
            conn.reply(
              m.chat,
              `Kamu Belum Cukup Kuat Untuk Pergi ke Hutan \n\n Kamu Harus Memiliki Kemampuan \n defense : 10 \n Strength : 10`,
              m
            );
          }
          break;
        case "safezone":
          if (user.stamina >= 50) {
            user.stamina -= 50;
            user.lokasi = 0;
            conn.sendMessage(
              m.chat,
              {
                video: {
                  url: "https://telegra.ph/file/2cf5e9386ff08d3a75625.mp4",
                },
                caption: "You Traveled To SafeZone",
                gifPlayback: true,
                gifAttribution: 0,
              },
              {
                quoted: m,
              }
            );
          } else {
            conn.reply(m.chat, `Kamu Tidak Memiliki Stamina Yang Cukup`, m);
          }
          break;
        default:
          await conn.sendFile(
            m.chat,
            "https://telegra.ph/file/91a1f9892a2c5371110ed.jpg",
            "",
            cok,
            m
          );
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

handler.help = ["go"];
handler.tags = ["rpg"];
handler.command = /^(go|pergi)$/i;

export default handler;
