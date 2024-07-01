import fs from 'fs-extra'
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.game = conn.game ? conn.game : {};
  let id = "tebakanime-" + m.chat;
  if (id in conn.game)
    return conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.game[id][0]
    );
  let src = await (await fetch('https://raw.githubusercontent.com/unx21/ngetezz/main/src/data/nyenyenye.json')).json()
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = `
animek apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hanime untuk bantuan
Bonus: ${poin} XP
`.trim();
  conn.game[id] = [
    await conn.sendFile(m.chat, json.img, "tebakanime.jpg", caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.game[id])
        conn.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
          conn.game[id][0]
        );
      delete conn.game[id];
    }, timeout),
  ];
};
handler.help = ["tebakanime"];
handler.tags = ["game"];
handler.command = /^tebakanime$/i;

handler.onlyprem = true;
handler.game = true;

export default handler;
