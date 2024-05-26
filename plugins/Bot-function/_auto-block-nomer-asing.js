import _ban from "../../lib/banned.js"


let handler = (m) => m;
handler.before = async function (m, { conn,isPremium,isOwner,chatUpdate }) {
    const ban = db.data.banned

//AUTO BLOCK NOMER ASING +212
let nomerAsing = m.senderNumber.startsWith('212')
if (nomerAsing) {
console.log(`Nomer asing dari ${m.senderNumber}`)
await m.reply("you are not allowed to using this bot")
let Name = await conn.getName(m.sender)
let alasan = 'Nomer asing' 

_ban.add(Name,calender,m.senderNumber,alasan, ban)
return conn.updateBlockStatus(sender, "block")
}

};
export default handler;
