let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];
  if (user.lokasi == 0)
    return m.reply("Merchant Sedang Tidak Berada di SafeZone");

  let cok = `· ᴍᴇʀᴄʜᴀɴᴛ-sᴛᴏʀᴇ ·

▧ ʀᴀʀᴇ-ᴍɪɴᴜᴍᴀɴ

──···☉ 🍺 ʙᴇᴇʀ
Pʀɪᴄᴇs : 10ᴊᴛ 💰

──···☉ 🍾 ᴡɪɴᴇ
Pʀɪᴄᴇs : 1.000.000 💰

▧ ʟɪᴍɪᴛᴇᴅ ɪᴛᴇᴍs 

ᴛɪᴅᴀᴋ ᴀᴅᴀ ʙᴀʀᴀɴɢ ʟɪᴍɪᴛᴇᴅ ʙᴜʟᴀɴ ɪɴɪ
ᴛᴜɴɢɢᴜ ʙᴜʟᴀɴ ᴅᴇᴘᴀɴ

Cᴀʀᴀ Mᴇᴍʙᴇʟɪ Iᴛᴇᴍs Dᴀʀɪ Mᴇʀᴄʜᴀɴᴛ
ᴄᴏɴᴛᴏʜ : .mbuy beer 4
`;

  let skyid = {
    text: cok.trim(),
    contextInfo: {
      externalAdReply: {
        title: `ᴛʀᴀᴠᴇʟɪɴɢ ᴍᴇʀᴄʜᴀɴᴛ`,
        body: "",
        thumbnailUrl: `https://telegra.ph/file/107389ee1504bfa8dc048.jpg`,
        sourceUrl: `www.Teguh.MD`,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  try {
    if (/merchant|mbuy/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(5, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);

      switch (type) {
        case "beer":
          if (user.money >= count * 1 && user.money >= count) {
            user.money -= count * 1;
            user.money -= count * 10000000;
            user.beer += count;
            conn.reply(
              m.chat,
              `Berhasil Membeli ${count} Beer \n Dari Traveling Merchant , Beer Adalah Minuman Rare `,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `kamu Tidak Memiliki Cukup Uang Untuk Membeli Ini`,
              m
            );
          }
          break;
        case "wine":
          if (user.money >= count * 1 && user.money >= count) {
            user.money -= count * 1;
            user.money -= count * 1000000;
            user.wine += count;
            conn.reply(
              m.chat,
              `Berhasil Membeli ${count} wine \n Dari Traveling Merchant , \n\nJika Kamu Meminum Wine Kamu Akan Memperoleh Strength +2 `,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `Merchant Marah 😡 Karena kamu Tidak Memiliki Cukup Uang Untuk Membeli Ini`,
              m
            );
          }
          break;
        case "kekuatan":
          if (user.stamina >= count * 20 && user.money >= count) {
            user.stamina -= count * 20;
            user.money -= count;
            user.strength += count;
            conn.reply(
              m.chat,
              `Berhasil Melatih Kekuatan , Strength Mu Bertambah + ${count} 💪🏻 `,
              m
            );
          } else {
            conn.reply(
              m.chat,
              `kamu Terlalu Lelah Untuk Berlatih Kamu Membutuhkan 20 stamina ⚡  `,
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

handler.help = ["merchant"];
handler.tags = ["rpg"];
handler.command = /^(mbuy|merchant)$/i;

export default handler;
