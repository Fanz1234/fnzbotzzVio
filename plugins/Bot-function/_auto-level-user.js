let handler = (m) => m;

handler.before = async function (m, { conn, setReply, isOwner, prefix }) {
  const isCmd = m.body.startsWith(prefix);
  const user = global.db.data.users[m.sender];

  //User
  const userLevel = user ? db.data.users[m.sender].level : false;
  const userExp = user ? db.data.users[m.sender].exp : false;
  const userId = user ? db.data.users[m.sender].id : false;
  const amountExp = Math.floor(Math.random() * 10) + 50;
  const requiredExp = userLevel == 0 ? 500 : 1000 * userLevel;
  const userPersen = (userExp / requiredExp) * 100;
  const userVerified = user ? db.data.users[m.sender].date : false;

  //Auto level users
  if (isCmd && user && userExp >= requiredExp) {
    const { userXp, userLeveling } = await import("../../lib/user.js");
    let link = "https://telegra.ph/file/9528a0b81d1b46bdb5507.jpg";
    let level = userLevel + 1;
    let uang = 1000 * level;

    db.data.users[m.sender].exp = userExp - requiredExp;
    db.data.users[m.sender].level += 1;
    db.data.users[m.sender].money += 1000 * level;
    db.data.users[m.sender].grade = userLeveling(
      `${db.data.users[m.sender].level + 1}`
    );

    let contextInfo = {
      externalAdReply: {
        showAdAttribution: false,
        mediaType: 1,
        title: "Extream",
        thumbnailUrl: myUrl,
        renderLargerThumbnail: true,
        mediaUrl: "https://chat.whatsapp.com/GsX10XuzZqQ99jccdcDasi",
        sourceId: copyright,
        sourceUrl: "https://chat.whatsapp.com/GsX10XuzZqQ99jccdcDasi",
      },
    };

    let mentions = [m.sender];
    let text = `◪ *Nama:* ${user ? user.name : m.pushname}
    ├◆ *Pangkat:* ${userLeveling(`${db.data.users[m.sender].level + 1}`)}
    ├◆ *Saldo:* + Rp ${uang.toLocaleString()}
    ╰◆ *Level:*  ${userLevel} ➠ ${userLevel + 1}
    `;
    //conn.sendMessage(from,{contextInfo, text,mentions})
    setReply(text);
  }
};
export default handler;
