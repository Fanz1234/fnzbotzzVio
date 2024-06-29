
import moment from 'moment';
import fs from 'fs';

let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastmisi)
    let _timers = (1200000 - __timers) // Ubah nilai cooldown menjadi 20 menit (20 x 60 x 1000 milidetik)
    let order = global.db.data.users[m.sender].ojekk
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let kerja = 'ewe-paksa'
    conn.misi = conn.misi ? conn.misi : {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    if (new Date - user.lastmisi > 1200000) { // Ubah nilai cooldown menjadi 20 menit (20 x 60 x 1000 milidetik)
        let randomaku1 = Math.floor(Math.random() * 1000000)
        let randomaku2 = Math.floor(Math.random() * 10000)
        
        user.lastmisi = new Date * 1
    } else m.reply(`Silahkan Menunggu Selama ${timers}, Untuk *Ewe-paksa* Kembali`)
}

  let loadd = [
    '██▒▒▒▒▒▒▒▒▒▒▒ 10%',
    '████▒▒▒▒▒▒▒▒▒ 30%',
    '███████▒▒▒▒▒▒ 50%',
    '██████████▒▒▒ 70%',
    '█████████████ 100%',
    '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙼𝙴𝚃𝙴𝙳...'
  ];

  const arr = [
    { text: `👙 kamu paksa
     dia buka baju😋 `, timeout: 1000 },
    { text: `Kamu memulai dengan mengisep pentil dia😋🥵`, timeout: 3000 },
    { text: `Kamu memulai bagian bawah dengan mengjilat nya😋🛏️👩👦`, timeout: 6000 },
    { text: `kamu mulai dengan 3 jari dan memasukan jarimu kedalam memek nya🛏️👩👦`, timeout: 8000 },
    { text: `Sudah semakin basah💦🛏️👩👦`, timeout: 8000 },
    { text: `Kamu mulai memasukkan kontol mu kedalam memek nya 🛏️👩👦`, timeout: 12000 },
    { text: `Crot masuk kedalam 👩: ah~ sakit ah~`, timeout: 15000 },
    { text: `*Plok 🛏️👩👦`, timeout: 18000 },
    { text: `*Plok🛏️👩 👦`, timeout: 20000 },
     { text: `*Plok 🛏️👩👦`, timeout: 23000 },
    { text: `*Plok🛏️👩 👦`, timeout: 25000 },
    { text: `*Crottt 🛏️👩💦👦`, timeout: 27000 },
    { text: `*—[ Hasil Ewe Paksa ${name} ]—*
➕ 💹 Uang = [ ${randomaku1} ]
➕ ✨ Exp = [ ${randomaku2} ]
➕ 📥Total Dosa = ${order}\n\n> 👩 sudah kecapean dan kamu sudah lelah mengeluarkan peju sebanyak itu`, timeout: 24000 },
  ];

  const lll = await conn.sendMessage(m.chat, { text: '😋kamu mulai ewe paksa..' }, { quoted: m });

  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: lll.key,
        type: 14,
        editedMessage: {
          conversation: arr[i].text
        }
      }
    }, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: 'Support XinzukiApss saweria.co/xianzuki' }}});
    }    
    }
handler.help = ['ewe-paksa @tag']
handler.tags = ['rpg']
handler.command = /^(ewe-paksa)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}