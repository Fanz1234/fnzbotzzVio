let handler = async (m, { conn, usedPrefix }) => {
  let thumb = "https://telegra.ph/file/f5742305fdf673f056e91.jpg";
  let txt = `「 *Sᴍᴇʟᴛɪɴɢ* 」
    
▧ Gᴏʟᴅ 🪙
〉Need 5 raw Gold 🔸 & 1 Coal ▪️

▧ Dɪᴀᴍᴏɴᴅ 💎
〉Need 6 raw Diamond  💠 & 1 Coal ▪️

▧ iʀᴏɴ ⛓️
〉Need 2 raw iron ◽ & 1 Coal ▪️

Kᴀᴍᴜ Bɪsᴀ Mᴇʟᴇʙᴜʀ Oʀᴇ & Raw Mᴜ Dɪsɪɴɪ

Sᴇᴍɪsᴀʟɴʏᴀ Kᴀᴍᴜ Iɴɢɪɴ Mᴇʟᴇʙᴜʀ Raw Gᴏʟᴅ Uɴᴛᴜᴋ Mᴇɴᴊᴀᴅɪ Gᴏʟᴅ

ᴋᴇᴛɪᴋ .sᴍᴇʟᴛ ɢᴏʟᴅ
`;
  let skyid = {
    text: txt.trim(),
    contextInfo: {
      externalAdReply: {
        title: `Pᴀɴᴅᴀɪ - Bᴇsɪ`,
        body: "",
        thumbnailUrl: `https://telegra.ph/file/799f54caf5e4fdd52b01b.jpg`,
        sourceUrl: `www.Teguh.MD`,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };
  await conn.sendMessage(m.chat, skyid, { quoted: m });
};
handler.help = ["smith"];
handler.tags = ["rpg"];
handler.command = /^(smith|peleburan)/i;
handler.group = true;
export default handler;
