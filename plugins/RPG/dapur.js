let handler = async (m, { conn, usedPrefix }) => {
  let thumb = "https://telegra.ph/file/f5742305fdf673f056e91.jpg";
  let txt = `\n\n⋇ 𝙍𝙚𝙨𝙚𝙥 𝘿𝙖𝙣 𝘽𝙖𝙝𝙖𝙣 𝙈𝙖𝙠𝙖𝙣𝙖𝙣 ⋇\n\n▧ sᴛᴇᴀᴋ 🥩\nᵇᵃʰᵃⁿ :\n² ˢᵃᵖⁱ \n¹ ᶜᵒᵃˡ \n\n▧ ᴀʏᴀᴍ ʙᴀᴋᴀʀ 🍖\nᵇᵃʰᵃⁿ :\n² ᵃʸᵃᵐ \n¹ ᶜᵒᵃˡ \n\n▧ ᴋᴇᴘɪᴛɪɴɢ ʙᴀᴋᴀʀ 🦀\nᵇᵃʰᵃⁿ :\n² ᵏᵉᵖⁱᵗⁱⁿᵍ\n¹ ᶜᵒᵃˡ\n\n\n𝙲𝚊𝚛𝚊 𝙼𝚎𝚖𝚊𝚜𝚊𝚔 :\n.masak ( Makanan ) ( Jumlah )\n𝙲𝚘𝚗𝚝𝚘𝚑 :\n.masak kepitingbakar 1`;
  let skyid = {
    text: txt.trim(),
    contextInfo: {
      externalAdReply: {
        title: `Ｄａｐｕｒ`,
        body: "",
        thumbnailUrl: `https://telegra.ph/file/3fd6fd396aa952b85c2fc.jpg`,
        sourceUrl: `www.Teguh.MD`,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };
  await conn.sendMessage(m.chat, skyid, { quoted: m });
};
handler.help = ["dapur"];
handler.tags = ["rpg"];
handler.command = /^(dapur|cook)/i;
handler.group = true;
export default handler;
