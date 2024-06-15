import fs from 'fs-extra'
let handler = async (m, { conn, text }) => {
	//if (!isGroup) return onlyGroup()
//if (!isPremium && global.db.data.users[sender].glimit < 1) return onlyGlimit()
let poin = 9999
let timeout = 120000
let id = m.chat

//let but1 = [{"buttonId": `${prefix}tebakbendera`,"buttonText": {"displayText": `🎮 ᴍᴀɪɴ ʟᴀɢɪ`},"type": "RESPONSE"}]
if (id in conn.tebakbendera) return setReply('Masih ada soal belum terjawab di chat ini')
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json')).json()
let json = src[Math.floor(Math.random() * src.length)]
let teks = `Bendera Apakah Ini ?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Exp : +999
Bonus : +${poin} Saldo`.trim()
conn.tebakbendera[id] = [
conn.sendImage(from, json.img , teks, m),
json, poin,
setTimeout(() => {
if (conn.tebakbendera[id]) 
setReply(`Waktu game telah habis
Jawabannya adalah : ${json.name}`)  
delete conn.tebakbendera[id]
 }, timeout)
 ]
db.data.users[sender].glimit -= 0 
}
handler.help = ["tebakbendera"];
handler.tags = ["game"];
handler.command = /^tebakbendera$/i;

handler.onlyprem = true;
handler.game = true;

export default handler;