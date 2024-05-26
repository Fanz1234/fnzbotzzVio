
const threshold = 0.72;
export async function before(m, { conn }) {
  let id = "tebakgame-" + m.chat;
  conn.game = conn.game ? conn.game : {};
  if (id in conn.game) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
    if (isSurrender) {
      clearTimeout(conn.game[id][3]);
      delete conn.game[id];
      return m.reply("*Yah Menyerah :( !*");
    }
    let json = JSON.parse(JSON.stringify(this.game[id][1]));
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
}
export const exp = 0;
