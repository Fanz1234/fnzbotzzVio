import ms from "parse-ms"
import moment from "moment-timezone" // 

let handler = async (m, { conn, args,setReply, usedPrefix, command }) => {

let chat = db.data.chats[m.chat]
if (!m.isGroup) return setReply(mess.only.group)
if (chat.expired == 0) return setReply(`Group ini tidak terdaftar dalam list sewabot. Ketik .sewabot untuk info lebih lanjut`)
let { id, subject,creation,desc,descId,participants,owner,subjectOwner } = await conn.groupMetadata(m.chat)
let cekid = ms(chat.expired - Date.now())
let tagnya = owner == undefined?  subjectOwner: owner
let creator = `${owner == undefined? subjectOwner  == undefined? 'Tidak ada' : "@"+ subjectOwner.split("@")[0]: "@"+ owner.split("@")[0]}`
let member = participants
let admin = member.filter(u => u.admin === 'admin' || u.admin === 'superadmin' )
let cekbulan = Math.floor(cekid.days / 30);
let teks = `
––––––『 *ORDER EXPIRE* 』––––––

🔰 *Group*
• Name: ${m.groupName}
• Creat at: ${new Date(creation * 1000).toLocaleString()}
• Creator: ${creator}
• Group Id: ${m.chat}
• Admin: ${admin.length}
• Members: ${member.length}
• Days:  ${cekbulan} Bulan ${cekid.days - cekbulan * 30} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit
• Countdown: ${chat.expired - Date.now()}
• Time order: ${chat.timeOrder}
• Time end: ${chat.timeEnd}
•·–––––––––––––––––––––––––·•

📮 *Note:* ↓
• Ketik .menu untuk mengakses bot
• Ketik .ceksewa untuk melihat sisa sewa
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk menyewa bot
• Owner wa.me/${nomerOwner} 

${copyright} - ${calender}`
conn.sendMessage(m.chat,{text:teks,mentions:[tagnya]},{quoted:m})
}
handler.help = ['cekexpired']
handler.tags = ['group']
handler.command =['ceksewa','cekexpired','sewacek','cekorder','ordercek']
handler.group = true

export default handler