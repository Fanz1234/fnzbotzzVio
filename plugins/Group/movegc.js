import ms from "parse-ms"

let handler = async (m, { prefix, command, q,setReply,isOwner}) => {

if (m.isGroup && !m.isAdmin && !isOwner) return setReply('hanya admin dan owner')
if(!q && m.isGroup) throw 'Masukan link group yang ingin di pindah'
if(!q && !m.isGroup) throw 'Untuk memindahkan bot di private chat Ketik .movegc idgc|linkgc untuk mendapatkan idgc, ketik .cekid di gcnya'
if(!m.isGroup && !q.includes("|")) return setReply(`Ketik ${prefix+command} idGc|linkgc`)


let idGc= m.isGroup? m.chat : q.split("|")[0];
let linkGc = m.isGroup? q : q.split("|")[1]
let chat = db.data.chats[idGc]
if(!chat) throw 'Id group tidak di temukan di database bot'
if(chat && chat.expired === 0) throw `Group dengan Id : ${idGc} tidak memilik waktu order`
let rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
let code = m.isGroup? q.match(rex1) : q.split("|")[1].match(rex1)
if (code == null) return  setReply("No invite url detected.");
let kode = code[0].replace("chat.whatsapp.com/", "");
let { id, subject,creation,desc,descId,participants,owner,subjectOwner } = await conn.groupGetInviteInfo(kode).catch(async () => {
    return setReply("Invalid invite url.");
    });
let tagnya = owner == undefined?  subjectOwner == undefined? "" : subjectOwner : owner
var creator = `${owner == undefined? "wa.me/"+ subjectOwner == undefined? "Tidak ada" : "wa.me/"+ subjectOwner.split("@")[0]: "wa.me/"+ owner.split("@")[0]}`

let newChat = db.data.chats[id]

if(newChat){
	 
    newChat.timeEnd = chat.timeEnd
    newChat.linkgc = linkGc
    newChat.id = id
    newChat.expired = chat.expired
    newChat.threeDaysLeft = chat.expired.threeDaysLeft
    newChat.tenDaysLeft = chat.expired.tenDaysLeft
    newChat.oneDaysLeft = chat.expired.oneDaysLeft
    newChat.endDays = chat.expired.endDays
    newChat.timeOrder = chat.timeOrder
    newChat.creator = creator
    newChat.name = subject
	
} else db.data.chats[id] = {
  name: subject,
  id: id,
  opened: chat.opened,
  closed: chat.closed,
  tenDays: chat.tenDays,
  treeDays: chat.treeDays,
  oneDays: chat.oneDays,
  linkgc: linkGc,
  expired: chat.expired,
  tenDaysLeft: chat.tenDaysLeft,
  treeDaysLeft: chat.treeDaysLeft,
  oneDaysLeft: chat.oneDaysLeft,
  threeDaysLeft: chat.threeDaysLeft,
  timeOrder: chat.timeOrder,
  creator: creator,
  timeEnd: chat.timeEnd,
  endDays: chat.endDays
}




let cekid = ms(chat.expired - Date.now())



let contextInfo = {
forwardingScore: 50,
isForwarded: true,
mentionedJid:[tagnya],

externalAdReply:{
showAdAttribution: false,
title: fake,
body:baileysVersion,
mediaType: 1,
sourceUrl:"https://wa.me/c/6285953938243",
thumbnailUrl: 'https://telegra.ph/file/0aa9d587a19e37a0b0122.jpg'
}
}





try{
 var nana = await conn.groupAcceptInvite(kode) 
} catch{
  var nana = undefined
}

let groupMetadata = nana == undefined? {} : await conn.groupMetadata(id) 
let data = nana == undefined? participants : groupMetadata.participants
let member = data.filter(u => u.admin !== 'admin' || u.admin !== 'superadmin' )
let admin = data.filter(u => u.admin === 'admin' || u.admin === 'superadmin' )
 

let text =`
––––––『 MOVE GROUP SUCCESS 』––––––
🔰 Group: ↓
• Name: ${subject}
• Creat at:  ${new Date(creation * 1000).toLocaleString()}
• Creator: ${creator}
• Group Id: ${id}
• Admin: ${admin.length}
• Members: ${member.length}
• Days:  ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit
• Countdown: ${chat.expired - Date.now()}
• Time order: ${chat.timeOrder}
• Time end: ${chat.timeEnd}
•·–––––––––––––––––––––––––·•
📮 Note: ↓
• Ketik ${prefix}menu untuk mengakses bot
• Ketik ${prefix}ceksewa untuk melihat sisa sewa
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk menyewa bot
• Owner wa.me/${nomerOwner}

${copyright} - ${calender}`



await conn.sendMessage(m.chat,{text,contextInfo,mentions:[tagnya]})
if(nana == undefined ) return m.reply('Waiting for approval to join group')
await sleep(2000)
await conn.sendMessage(id,{text,contextInfo,mentions:[tagnya]})
await  conn.groupLeave(idGc)
delete db.data.chats[idGc]








};

handler.command = ['movegc','moveongc','pindah','pindahbot'];
handler.tags = ['internet'];
handler.group = true
export default handler;