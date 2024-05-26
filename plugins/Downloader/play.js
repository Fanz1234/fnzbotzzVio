import fetch from "node-fetch"
import fs from 'fs-extra'
import {FileSize,h2k} from "../../lib/myfunc.js"
import yts from "yt-search"
import ytdl from 'ytdl-core'

let handler = async (m, {q,conn,args,usedPrefix,setReply,command}) => {



//DOWNLOAD MP4
const downloadMp4 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp4File = getRandomFile('.mp4')
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on("finish", async () => {
await conn.sendMessage(m.chat, { video: fs.readFileSync(mp4File), caption: "Nih!",gifPlayback: false},{quoted: m})
fs.unlinkSync(`./${mp4File}`)
})
} catch(err) {
    Log(err)
setReply(`${err}`)
}
}


//DOWNLOAD MP3
const downloadMp3 = async (Link ,name = "Audio", opt = "audio") => {
try{
await ytdl.getInfo(Link);
let mp3File = name == "Audio"? getRandomFile('.mp3') : name
ytdl(Link, {filter: 'audioonly'})
.pipe(fs.createWriteStream(mp3File))
.on("finish", async () => {
  Log(opt)
if(opt == "audio") await conn.sendMessage(m.chat, {audio:  fs.readFileSync(mp3File), mimetype: 'audio/mp4' },{ quoted: m })
if(opt == "doc") await conn.sendMessage(m.chat, { document: fs.readFileSync(mp3File), fileName: name+'.mp3', mimetype: 'audio/mp4'  }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err){
console.log(err)
}
}






if(!q) return setReply("Teksnya mana om")
m.reply(mess.wait)
let opt = q.endsWith("-doc")? "doc": q.endsWith("-mp4")? "mp4":"audio"
let withLink = q.startsWith('https://')
let query = q.replace("-doc","").replace("-mp4","")
if(!withLink){
let rus = await yts(query) 
if(rus.all.length == "0") return setReply("Video tidak bisa di download")
let data = await rus.all.filter(v => v.type == 'video')
var res = data[0] || data[1]	
}
let info = withLink? await ytdl.getInfo(query) : await ytdl.getInfo(res.url);
let teks = withLink? query:res.url

if(opt == 'doc' || opt == 'audio'){
var size = await ytdl.filterFormats(info.formats, 'audioonly');
} else if(opt == 'mp4'){
var size = await ytdl.chooseFormat(info.formats, { quality: '18' });
}

try{
var lown = opt == 'mp4'? size.contentLength : size[0].contentLength
}catch{
var lown = opt == 'mp4'? size.contentLength : size[2].contentLength
}
if(Number(lown) > 50000000 ) return setReply(`Bjir sizenya ${FileSize(lown)}\nAu ah ga mao download 😤`)

let data1 = info.videoDetails
let judul = data1.title
let durasi = data1.lengthSeconds
let views = data1.viewCount
let channel = data1.ownerChannelName
let thumb = data1.thumbnails.pop().url

let toks =`*Playing now*

💾 *File:* ↓
• Judul : ${judul.substr(0,31)+'...'}
• Ditonton : ${h2k(views)} Kali
• Durasi : ${durasi > 60? (durasi/60).toFixed(1) : durasi} menit
• Channel : ${channel}
• Size : ${FileSize(lown)}

📮 *Note:* ↓
• Tambahkan -doc di bagian akhir 
  untuk mengirim file dalam bentuk dokumen
• Tambahkan -mp4 di bagian akhir 
  untuk mengirim file dalam bentuk vidio
`
conn.sendAdReply(m.chat, transformText(toks), judul, channel, thumb)
if(opt == "audio") downloadMp3(teks)
if(opt == "doc") downloadMp3(teks,judul,"doc")
if(opt == 'mp4') downloadMp4(teks)





}
handler.help = ["downloader"]
handler.tags = ["internet"];
handler.command = ['play']

export default handler


























