
const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m, { conn }) {
  let id = "siapakahaku-" + m.chat;
  conn.game = conn.game ? conn.game : {};
  if (id in conn.game) {
    let json = JSON.parse(JSON.stringify(conn.game[id][1]));
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += conn.game[id][2];
      m.reply(`*Benar!*\n+${conn.game[id][2]} XP`);
      clearTimeout(conn.game[id][3]);
      delete conn.game[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    )
      m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
};
handler.exp = 0;
export default handler;
