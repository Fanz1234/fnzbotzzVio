
import toMs from "ms";
import chalk from "chalk";
import fs from "fs-extra";
import moment from "moment-timezone";
import util from "util";
import { exec, spawn } from "child_process";
import axios from "axios";
import speed from "performance-now";
import ms from "parse-ms";
import fetch from "node-fetch";
import cheerio from "cheerio";
import * as logs from './logs.js'
import _time from "../../lib/grouptime.js";


//----------------- LIB FILE ------------------\\
import _data from "../../lib/totalcmd.js"
import _error from "../../lib/totalerror.js"
import _blockcmd from "../../lib/blockcmd.js"
import _spam from '../../lib/antispam.js'
import _ban from "../../lib/banned.js"

import {randomNomor } from "../../lib/myfunc.js"


let handler = (m) => m;
handler.before = async function (m, { conn, q,isPremium, command, setReply, isOwner,prefix,store }) {
  
  try{
  //Database 
  const AntiSpam = db.data.antispam;
  const DataId = db.data.data;
  const ban = db.data.banned;
  const listcmdblock = db.data.blockcmd;
  const listerror = db.data.listerror;
  const hitnya = db.data.hittoday;
  const dash = db.data.dashboard;
  const anonChat = db.data.anonymous;
  const allcommand = db.data.allcommand;
  const setTime = db.data.others["setTime"];
  const spammer = [];

  const { type,args, reply,sender,ucapanWaktu,from,botNumber,senderNumber,groupName,groupId,groupMembers,groupDesc,groupOwner,pushname,itsMe,isGroup,mentionByTag,mentionByReply,users,budy,content,body } = m
  var Ownerin = `${nomerOwner}@s.whatsapp.net`


  const isCmd = m.body.startsWith(prefix);
  const chat = global.db.data.chats[m.chat];
  const settings = global.db.data.settings["settingbot"];
  const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
  const user = global.db.data.users[m.sender]









  
//Import allfake.js
await (await import('./allfake.js')).default(m)
  //Presence Online
  if (isCmd) {
    db.data.users[m.sender].exp += Math.floor(Math.random() * 10) + 50;
    conn.sendPresenceUpdate("", m.chat);
  } else {
    conn.sendPresenceUpdate("", m.chat);
  }
  
 
//Type data
const isReaction = (m.type == 'reactionMessage')
const isAllMedia = (m.type === 'imageMessage' || m.type === 'videoMessage' || m.type === 'stickerMessage' || m.type === 'audioMessage' || m.type === 'contactMessage' || m.type === 'locationMessage')
const isSticker = (type == 'stickerMessage')


//Console log
if(!isCmd && !isAllMedia && !isReaction && m.budy.length < 8000 && m.type !== 'protocolMessage') logs.message(conn,m,m.budy,AntiSpam)
if(isCmd || isPremium && allcommand.includes(toFirstCase(command))) logs.commands(m,command,q,isCmd)




  //--------System Expired-------\\
  _time.running(setTime);

    



//ANONYMOUS CHAT
const roomChat = Object.values(anonChat).find(room => [room.a, room.b].includes(m.sender) && room.state == 'CHATTING')
const roomA = Object.values(anonChat).find(room => room.a == m.sender)
const roomB = Object.values(anonChat).find(room => room.b == m.sender )
const room = Object.values(anonChat).find(room => room.state == 'WAITING' && room.b == "")

if (roomChat && !isCmd && !isGroup && roomChat.b !=="") {
//let nono = m.quoted.fakeObj? m.quoted.fakeObj : m
let other = [roomChat.a, roomChat.b].find(user => user !== m.sender)
m.copyNForward(other, true)
}

if (room && Date.now() >= room.expired){
await conn.sendMessage(room.a, {text:"Partner tidak di temukan\nKamu telah keluar dari room anonymous"})
anonChat.splice(anonChat.indexOf(room, 1))
}





//GAME tebak kata Function
conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
if(isGroup && from in conn.tebakkata){
const threshold = 0.72
let id = m.chat
let json = JSON.parse(JSON.stringify(conn.tebakkata[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += conn.tebakkata[id][2]
let teks = `*GAME TEBAK KATA BERAKHIR*

Selamat jawaban kamu benar
Hadiah : Rp ${conn.tebakkata[id][2]}
Jawaban : ${json.jawaban}

Ingin bermain lagi? kirim ${prefix}tebakkata
atau tekan button di bawah ini`

let but = [{ buttonId: `${prefix}limit`, buttonText: { displayText: "Limit" }, type: 1 },{ buttonId: `${prefix}tebakkata`, buttonText: { displayText: "Mainlagi" }, type: 1 } ]

setReply(teks)
clearTimeout(conn.tebakkata[id][3])
delete conn.tebakkata[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
setReply(`*Dikit Lagi!*`)
} else if(json.jawaban.length >= budy.length && !isCmd && !budy.includes("yerah") && !isSticker ) {
setReply(`*Salah!*`)
} else if(!isCmd && budy.includes("yerah")){
let text =`
Yahahaha malah nyerah

jawabanya itu adalah ${json.jawaban}
`
setReply(text)
clearTimeout(conn.tebakkata[id][3])
delete conn.tebakkata[id]
}

}

    
//GAME Tebak Bendera Function
conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}  
if(isGroup && from in conn.tebakbendera){
const similarity = require('similarity')
const threshold = 0.72
let id = from

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


// Game Caklontong Function
conn.caklontong = conn.caklontong ? conn.caklontong : {}  
if(isGroup && from in conn.caklontong){
const similarity = require('similarity')
const threshold = 0.72
let id = from

//let but = [{"buttonId": `${prefix}caklontong`,"buttonText": {"displayText": `🎮 ᴍᴀɪɴ ʟᴀɢɪ`},"type": "RESPONSE"}]
 let json = JSON.parse(JSON.stringify(conn.caklontong[id][1]))
 if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
 global.db.data.users[m.sender].money += conn.caklontong[id][2]
global.db.data.users[m.sender].exp += conn.caklontong[id][2]
setReply(`*CAK LONTONG*

Jawaban Kamu Benar!
Bonus Saldo : +3000
Exp : +${conn.caklontong[id][2]}
TiketCoin : +1

${json.deskripsi}`)  
clearTimeout(conn.caklontong[id][3])
delete conn.caklontong[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) setReply(`*Dikit Lagi!*`)
 
}










  try{
  switch (command) {

    case ">":
      {
        if (!isOwner) return setReply(mess.only.owner);
        try {
          let evaled = await eval(q);
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          m.reply(evaled);
        } catch (err) {
          m.reply(String(err));
        }
      }
      break;

    case '=>':
      {
        if (!isOwner) return setReply(mess.only.owner);
        try {
          let evaled = await eval(`(async () => { ${q} })()`);
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          await setReply(evaled);
        } catch (err) {
          await setReply(String(err));
        }
      }
      break;


case 'tebakkata':{
user.glimit -= 0
let but = [{ buttonId: `${prefix}ceklimit`, buttonText: { displayText: "Limit" }, type: 1 },{ buttonId: `${prefix}caklontong`, buttonText: { displayText: "Main lagi" }, type: 1 } ]
let timeout = 60000
let money = randomNomor(1500)
let tiketcoin = 1
let id = m.chat
if (id in conn.tebakkata) return setReply('Masih ada soal belum terjawab di chat ini')
let src = JSON.parse(fs.readFileSync('./lib/game/tebakkata.js'));
let json = src[Math.floor(Math.random() * src.length)].result
let petunjuk = json.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, ' - ')
let caption = `
*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${json.acak}\n\n*Tipe:* ${json.tipe}\n\n

Timeout *${(timeout / 1000).toFixed(2)} detik*
Bonus: Rp ${money}
`.trim()
conn.tebakkata[id] = [
await setReply(caption),
json, money,
setTimeout(() => {
let teks =`*Waktu habis!*

Jawabannya adalah *${json.jawaban}*

${json.desc}`
if (conn.tebakkata[id]) setReply(teks)
delete conn.tebakkata[id]
}, timeout)
]
}
break

case 'fanz': case '@6285812373011': case '6285812373011':
let oah = ' dia adalah yg menciptakanku🙇🏻‍♂️'
setReply(oah)
break

case  'intro': {
let teks = 'Member baru INTRO  :)\nNama lengkap:\nNama panggilan:\nHobi:\nUmur:\nGender:\nKelas:\nTinggi badan:\nBeratbadan :\nAgama:\nGolongan darah:\nStatus:\nNama pacar:\nJumlah mantan:\nNama mantan:\nNama bapak :\nNama ibu : \nNama kakak:\nKakak online:\nKakak kandung\tiri:\nJumlah kakak:\nNama adek:\nAdek online:\nAdek kandung\tiri:\nJumlah adek:\nNama kakek:\nKakek dari ayah :\nKakek dari ibu :\nNama nenek:\nNenek dari ayah :\nNenek dari ibu :\nNama bibi:\nBibi dari ayah :\nBibi dari ibu :\nNama paman:\nBibi dari ayah :\nBibi dari ibu :\nKTP:\nSIM:\nSTNK:\nBPKB:\nKK:\nAlamat rumah:\nRT:\nRW:\nKELURAHAN:\nKECAMATAN:\nKABUPATEN:\nKOTA:\nPROVINSI:\nPLANET:\nGALAXY:\nUNIVERSE:\nLANGIT:\nDARATAN:\nLAUTAN:\nKEPULAUAN:\nSAMUDRA:\nUKURAN SEPATU:\nUKURAN BAJU:\nUKURAN CELANA:\nLEBAR PINGGANG:\nPANJANG TANGAN:\nPANJANG KAKI:\nMAKANAN FAVORIT:\nMINUMAN FAVORIT:\nFILM FAVORIT:\nSINETRON FAVORIT:\nGAME FAVORIT:\nANIME FAVORIT:\nMANGA FAVORIT:\nMANHUA FAVORIT:\nMANHWA FAVORIT:\nCHANNEL YOUTUBE:\nINSTAGRAM:\nTWITTEER:\nFACEBOOK:\nMUSIC FAVORIT:\nSIFAT:\nSIKAP:\nZODIAK:\nTANGGAL LAHIR:\nMERK HP:\nMERK MOTOR:\nMERK MOBIL:\nTINGKAT RUMAH:\nALAMAT SEKOLAH:\nUkuran daleman:\nUkuran atasan :\nDiameter kepala :\nStatistik tubuh:\nDiameter perut :\nDiameter lengan :\nDiameter paha :\nDiameter lutut :\nDiameter betis:\nPanjang tangan :\nPanjang kaki :\nPanjang kepala :\nLebar hidung :\nCita cita :\nHobi :\nJenis hewanpeliharaan :\nNama hewan:\nDiameter rumah:\nWaifu:\nHusbu:\nLoli kesukaan :\nShota kesukaan :\nPunya brp teman :\nTeman online :\nTeman offline :\nTeman main game:\nTeman sekolah:\nTemen rumah:'
setReply(teks)
}
break    

case 'remini2':
case 'hd2':{
 {
const media = await conn.downloadAndSaveMediaMessage(quoted)
const anu = await TelegraPh(media)
setReply(mess.wait)
conn.sendMessage(m.chat, { image: { url: `https://aemt.me/toanime?url=${anu}` }, caption: `_Sudah Jadi Kak_ >//<` }, { quoted: m})
} else {
setReply('Reply gambar nya!')
}
}
break

case 'fnzaiimg': {
  if (!isPremium && !isOwner) return setReply(mess.only.prem)
  if (!isGroup) return setReply(mess.only.group)
  if (!q) return reply(`Teksnya?\nExample: ${prefix+command} apa itu rumah`);
  setReply(mess.wait);
  let imageUrl = `https://aemt.me/ai/text2img?text=${encodeURIComponent(q)}`;
  let imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  conn.sendFile(m.chat, imageBuffer.data, 'image.jpg', 'nyoh gambare cok', m);
  }
  break

case 'fnzaiimg2': {
  if (!isPremium && !isOwner) return setReply(mess.only.prem)
  if (!isGroup) return setReply(mess.only.group)
  if (!q) return reply(`Teksnya?\nExample: ${prefix+command} apa itu rumah`);
  setReply(mess.wait);
  let imageUrl = `https://aemt.me/v1/text2img?text=${encodeURIComponent(q)}`;
  let imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  conn.sendFile(m.chat, imageBuffer.data, 'image.jpg', 'Ini gambarnya', m);
  }
  break

case 'fnzaiimg3': {
  if (!isPremium && !isOwner) return setReply(mess.only.prem)
  if (!isGroup) return setReply(mess.only.group)
  if (!q) return reply(`Teksnya?\nExample: ${prefix+command} apa itu rumah`);
  setReply(mess.wait);
  let imageUrl = `https://aemt.me/dalle?text=${encodeURIComponent(q)}`;
  let imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  conn.sendFile(m.chat, imageBuffer.data, 'image.jpg', 'Ini gambarnya', m);
  }
  break
      
case 'fnzaiimg4': {
  if (!isPremium && !isOwner) return setReply(mess.only.prem)
  if (!isGroup) return setReply(mess.only.group)
  if (!q) return reply(`Teksnya?\nExample: ${prefix+command} apa itu rumah`);
  setReply(mess.wait);
  let imageUrl = `https://aemt.me/v6/text2img?text=${encodeURIComponent(q)}`;
  let imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  conn.sendFile(m.chat, imageBuffer.data, 'image.jpg', 'Ini gambarnya', m);
  }
  break
  
     case 'donasi':{
let { generateWAMessageFromContent } = (await import("@adiwajshing/baileys")).default 
const teks = `hallo Saya *FanzBotzz* Teman Virtual Kalian☺️\nHi Kak Bot Ini Dalam Tahap Pengembangan\nTerimakasih Kepada Para Creator Bot WhatsApp\n Sehingga *Fanz* Bisa Ada Disini Menemani Anda☺️\nJangan Lupa Yak Semangatin Para Creator Bot\nBiar Mereka Semangat Untuk Update Bot Nya\n *Dari Yang Biasa Jadi Luar Biasa* \n_Adudu Suka Modus_\n_Boleh Kah Pinjam Seratus_\n_Agar Silaturahmi Tak Terputus_👁️🫠\n ]===== *DONASI SEIKHLASNYA* =====[\n\nhttps://wa.me//6285812373011\nhttps://wa.me//6285812373011`
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: -10062007, status: 500,
surface: 999,
message: teks,
description: '^^',
orderTitle: 'Haii Kak',
token: '9',
curreyCode: 'IDR',
totalCurrencyCode: '>〰<',
totalAmount1000: '1000000',
sellerJid: '6285812373011@s.whatsapp.net',
thumbnail: fs.readFileSync('./media/donate.jpg')
}}, {contextInfo: null, quoted: m})
conn.relayWAMessage(prep)
    } 
break

case 'rules':{
let teks =`
Syarat dan Ketentuan menggunakan *${botName}*

1. Nama dan nomer user ${botName}
akan Kami simpan di dalam
server selama bot aktif

2. Data akan di hapus ketika bot Offline
atau di hapus oleh Owner Bot

3. Kami tidak menyimpan gambar,
video, file, audio, dan dokumen
yang kamu kirim ke ${botName}

4. Kami tidak akan pernah meminta users
untuk memberikan informasi pribadi

5. Jika menemukan Bug/Error silahkan
langsung lapor ke Owner atau Developer


6. Beberapa fitur mungkin ada yang error,
jadi tunggu sampai developer
memperbaiki fitur tersebut

8. Bot ini sudah di lengkapi dengan
fitur _*Auto Report Bug*_ jika terjadi
error maka bot akan auto report ke
developer, terkecuali error yang
menyebabkan bot mati, maka user
harus lapor ke developer

7. Bot ini juga sudah di lengkapi dengan
Fitur Anti Spam jika kamu terdeteksi
melakukan spam, maka Bot tidak
akan menanggapi kamu selama 20 detik

9. User dilarang keras menelpon bot!
jika melanggar maka kamu akan terkena
banned,block dan dikirim bug

10. Bot tidak akan menanggapi user yang
meminta untuk di save nomernya`
setReply(teks)
}
break
  
  case 'jodohku':{
if (!isGroup) return setReply(mess.only.group)
let member = groupMembers.map(u => u.id)
let jodoh = member[Math.floor(Math.random() * member.length)]
let jawab = `Jodoh kamu adalah @${jodoh.split('@')[0]}`
let menst = [jodoh]
conn.sendMessage(from, { text: jawab, mentions: menst }, { quoted: m })
}
break

case 'jadian': {
if (!isGroup) return setReply(mess.only.group)
let member = groupMembers.map(u => u.id)
let orang = member[Math.floor(Math.random() * member.length)]
let jodoh = member[Math.floor(Math.random() * member.length)]
let jawab = `Ciee yang jadian ❤️ Jangan lupa pajak jadiannya yee

@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
let menst = [orang, jodoh]
conn.sendMessage(from, { text: jawab, mentions: menst },{quoted: m}) 
}
break
  
case 'tebakbendera':{
//if (!isGroup) return onlyGroup()
//if (!isPremium && global.db.data.users[sender].glimit < 1) return onlyGlimit()
if (!isGroup) return setReply(mess.only.group)
user.glimit -= 0
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
break

case 'caklontong':{
//if (!isGroup) return onlyGroup()
//if (!isPremium && global.db.data.users[sender].glimit < 1) return onlyGlimit()
if (!isGroup) return setReply(mess.only.group)
user.glimit -= 0
let poin = 3000
let timeout = 120000
let tiketcoin = 1
let id = m.chat

//let but1 = [{"buttonId": `${prefix}caklontong`,"buttonText": {"displayText": `🎮 ᴍᴀɪɴ ʟᴀɢɪ`},"type": "RESPONSE"}]
if (id in conn.caklontong) return setReply('Masih ada soal belum terjawab di chat ini')
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')).json()
let json = src[Math.floor(Math.random() * src.length)]
let caption = `*Soal :* ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Bonus : +${poin}
Tiketcoin : +${tiketcoin} `.trim()
conn.caklontong[id] = [
await setReply(caption),
json, poin,
setTimeout(() => {
setReply(`Waktu game telah habis
Jawabannya adalah : ${json.jawaban}

${json.deskripsi}`)  
delete conn.caklontong[id]
 }, timeout)
 ]
db.data.users[sender].glimit -= 0
}
break

    
    case 'startchat': {
    if (isGroup) return setReply('Fitur Tidak Dapat Digunakan Di Dalam Group!')
    if(!q) return setReply("Masukan nomer target yang mau di chat")
    if (roomA || roomB ) return setReply("Kamu masih berada di dalam room anonymous,  ketik keluar untuk keluar dari room anonymous mu")
    let id = + new Date
    const obj = {
    id,
    a: m.sender,
    b: Input,
    state: "CHATTING",
    expired: "INFINITY"
    }
    
    anonChat.push(obj)
    
    setReply(`Kamu telah membuat room anonymous\nDan menjadikan ${Input} sebagai partner mu\nSekarang kamu bisa mengirim pesan`)
    
    
    }
    break


    case 'stop':
      case 'keluar': {
      
      if(roomA && roomA.state == "CHATTING"){
      
      await conn.sendMessage(roomA.b, {text:"Partnermu telah meninggalkan room anonymous"})
      await setTimeout(() => {
      setReply("Kamu telah keluar dari room anonymous")
      roomA.a = roomA.b
      roomA.b = ""
      roomA.state = "WAITING"
      roomA.expired = Date.now() + toMs("5m")
      
      
      },1000)
      
      } else if(roomA && roomA.state == "WAITING"){
      setReply("Kamu telah keluar dari room anonymous")
      
      
      anonChat.splice(anonChat.indexOf(roomA, 1))
      
      
      } else if(roomB && roomB.state == "CHATTING"){
      await conn.sendMessage(roomB.a,{text:`Partnermu telah meninggalkan room anonymous`})
      setReply("Kamu telah keluar dari room anonymous dan meninggalkan partner mu")
      
      roomB.b =""
      roomB.state = "WAITING"
      roomB.expired = Date.now() + toMs("5m")
      
      
      
      } else setReply(`Kamu sedang tidak berada di room anonymous, tekan button untuk mencari partner`)
      
      
      }
      break
  

    //------------------------ BATAS DARI AREA CASE -----------------------------\\
    default:
  } //Akhir switch command



} catch (err){
  //add to dashboard
if(isCmd) _data.Failed(toFirstCase(command), dash)
let e = util.format(err)

if(err.message.includes("Cannot find module")){
let module = err.message.split("Cannot find module '")[1].split("'")[0]
let teks = `Module ${module} belom di install
silakan install terlebih dahulu`
return setReply(teks)
}

await setReply(`]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${fake1}`)
if(_error.check(err.message, db.data.listerror)) return
_error.add(err.message, command, db.data.listerror)

let media = 'tidak ada'

if(q.length > "0"){
var tetek = q
} else if(q.length == "0"){
var tetek = "No Query ❌"
}

if (isGroup && m.isBotAdmin) {
let linkgc = await conn.groupInviteCode(from)
var yeh = `https://chat.whatsapp.com/${linkgc}`
} else if(isGroup && !m.isBotAdmin){
var yeh = `Botz Is Not Admin`
} else if(!isGroup){
var yeh = `Botz Is Not In The Group`
}

let teks =`
*]───── 「 Laporan Bug ⚠️」 ─────[*

👤 Nama : ${pushname}
📳 Nomer : wa.me/${senderNumber}
📢 Info Laporan :
         _${e}_
🔖 Command : ${prefix}${command}
⏰Time : ${timeWib} Wib
📝 Query : ${tetek}
🧩 Quoted : ${media}
💠 Group : ${isGroup?`${groupName}`:'Di private chat'}
🆔 ID : ${from}
🌐 Link Group : ${yeh}
  
  
`
await conn.sendMessage(Ownerin, {text:teks} , {quoted: fkontak})
await conn.sendMessage(from,{ text: "Laporan error telah dikirim ke Developer Botz"})

}







} catch(err){
  console.log(chalk.bgYellow(chalk.black("[ ERROR CASE ]")),util.format(err))
  let e = String(err)
  if (e.includes("this.isZero")) {return}
  if (e.includes('Connection Closed')){ return }
  if (e.includes('Timed Out')){ return }
  if (e.includes('Value not found')){ return }
  console.log(chalk.white('Message Error : %s'), chalk.green(util.format(e)))
  }
};
export default handler;
