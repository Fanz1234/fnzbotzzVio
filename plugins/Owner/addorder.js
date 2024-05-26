import fs from 'fs-extra'
import toMs from "ms";
import ms from "parse-ms"
import moment from "moment-timezone"

let handler = async (m, { conn,q, args,setReply, usedPrefix, command }) => {
let timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');
if(!m.isGroup){

const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
let LinkGc = q.includes("|")? q.split("|")[0] : q.split(" ")[0]
let Second = q.includes("|")? q.split("|")[1] : q.split(" ")[1]
let code = LinkGc.match(rex1);
if (code == null) return  setReply("No invite url detected.");
let kode = code[0].replace("chat.whatsapp.com/", "");


var { id, subject,creation,desc,descId,participants,owner,subjectOwner } = await conn.groupGetInviteInfo(kode).catch(async () => {
return m.reply("Invalid invite url.");
});
  //  Log(owner)
//    Log(subjectOwner)
let tagnya = owner == undefined?  subjectOwner == undefined? "" : subjectOwner : owner
var creator = `${owner == undefined? subjectOwner == undefined? "Tidak ada" : "@"+ subjectOwner.split("@")[0]: "@"+ owner.split("@")[0]}`

let chat = global.db.data.chats[id];
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
mentionedJid:[tagnya],
externalAdReply:{
showAdAttribution: false,
title: `${fake}`,
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

await add(id, subject, LinkGc, Second)

let groupMetadata = nana == undefined? {} : await conn.groupMetadata(id) 
let data = nana == undefined? participants : groupMetadata.participants
let member = data.filter(u => u.admin !== 'admin' || u.admin !== 'superadmin' )
let admin = data.filter(u => u.admin === 'admin' || u.admin === 'superadmin' )
 


let teks =`
––––––『 *ORDER BOT SUCCESS* 』––––––

🔰 *Group*
• Name: ${subject}
• Creat at:  ${new Date(creation * 1000).toLocaleString()}
• Creator: ${creator}
• Group Id: ${id}
• Admin: ${admin.length}
• Members: ${member.length}
• Days: ${conn.msToDate(toMs(Second))}
• Countdown: ${toMs(Second)}
• Time order: ${timeWib}
• Time end: ${tSewaBerakhir(Date.now() + toMs(Second))}
•·–––––––––––––––––––––––––·•
 
📮 *Note:* ↓
• Bot yang sudah di order tidak dapat di refund
• Ketik .menu untuk mengakses bot
• Ketik .cekorder untuk melihat sisa order
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk menyewa bot
• Owner wa.me/${nomerOwner}

${copyright} - ${calender}`

await conn.sendMessage(m.chat,{text:teks,mentions:[tagnya]},{quoted:m})
if(nana == undefined ) return m.reply('Waiting for approval to join group')


await sleep(2000)
await conn.sendMessage(id,{text:teks,contextInfo})
let ini = `Halo kak aku ${fake} silakan ketik .menu`
//await conn.sendMessage(id,{text:ini,mentions:[tagnya]})

} else if(m.isGroup){
if(!q) return setReply("Masukan angka 1m/1d/1h")
if (m.isBotAdmin) {
let linkgc = await conn.groupInviteCode(m.chat)
var yeh = `https://chat.whatsapp.com/${linkgc}`
} else if(!m.isBotAdmin){
var yeh = `Botz Is Not Admin`
}
add(m.chat, m.groupName, yeh, q)
m.reply("Berhasil Add Sewa ke group")
}




// Fungsi untuk menghitung tanggal sewa berakhir
function tSewaBerakhir(tanggalSewa){
  const result = moment(tanggalSewa).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');
  return result 
}

// Fungsi untuk menambahkan sewa
function add(gid, subject, link, expired) {
  let timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');
  let chat = global.db.data.chats[gid];
  if (chat) {
   // if (chat.expired !== 0)  chat.expired += toMs(expired);
    chat.expired = Date.now() + toMs(expired); 
    chat.timeEnd = tSewaBerakhir(Date.now() + toMs(expired));
    chat.linkgc = link;
    chat.id = gid;
    chat.threeDaysLeft = false;
    chat.tenDaysLeft = false;
    chat.oneDaysLeft = false;
    chat.endDays = false;
    chat.timeOrder = `${timeWib}`;
    chat.creator = creator == 'Tidak ada'? 'Tidak ada':'wa.me/'+ creator.split('@')[1].replace(new RegExp("[()+-/ +/]", "gi"), "")
    chat.name = subject
  } else {
    global.db.data.chats[gid] = {
      id: gid,
      name: subject,
      linkgc: link,
      expired: Date.now() + toMs(expired),
      threeDaysLeft: false,
      tenDaysLeft: false,
      oneDaysLeft: false,
      endDays: false,
      timeOrder: `${timeWib}`,
      timeEnd : tSewaBerakhir(Date.now() + toMs(expired)),
      creator: creator == 'Tidak ada'? 'Tidak ada':'wa.me/'+ creator.split('@')[1].replace(new RegExp("[()+-/ +/]", "gi"), ""),
      name: subject
    };
  }

  // Menghitung tanggal sewa berakhir dan menyimpannya di chat.tSewaBerakhir

}    







}
handler.help = ['addsewa <hari>']
handler.tags = ['owner']
handler.command = /^(setexpired|addsewa|addorder)$/i
handler.owner = true
handler.group = false

export default handler