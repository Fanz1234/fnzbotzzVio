const cooldown = 300000;
let handler = async (m, { usedPrefix }) => {
  try {
    let user = global.db.data.users[m.sender];

    let timers = cooldown - (new Date() - user.lastmining);
    if (user.health < 80)
      return m.reply(
        `ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs ʙᴇʟᴏᴡ 80﹗\nᴩʟᴇᴀsᴇ ʜᴇᴀʟ ❤ ғɪʀsᴛ ᴛᴏ *ᴍɪɴɪɴɢ* ᴀɢᴀɪɴ.`.trim()
      );
    if (user.pickaxe == 0)
      return m.reply(
        "Kᴀᴍᴜ Tɪᴅᴀᴋ Mᴇᴍɪʟɪᴋɪ Pɪᴄᴋᴀxᴇ Uɴᴛᴜᴋ Mɪɴɪɴɢ , Cʀᴀғᴛ Tᴇʀʟᴇʙɪʜ Dᴀʜᴜʟᴜ"
      );
    if (user.strength < 4)
      return m.reply(
        "ᴋᴀᴍᴜ ʙᴇʟᴜᴍ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ ᴜɴᴛᴜᴋ ᴍɪɴɪɴɢ ᴋᴀᴍᴜ ʜᴀʀᴜs ᴍᴇᴍᴘᴜɴʏᴀɪ 5 💪🏻 , ᴘᴇʀɢɪ ʟᴀᴛɪʜ ғɪsɪᴋᴍᴜ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ .ʟᴀᴛɪʜ "
      );
    if (user.stamina < 60)
      return m.reply(
        "Kᴀᴍᴜ ᴛɪᴅᴀᴋ Mᴇᴍɪʟɪᴋɪ Sᴛᴀᴍɪɴᴀ Yᴀɴɢ Cᴜᴋᴜᴘ Kᴀᴍᴜ Hᴀʀᴜs ᴍᴇᴍᴘᴜɴʏᴀɪ Mɪɴɪᴍᴀʟ 60 Sᴛᴀᴍɪɴᴀ ⚡"
      );
    if (new Date() - user.lastmining <= cooldown)
      return m.reply(
        `
You're already mining!!, please wait *🕐${timers.toTimeString()}*
`.trim()
      );
    const rewards = reward(user);
    let text = "Kᴀᴍᴜ Mᴇɴᴀᴍʙᴀɴɢ Dᴀɴ Kᴇʜɪʟᴀɴɢᴀɴ";
    for (const lost in rewards.lost)
      if (user[lost]) {
        const total = rewards.lost[lost].getRandom();
        user[lost] -= total * 1;
        if (total) text += `\n*${global.rpg.emoticon(lost)}${lost}:* ${total}`;
      }
    text += `${
      user.pickaxe > 10
        ? "\n\n ✨ ᴋᴀʀɴᴀ ᴋᴀᴍᴜ ᴍᴇᴍᴀᴋᴀɪ ᴘɪᴄᴋᴀxᴇ ᴇxᴄʟᴜsɪᴠᴇ ᴛᴇɢᴜʜ ʜᴀsɪʟ ᴍɪɴɪɴɢ ᴍᴜ x2"
        : ""
    }`;
    text += "\n\nTᴀᴘɪ Kᴀᴍᴜ Mᴇɴᴅᴀᴘᴀᴛᴋᴀɴ";
    for (const rewardItem in rewards.reward)
      if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom();
        user[rewardItem] += total * 1;
        if (total)
          text += `\n*${global.rpg.emoticon(
            rewardItem
          )}${rewardItem}:* ${total}`;
      }
    let tego = {
      text: text.trim(),
      contextInfo: {
        externalAdReply: {
          title: `ʜᴀsɪʟ ᴍɪɴɪɴɢ`,
          body: "",
          thumbnailUrl: `https://telegra.ph/file/bac985a6976e44add1f78.jpg`,
          sourceUrl: `www.Teguh.MD`,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };
    await conn.sendMessage(m.chat, tego, { quoted: m });
    user.lastmining = new Date() * 1;
  } catch (e) {
    throw "Terjadi Kesalahan...";
  }
};
handler.help = ["mining"];
handler.tags = ["rpg"];
handler.command = /^(mining)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function reward(user = {}) {
  let rewards = {
    reward: {
      exp: 1000,
      trash: 101,
      string: 25,
      rock: 30,
      iron: 25,
      coal: [26, 72, 17, 2, 120, 20, 5, 7],
      emerald: [1, 0, 0, 0, 0],
      common: [10, 40, 82, 100, 3],
      uncommon: [34, 5, 23, 81],
      mythic: [0, 1, 0, 1, 0],
      legendary: [0, 0, 0, 1, 0, 0, 0, 0],
      rawiron: [0, 20, 7, 1, 20, 0],
      rawgold: [0, 5, 8, 0, 8, 1, 0],
      rawdiamond: [7, 2, 5, 0, 3, 0, 1, 0],
    },
    lost: {
      health: 40,
      stamina: 30,
      pickaxedurability: 10,
    },
  };
  return rewards;
}
