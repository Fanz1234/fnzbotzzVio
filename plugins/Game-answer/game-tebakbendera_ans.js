const similarity = require('similarity')
const threshold = 0.72
export async function before(m, { conn }) {
	let id = "tebakbendera-" + m.chat
	conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}  

// let but8 = [{"buttonId": `${prefix}tebakbendera`,"buttonText": {"displayText": `🎮 ᴍᴀɪɴ ʟᴀɢɪ`},"type": "RESPONSE"}]
 let json = JSON.parse(JSON.stringify(conn.tebakbendera[id][1]))
 if (budy.toLowerCase() == json.name.toLowerCase().trim()) {
global.db.data.users[m.sender].money += conn.tebakbendera[id][2]
global.db.data.users[m.sender].exp += conn.tebakbendera[id][2]
setReply(`*TEBAK BENDERA*

Jawaban Kamu Benar!
Bonus Saldo : +${conn.tebakbendera[id][2]}
Exp : +999`)  
 clearTimeout(conn.tebakbendera[id][3])
 delete conn.tebakbendera[id]
 } else if(similarity(budy.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) setReply(`*Dikit Lagi!*`)

}
}
export const exp = 0;