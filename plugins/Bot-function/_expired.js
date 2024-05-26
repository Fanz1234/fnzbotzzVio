import fs from 'fs-extra';
import toMs from 'ms';
import ms from 'parse-ms';

let handler = m => m;

handler.before = async function () {
try{
const data = db.data.chats;

async function checkExpiration() {
const currentTime = Date.now();

for (const key in data) {
if (Object.hasOwnProperty.call(data, key)) {
const item = data[key];

if (item.expired !== 0 && item.expired < currentTime) {
console.log(`Sewa '${key}' telah berakhir!`);
delete global.db.data.chats[key]


let photo = fotoRandom.getRandom()
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
externalAdReply:{
title: `${botName}`,
body:`${baileysVersion}`,
previewType:"PHOTO",
thumbnailUrl: photo
}
}


let Ownerin = `${nomerOwner}@s.whatsapp.net`
let text =`
––––––『 *SEWA EXPIRED* 』––––––
🔰 *Group*
• Name: ${item.name}
• Creator: ${item.creator}
• Group Id: ${item.id}
• Time order: ${item.timeOrder}
• Time end: ${item.timeEnd}
•·–––––––––––––––––––––––––·•
`
conn.sendMessage(Ownerin,{contextInfo,text})
await sleep(3000)

let cekdata =  (conn.chats[key] || await conn.groupMetadata(key).catch(_ => false))  
if(!cekdata) return

    let teks = `Waktu sewa di grup ini sudah habis, bot akan keluar otomatis`;
    await conn.sendMessage(key, { text: teks }).then(() => {
        conn.groupLeave(key).then(() => {
            //global.db.data.chats[key].expired = 0
        })
    })





}
}
}//oiij

// Memanggil kembali fungsi checkExpiration setelah 1 detik
setTimeout(checkExpiration, 2000);
}

// Memulai pemanggilan pertama untuk memulai loop
checkExpiration();



//Function untuk sewa group
setInterval(async () => {
try{
Object.values(db.data.chats).forEach(async (chat) => {
if(chat.threeDaysLeft == undefined) chat.threeDaysLeft = false
if(chat.tenDaysLeft == undefined) chat.tenDaysLeft = false
if(chat.oneDaysLeft == undefined) chat.oneDaysLeft = false
let three =  chat.threeDaysLeft
let ten = chat.tenDaysLeft
let one = chat.oneDaysLeft
let threeLeft = ms(chat.expired - Date.now() - toMs("3d"));
let tenLeft = ms(chat.expired - Date.now() - toMs("10d"));
let oneLeft = ms(chat.expired - Date.now() - toMs("1d"));
let photo = fotoRandom.getRandom()
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
externalAdReply:{
title: `${botName}`,
body:`${baileysVersion}`,
previewType:"PHOTO",
thumbnailUrl: photo
}
}

if (chat.expired >= 0  && !three && threeLeft.days === 0) {
chat.threeDaysLeft = true
let cekid = ms(chat.expired - Date.now())
let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`
conn.sendMessage(chat.id, {contextInfo,text:teks}).catch((err) => console.log(err))
} else if(chat.expired != 0  &&  !ten && tenLeft.days === 0) {
chat.tenDaysLeft = true
let cekid = ms(chat.expired - Date.now())
let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`
conn.sendMessage(chat.id, {contextInfo,text:teks}).catch((err) => console.log(err))
} else if( chat.expired != 0  &&   !one && oneLeft.days === 0) {
chat.oneDaysLeft = true
let cekid = ms(chat.expired - Date.now())
let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`
conn.sendMessage(chat.id, {contextInfo,text:teks}).catch((err) => console.log(err))
}
});
}catch(err){
console.log(err)
}
}, 3000);



} catch (err){
console.log(err)
}

};

export default handler;


























