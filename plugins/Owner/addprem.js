import fs from 'fs-extra'
import toMs from "ms";
import ms from "parse-ms"
import moment from "moment-timezone"

let handler = async (m, { conn, usedPrefix, command,isOwner,q,setReply }) => {

let timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');   
let {isGroup,mentionByReply,mentionByTag,botNumber } = m
if (!isOwner) return setReply(mess.only.ownerB)
if(isGroup && mentionByReply) {
var nomernya = mentionByReply
var waktunya = q
var namanye = await conn.getName(mentionByReply)
} else if(isGroup && mentionByTag) {
var nomernya = mentionByTag[0]
var waktunya = q.split(" |")[1] || q.split("| ")[1] || q.split("|")[1] || q.split(" ")[1]
var namanye = await conn.getName(mentionByTag[0])
} else if((isGroup || !isGroup) && q.startsWith("+")) {
var nomernya = q.split("|")[0].replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
var waktunya = q.split("|")[1]
var namanye = await conn.getName(nomernya)
} else if(!isGroup && q.includes("chat.whatsapp.com/")){
let query = q.split(" |")[0] || q.split("| ")[0] || q.split("|")[0] || q.split(" ")[0]
const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
let code = query.match(rex1);
if (code === null) return  setReply("No invite url detected.");
code = code[0].replace("chat.whatsapp.com/", "");
let {id, subject,creator,creation,desc,descId} = await conn.groupGetInviteInfo(code).catch(async () => {return setReply("Invalid invite url.")});
const metaData = await conn.groupMetadata(id)
const members =  metaData.participants
const anune = members.filter(u => u.admin == 'admin' && u.id !== botNumber || u.admin == 'superadmin' && u.id !== botNumber)
let teks =`
––––––『 *PREMIUM SUCCESS* 』––––––

*Group Name:* ${subject}\n*Group Id:* ${id}${creator ? `\n*Creator:* ${creator.split("@")[0]}` : ""}
*Create At:* ${new Date(creation * 1000).toLocaleString()}\n\n`

for (let i of members){
if(i.admin == 'admin' && i.id !== botNumber || i.admin == 'superadmin' && i.id !== botNumber){
let nomernya = i.id
let waktunya =  q.split("|")[1]
let namanye = await conn.getName(i.id)
let user = db.data.users[nomernya]
if(user){
    user.name = namanye
    user.premium = true
    user.premiumTime = Date.now() + toMs(waktunya)
    user.timeOrder = timeWib
    user.timeEnd = moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
    
} else db.data.users[nomernya] = {
name: namanye,
premium: true,
premiumTime: Date.now() + toMs(waktunya),
timeOrder: timeWib,
timeEnd: moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm'),
}





teks += `
• *Name :* ${namanye}
• *Number:* ${nomernya.split("@")[0]}
• *Days:* ${conn.msToDate(toMs(waktunya))}
• *Countdown:* ${toMs(waktunya)}
• *Time order:* ${timeWib}
• *Time end:* ${moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')}

`

let text = `
––––––『 *PREMIUM SUCCESS* 』––––––

👤 *User:* ↓
• *Name :* ${namanye}
• *Number:* ${nomernya.split("@")[0]}
• *Days:* ${conn.msToDate(toMs(waktunya))}
• *Countdown:* ${toMs(waktunya)}
• *Time order:* ${timeWib}
• *Time end:* ${moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')}

📮 *Note:* ↓
• Bot yang sudah di order tidak dapat di refund
• Ketik .menu untuk mengakses bot
• Ketik .cekprem untuk melihat sisa order
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk order bot
• Owner wa.me/${nomerOwner}

_Terimakasih sudah menggunakan ${fake}_`
    await sleep(2000)
conn.sendMessage(nomernya,{text})
     
}
}
teks +=`*Total : ${anune.length} admin*`
return m.reply(teks)

} else return setReply("Penggunaan salah, silakan reply/tag/input nomer +")
Log(q.split("|")[0])
if(waktunya == undefined) return setReply("masukan waktu\ns = detik\nh = jam\nd =hari")

let user = db.data.users[nomernya]
if(user){
    user.name = namanye
    user.premium = true
    user.premiumTime = Date.now() + toMs(waktunya)
    user.timeOrder = timeWib
    user.timeEnd = moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
    
} else db.data.users[nomernya] = {
name: namanye,
premium: true,
premiumTime: Date.now() + toMs(waktunya),
timeOrder: timeWib,
timeEnd: moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm'),
}



let teks = `
––––––『 *PREMIUM SUCCESS* 』––––––

👤 *User:* ↓
• *Name :* ${namanye}
• *Number:* ${nomernya.split("@")[0]}
• *Days:* ${conn.msToDate(toMs(waktunya))}
• *Countdown:* ${toMs(waktunya)}
• *Time order:* ${timeWib}
• *Time end:* ${moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')}
 
📮 *Note:* ↓
• Bot yang sudah di order tidak dapat di refund
• Ketik .menu untuk mengakses bot
• Ketik .cekprem untuk melihat sisa order
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk order bot
• Owner wa.me/${nomerOwner}`


let text = `
––––––『 *PREMIUM SUCCESS* 』––––––

👤 *User:* ↓
• *Name :* ${namanye}
• *Number:* ${nomernya.split("@")[0]}
• *Days:* ${conn.msToDate(toMs(waktunya))}
• *Countdown:* ${toMs(waktunya)}
• *Time order:* ${timeWib}
• *Time end:* ${moment(Date.now() + toMs(waktunya)).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')}

📮 *Note:* ↓
• Bot yang sudah di order tidak dapat di refund
• Ketik .menu untuk mengakses bot
• Ketik .cekprem untuk melihat sisa order
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk order bot
• Owner wa.me/${nomerOwner}

_Terimakasih sudah menggunakan ${fake}_`


m.reply(teks)
    await sleep(2000)
conn.sendMessage(nomernya,{text})




}
handler.help = ['addprem [@user] <days>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i
handler.owner = true

export default handler