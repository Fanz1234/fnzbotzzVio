/*

 








 
















let listRespon = global.db.data.respon[body]
if(listRespon) m.reply(listRespon.respon)
























































case 'start': {

    if (roomA || roomB ) return setReply("Kamu masih berada di dalam room anonymous,  ketik keluar untuk keluar dari room anonymous mu")
    
    if (room) {
    await conn.sendMessage(room.a,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    room.b = m.sender
    room.state = 'CHATTING'
    room.expired = "INFINITY"
    await conn.sendMessage(room.b,{text: `Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan`})
    
    
    } else {
    let id = + new Date
    const obj = {
    id,
    a: m.sender,
    b: '',
    state: 'WAITING',
    expired: Date.now() + toMs("5m")
    }
    anonChat.push(obj)
    
    let teks =`Kamu telah membuat room anonymous\nMohon tunggu sedang mencari partner`
    
    let mok = [{"buttonId": `${prefix}invite`,"buttonText": {"displayText": `Invite`},"type": "RESPONSE"},
    {"buttonId": `${prefix}keluar`,"buttonText": {"displayText": `ᴋᴇʟᴜᴀʀ`},"type": "RESPONSE"}]
    setReply(teks)
    
    }
    
    }
    break
    
    

    
    
    case 'next':{
    //Posisi di room A sedang waiting
    if (roomA && roomA.state == "WAITING" ) {
    setReply("Mencari Partner...")
    anonChat.splice(roomA, 1)
    
    
    await setTimeout( async () => {
    if ( Object.values(anonChat).find(room => room.state === 'WAITING' && room.b == "")) {
    await conn.sendMessage(room.a,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    room.b = m.sender
    room.state = 'CHATTING'
    room.expired = "INFINITY"
    await conn.sendMessage(room.b,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    
    } else {
    let id = + new Date
    const obj = {
    id,
    a: m.sender,
    b: '',
    state: 'WAITING',
    expired : Date.now() + toMs("5m")
    }
    anonChat.push(obj)
    
    setReply(`Kamu telah membuat room baru\nSilakan tunggu partner masuk ke dalam room`)
    }
    }, 2000)
    
    //Posisi Room A sedang cattingan
    } else if(roomA && roomA.state == "CHATTING" ){
    await conn.sendMessage(roomA.b, {text: "Partnermu telah mengeluarkanmu dari room Anonymous"})
    setReply("Kamu telah mengeluarkan partnermu dari room anonymous ")
    await setTimeout(() => {
    setReply("Menunggu partner masuk ke dalam room")
    roomA.b = ""
    roomA.state = "WAITING"
    roomA.expired = Date.now() + toMs("5m")
    
    },1000)
    
    //Posisi di Room B sedang chattingan
    } else if(roomB){
    await conn.sendMessage(roomB.a, {text: "Partner telah meninggalkan room anonymous mu"})
    setReply("Mohon tunggu sedang mencari room")
    roomB.b =  ""
    roomB.state = "WAITING"
    roomB.expired = Date.now() + toMs("5m")
    
    
    await setTimeout( async () => {
    if ( Object.values(anonChat).find(room => room.state === 'WAITING' && room.b == "")) {
    await conn.sendMessage(room.a,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    room.b = m.sender
    room.state = 'CHATTING'
    room.expired = "INFINITY"
    await conn.sendMessage(room.b,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    
    } else {
    let id = + new Date
    const obj = {
    id,
    a: m.sender,
    b: '',
    state: 'WAITING',
    expired : Date.now() + toMs("5m")
    }
    anonChat.push(obj)
    
    setReply(`Kamu telah membuat room baru\nSilakan tunggu partner masuk ke dalam room`)
    }
    }, 2000)
    } else setReply("Kamu sedang tidak berada di dalam room anonymous")
    }
    break
    
    case 'sendkontak': {
    if (isGroup) return setReply('Fitur Tidak Dapat Digunakan Untuk Group!')
    
    if (roomA && roomA.state == "CHATTING") {
    let profile = await conn.profilePictureUrl(roomA.a)
    let status = await conn.fetchStatus(roomA.a)
    let msg = await conn.sendImage(roomA.b, profile, `Nama : ${await conn.getName(roomA.a)}\nBio : ${status.status}\nUser : @${roomA.a.split("@")[0]}`, m, { mentions: [roomA.a] })
    conn.sendContact(roomA.b, roomA.a.split("@")[0], await conn.getName(roomA.a))
    
    } else if(roomB && roomB.state == "CHATTING"){
    //let profile = await conn.profilePictureUrl(roomB.b)
    //let status = await conn.fetchStatus(roomB.b)
    //let msg = await conn.sendImage(roomB.a, profile, `Nama : ${await conn.getName(roomB.b)}\nBio : ${status.status}\nUser : @${roomB.b.split("@")[0]}`, m, { mentions: [roomB.b] })
    conn.sendContact(roomB.a, roomB.b.split("@")[0],await conn.getName(roomB.b))
    
    } else if(roomA == "undefined" || roomB == "undefined" ){
    setReply("Kamu sedang tidak berada di room anonymous")
    
    } else setReply("Kamu belum dapat mengirim kontak karena kamu belum punya partner")
    
    }
    break
    

    
    case 'anonymous':{
    //if(isGroup) return setReply("Tidak bisa di gunakan di dalam group")
    let teks =`
    Anonymous Chat adalah
    fitur yang memungkinkan kamu
    berinteraksi dengan user lain
    tanpa mengetahui identitas user
    dan terintegrasi secara acak.
    
    Klik start untuk memulai`
    
    let mok = [{"buttonId": `${prefix}start`,"buttonText": {"displayText": `sᴛᴀʀᴛ`},"type": "RESPONSE"},
    {"buttonId": `${prefix}keluar`,"buttonText": {"displayText": `ᴋᴇʟᴜᴀʀ`},"type": "RESPONSE"}]
    
    setReply(teks)
    }
    break
    
    
    
    case 'invite':{
    //if(isGroup) return setReply("Fitur tidak bisa di gunakan di dalam group")
    if(!roomA) return setReply("Kamu sedang tidak berada di room anonymous")
    if(roomB && roomB.state == "CHATTING" || roomA && roomA.state == "CHATTING" ) return setReply("Kamu sudah berada di room anonymous dan sudah memulai sesi chat")
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let ana = groups.map(v => v.id)
    let mem = [];
    for (let i of ana) {
    let data = await conn.groupMetadata(i)
    let obj = { id : data.id, total : data.participants.length}
    await mem.push(obj)
    }
    let groupInvite = await mem.filter(member => member.total > 50 )
    
    let yesnih = [{"buttonId": `${prefix}joinchat ${roomA.id}`,"buttonText": {"displayText": `ᴊᴏɪɴ ᴄʜᴀᴛ`},"type": "RESPONSE"}
    ]
    
    let teks = `
    Seseorang telah mengundang kamu
    untuk bergabung ke room anonymous chat
    tekan tombol join chat di bawah ini untuk
    bergabung di room anonymous dan memulai
    sesi chat dengan user lain`
    await conn.sendMessage(from, {text: `Mengirim undangan anonymous, waktu selesai ${groupInvite.length * 3 } detik`})
    
    for (let i of groupInvite) {
    await sleep(3000)
    conn.sendMessage(i.id,{text:teks})
    
    }
    await conn.sendMessage(from, {text: `Undangan telah terkirim ke ${groupInvite.length} group` })
    
    }
    break
    
    
    case 'joinchat':{
    if(!q) return setReply("Masukan id room anonymous")
    if(roomA && roomA.state == "WAITING" ) return setReply("Kamu masih berada di room anonymous")
    if(roomB && roomB.state == "CHATTING" || roomA && roomA.state == "CHATTING" ) return setReply("Kamu sudah berada di room anonymous dan sudah memulai sesi chat")
    let joinRoom = Object.values(anonChat).find(room => room.id == q && room.state == "WAITING")
    if (joinRoom) {
    await conn.sendMessage(joinRoom.a,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    room.b = m.sender
    room.state = 'CHATTING'
    room.expired = "INFINITY"
    await conn.sendMessage(joinRoom.b,{text: `Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan`})
    setReply(`Berhasil join ke room, silakan cek di chat bot\nAtau bisa klik nomer di bawah ini untuk memulai sesi chat\n\nhttp://wa.me/${botNumber.split("@")[0]}`)
    
    
    } else if (room) {
    await conn.sendMessage(room.a,{text: `Berhasil menemukan partner, sekarang kamu dapat mengirim pesan`})
    room.b = m.sender
    room.state = 'CHATTING'
    room.expired = "INFINITY"
    await conn.sendMessage(room.b,{text: `Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan`})
    setReply(`Berhasil mendapatkan room, silakan cek di chat bot\nAtau bisa klik nomer di bawah ini untuk memulai sesi chat\n\nhttp://wa.me/${botNumber.split("@")[0]}`)
    
    
    } else {
    let id = + new Date
    const obj = {
    id,
    a: m.sender,
    b: '',
    state: 'WAITING',
    expired: Date.now() + toMs("5m")
    }
    anonChat.push(obj)
    
    await conn.sendMessage(sender,{text: `Kamu telah membuat room anonymous\nMohon tunggu sedang mencari partner`})
    setReply(`Kamu telah membuat room anonymous\nMohon tunggu sedang mencari partner`)
    }
    
    
    }
    break
    
    








case 'setreply':{
if(!isOwner) return setReply(mess.only.ownerB)
if ((args[0]) === 'web'|| (args[0]) === 'situs' ){
if(replyType === "web") return setReply("Udah aktif")
replyType = "web"
setReply(`Berhasil mengubah set reply ke ${q}`)
}  else if ((args[0]) === 'mess'){
if(replyType === "mess") return setReply("Udah aktif")
replyType = "mess"
setReply(`Berhasil mengubah set reply ke ${q}`)
} else if ((args[0]) === 'troli' ){
if(replyType === "troli") return setReply("Udah aktif")
replyType = "troli"
setReply(`Berhasil mengubah set reply ke ${q}`)
}  else if ((args[0]) === 'quoted' ){
if(replyType === 'quoted') return setReply("Udah aktif")
replyType = "quoted"
setReply(`Berhasil mengubah set reply ke ${q}`)
} else if (!q) {
setReply(`SETTING REPLY\n1. web\n2. troli\n3. mess\n4. vidio\n5. quoted\n`)
} else {
replyType = q
setReply("Set Reply Tidak Di Temukan")
}
}
break


















case 'chatowner': {
if (isGroup) return setReply('Fitur Tidak Dapat Digunakan Di Dalam Group!')
if (roomA || roomB ) return setReply("Kamu masih berada di dalam room anonymous,  ketik keluar untuk keluar dari room anonymous mu")
let isOn = Object.values(anonChat).find(room => [room.a, room.b].includes(Ownerin) && room.state == 'CHATTING')
if(isOn) return setReply('Saat ini owner sedang berbicara dengan user lain')
let id = + new Date
const obj = {
id,
a: m.sender,
b: Ownerin,
state: "CHATTING",
expired: "INFINITY"
}

anonChat.push(obj)
setReply(`Kamu telah terhubung dengan owner bot, sekarang kamu bisa kirim pesan`)
let text = `Hallo owner
nomer ${senderNumber} ingin berbicara dengan kamu
melalui chat bot, ketik ${prefix}keluar untuk mengakhiri sesi ini`
conn.sendMessage(Ownerin,{text})
}
break







case 'delcase':{
if (!isOwner) return setReply(mess.only.owner);
if (!q) return setReply('Masukan nama fitur yang mau di hapus');
let teks = m.quoted ? m.quoted.text : q
let yes = await delCase(teks)
setReply(yes)
}
break


case 'addcase':{
if (!isOwner) return setReply(mess.only.owner);
if (m.quoted){
let teks = m.quoted.text 
let nih = await addCase(teks)
setReply(`${nih}`)
} else if(q){
let teks = q
let nih = await addCase(teks)
setReply(nih)
} else setReply('Sualah');
}
break






case 'backup':{
  if(!q) return setReply("Mau backup file apa? contoh backup group.js, file akan tersimpan di folder database/backup")
  let format = q.split(".")[1]
  if(!format) return setReply('Tipe file js atau json?')
  setReply("Backuping File...")
  await sleep(1000)
  let teks = `Berhasil membackup file ${q}`

  async function getFolder(){
  let folders = fs.readdirSync(process.cwd(), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);
  let arrayBaru = await folders.filter((kata) =>
  !kata.startsWith("node_modules") &&
  !kata.startsWith(".cache") &&
  !kata.startsWith(".lesson") &&
  !kata.startsWith(session)
  );
  return arrayBaru
  }
  let ada = false
  let dir = await fs.existsSync(`./${q}`)
  if(dir) {
  ada = true
  fs.copy(`./${q}`, `./database/backup/${q}`, (err) => {
  if (err) throw err;
  setReply(teks)
  })

  } 

  let folders = await getFolder()

  for (let i of folders){
  let data = await fs.existsSync(`./${i}/${q}`)
  if(data) {
  ada = true
  fs.copy(`./${i}/${q}`, `./database/backup/${q}`, (err) => {
  if (err) throw err;
  setReply(teks)
  })
  }
  }//akhir dari folders
  if(!ada) setReply("File tidak di temukan")
  }
  break






case 'antiasing':{
if (!isGroup) return setReply('Kusus group')
if (!isGroupAdmins) return setReply(mess.only.admin)
if (!isBotGroupAdmins) return setReply(mess.only.Badmin)
if ((args[0]) === 'on' || (args[0]) === 'enable' || (args[0]) === '1' ) {
if (isKickarea) return setReply("Sudah aktif!!");
db.data.chats[from].antiasing = true
setReply("Sukses mengaktifkan kickarea!");
} else  if ((args[0]) === 'off' || (args[0]) === 'disable' || (args[0]) === '0') {
if (!isKickarea) return setReply("Udah off!!");
db.data.chats[from].antiasing = false
setReply("Sukses mematikan kickarea!");
} else if (!q) {
setReply("Pilih on atau off")
}
}
break;





case  'profile':
case 'me': {

let link = "https://telegra.ph/file/419855356e8135488d144.jpg"
let contextInfo =
{
externalAdReply: {
showAdAttribution: false,
title: copyright,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: link,
}
}

//let ppimg = await conn.profilePictureUrl(sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
const { userXp, userLeveling, } = (await import("../lib/user.js"))
try{
let sol = await conn.fetchStatus(sender)
var stst = sol.status == undefined ? '' : sol.status
} catch(err){
var stst = ""

}
let persenya =`${userPersen}`
let nana =`${userExp}/${requiredExp}`
let cekvip = ms(user.premiumTime - Date.now())
let premiumnya = `${cekvip.days} hari ${cekvip.hours} jam ${cekvip.minutes} menit ${cekvip.seconds}`
let prmm = isPremium? isOwner? 'Premium' : user? premiumnya : '' : 'Not Premium'




let teks = `––––––『 *PROFILE USER* 』––––––

🆔 Nama : ${pushname}
💳 Saldo  : Rp ${db.data.users[sender].money.toLocaleString()}
✅ Verified : ${userVerified}
📇 Status : ${isPremium ? 'Premium':'Free'}
🧬 Level : ${userLevel}
🔰 Grade : ${userLeveling(`${db.data.users[sender].level}`)}
⚡ Exp :  ${userXp(userPersen)} ${persenya.split(".")[0]}%
♻️ Total Exp : ${nana}
📟 User Hit : ${db.data.users[sender].hit}
🤖 Status Bot : ${isOwner ? 'Owner':'User'}
🕔 Expired : ${prmm}
📉 Limit : ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}/${limitCount}`}
📈 Limit Game : ${db.data.users[sender].glimit}/${gcounti.user}
📲 No : wa.me/${sender.split("@")[0]}
🧸 Bio : ${stst}`

conn.sendMessage(from,{contextInfo, text:teks},{quoted:m})

}
break






case 'getcase':
try{
if (!m.key.fromMe && !isOwner) return setReply(mess.only.owner)
if (!q) return setReply("*Mau nyari Case apa kak*")
if(q.startsWith(prefix)) return setReply("Query tidak boleh menggunakan prefix")
let nana = await getCase(q)
m.reply(nana)
} catch(err){
console.log(err)
m.reply(`Case ${q} tidak di temukan`)
}
break
























case 'addkick':{
if (!isGroupAdmins && !isOwner) return setReply(mess.only.admin)
if (!isGroup) return setReply(mess.only.group)
if (!isBotGroupAdmins) return setReply(mess.only.Badmin)
if(!Input) return setReply("reply/tag/nomer target")
let grup = db.data.kickon[from]
if(grup == undefined) db.data.kickon[from] = []
let number = Input.split("@")[0]
if(grup){
if(grup.includes(number)) return setReply("Target sudah ada di database")
grup.push(number)
setReply(`Berhasil memasukan ${number} ke dalam target kick`)
} else {

grup.push(number)
let teks =`Berhasil memasukan ${number} ke dalam target kick
dan telah menandai user sebagai user biadap`
setReply(teks)
}
}
break

case 'delkick':{
if (!isGroupAdmins && !isOwner) return setReply(mess.only.admin)
if (!isGroup) return setReply(mess.only.group)
if (!isBotGroupAdmins) return setReply(mess.only.Badmin)
let grup = db.data.kickon[from]
if(!grup) return setReply("Gunakan fitur addkick terlebih dahulu")
let number = Input.split("@")[0]
grup.splice(grup.indexOf(number,1))
setReply("Berhasil menghapus user dari target kick")
}
break

case 'listkick':{
let kick = db.data.kickon[from]
if(!kick) return setReply("Group ini tidak memiliki listkick")
let banya = `*List Kick*\nJumlah : ${kick.length}\n\n`
kick.map(function(e, i){
banya +=(i+1)+`. Nomer : wa.me/${e}\n\n`
});
setReply(banya)
}
break




































case 'setopen':{
if(!isGroup) return setReply(mee.only.group)
if(!isGroupAdmins) return setReply(mess.only.admin)
if(!q) return setReply('Masukan angka jam, contoh 23:00')
//if(!q.includes(".")) return setReply('Masukan angka jam, contoh 23.00')
let waktu = q.replace('.',':') 
_time.open(groupName,from,waktu,setTime)
setReply(`Berhasil mensetting waktu group di buka setiap jam ${q}`)
}
break


case 'setclose':{
if(!isGroup) return setReply(mee.only.group)
if(!isGroupAdmins) return setReply(mess.only.admin)
if(!q) return setReply('Masukan angka jam, contoh 23:00')
//if(!q.includes(".")) return setReply('Masukan angka jam, contoh 23.00')
let waktu = q.replace('.',':') 
_time.close(groupName,from,waktu,setTime)
setReply(`Berhasil mensetting waktu group di tutup setiap jam ${q}`)
}
break

case 'listtime':
{
let teks = '\n\n––––––『 *List Group* 』––––––\n\n'
for (let i of db.data.others['setTime']) {
teks += `• Group: ${i.name}
  Open: ${i.timeOpen}
  Close: ${i.timeClose}
\n`
}
teks += `\n*Total ada : ${Object.keys(db.data.others['setTime']).length}*`
teks += `\n\n📮 *Note:* ↓
• Setclose untuk mengatur waktu group di tutup
• Setopen untuk mengatur waktu group di buka
• Deltime untuk menonaktifkan opeb/close group
• Contoh setopen 21.00\n`
setReply(teks)
}
break



case 'deltime':{
if(!isGroupAdmins) return setReply(mess.only.admin)
_time.del(from,setTime)
setReply('Succes')
}
break


 
 









 
  
 



















































































































































    
    */