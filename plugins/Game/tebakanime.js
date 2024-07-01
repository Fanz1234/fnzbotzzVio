let fetch = require('node-fetch')

let timeout = 180000
let poin = 1000
let tiketcoin = 1
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakanime = conn.tebakanime ? conn.tebakanime : {}
  let id = m.chat
  if (id in conn.tebakanime) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini!', conn.tebakanime[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/unx21/ngetezz/main/src/data/nyenyenye.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  // if (!json.status) throw json
  let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}wa untuk clue
Bonus: ${poin} XP
TiketCoin: ${tiketcoin}
    `.trim()
  conn.tebakanime[id] = [
    await conn.sendFile(m.chat, json.img, 'tebakgame.jpg', caption, m, false, { thumbnail: Buffer.alloc(0) }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakanime[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakanime[id][0])
      delete conn.tebakanime[id]
    }, timeout)
  ]
}
handler.help = ['tebakanime']
handler.tags = ['game']
handler.command = /^tebakanime/i
handler.limit = true
handler.group = false

export default handler;
