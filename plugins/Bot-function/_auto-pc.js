let handler = (m) => m;

handler.before = async function (m, { conn, isPremium }) {
  const user = db.data.users[m.sender];

  //User Private Chat
  if (!m.isGroup && user && isPremium && new Date() - user.pc < 86400000) {
  } else if (!m.isGroup && user && isPremium && !m.itsMe) {
    m.reply(
      `Hai ${m.ucapanWaktu} kak *${m.pushname}*  ada yang bisa aku bantu ? silakan ketik .menu`
    );
    user.pc = new Date() * 1;
  }
};
export default handler;
