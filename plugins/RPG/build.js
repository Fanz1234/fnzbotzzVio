let handler = async (m, { conn, usedPrefix }) => {
  let thumb = "https://telegra.ph/file/f114dec81a3bf061a9ad1.jpg";
  let txt = `

`;
  let skyid = {
    text: txt.trim(),
    contextInfo: {
      externalAdReply: {
        title: `KᴏɴsTʀᴜᴋsɪ`,
        body: "",
        thumbnailUrl: `https://telegra.ph/file/f114dec81a3bf061a9ad1.jpg`,
        sourceUrl: `www.Teguh.MD`,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };
  await conn.sendMessage(m.chat, skyid, { quoted: m });
};
handler.help = ["konstruksi"];
handler.tags = ["rpg"];
handler.command = /^(build|konstruksi)/i;
handler.group = true;
export default handler;
