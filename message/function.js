import fs, { readdirSync,  existsSync, readFileSync, watch } from "fs"
import path, { join, dirname } from 'path'
import axios from "axios"
import {TelegraPh} from '../lib/uploader.js'
import cheerio from "cheerio"
import got from "got"
import moment from "moment-timezone"
import {FileSize} from "../lib/myfunc.js"
import toMs from "ms";
import ms from "parse-ms"





export async function Function(conn){
try{
let delSessi = db.data.settings['settingbot'].autoDelSessi
let delTmp = db.data.settings['settingbot'].autoDelTmp
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'com'
let setTime = db.data.others['setTime']
if(!setTime) db.data.others['setTime'] = []

//Function untuk menghapus sampah di session
if(delSessi){
setInterval(() => {
let size = conn.getDirSize(`./${global.session}`)
if(size > 5000000){
fs.readdir(`./${global.session}`, async function (err, files) {
if (err) {
console.log('Unable to scan directory: ' + err);
return
}
let filteredArray = await files.filter(item => item.startsWith("pre-key") ||item.startsWith("sender-key") || item.startsWith("session-"))
if(filteredArray.length == 0) {return}
await filteredArray.forEach(function (file) {
fs.unlinkSync(`./${global.session}/${file}`)
});
});
}
}, 5000)
}





//Function untuk menghapus sampah .tmp di folder database
if(delTmp){
setInterval(() => {
fs.readdir('./database', async function (err, files) {
let tmpFile = await files.filter(item => item.endsWith(".tmp"))
if(tmpFile.length > 0){
console.log("Menghapus file sampah tmp")
await tmpFile.forEach(function (file) {
fs.unlinkSync(`./database/${file}`)
});
console.log("Berhasil menghapus semua sampah tmp")
}
})
}, 10000)
}






//Function untuk update runtime di database
setInterval(() => {
let data = global.db.data.others['runtime']

if(data){
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
console.log("Runtime di perbarui")
} else data.lastTime = + new Date
} else{ global.db.data.others['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
console.log("New update runtime")
}

},60000)


//Function Auto delete sampah
setInterval(async () => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item =>
item.endsWith("gif") ||
item.endsWith("png") ||
item.endsWith("mp3") ||
item.endsWith("mp4") ||
item.endsWith("jpg") ||
item.endsWith("jpeg") ||
item.endsWith("webp") ||
item.endsWith("webm") ||
item.endsWith("zip")
)
if(filteredArray.length > 0){
let teks =`Terdeteksi ${filteredArray.length} file sampah`
console.log(teks)
setInterval(() => {
if(filteredArray.length == 0) return console.log("File sampah telah hilang")
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
if(sampah) console.log('File sampah telah di hapus')
})
}, 25000)
}
});
}, 35000)



//Function untuk update gempa BMKG
let gempa = db.data.others['updateGempa']
let data1 = db.data.others['infogempa']
if(!gempa) db.data.others['updateGempa'] = []

if(gempa && gempa.length > 0){

setInterval(async() => {
const {data} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/
let lokasi = data.Infogempa.gempa.Wilayah //.split("km")[1].replace(nana,"").replace(" ",'').replace(" ","")
let waktu = data.Infogempa.gempa.Jam

if(data1){

if(data1.lokasi !== lokasi && data1.lokasi !== waktu){
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
let url = "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap
const Jimp = require('jimp');

async function resize(ano) {
let anu = getRandomFile('.jpg')
// Read the image.
if(ano == null || ano == undefined) return
const image = await Jimp.read(ano);
// Resize the image to width 150 and heigth 150.
await image.resize(1280, 720);
// Save and overwrite the image
await image.writeAsync(anu);
let gambar = await TelegraPh(anu)
return gambar
}
let link = await resize(url)

let contextInfo =
{
externalAdReply: {
showAdAttribution: false,
title: `BMKG`,
body:`Badan Meteorologi, Klimatologi, Geofisika`,
sourceUrl:`https://www.bmkg.go.id/gempabumi-terkini.html`,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: link,
}
}

let potensi = data.Infogempa.gempa.Potensi
let poten = potensi.includes('diteruskan')? "Gempa dirasakan masyarakat" : potensi
let text = `
––––––『 *INFO GEMPA* 』––––––

*📆 Tanggal:* ${data.Infogempa.gempa.Tanggal}
*🕥 Waktu:* ${data.Infogempa.gempa.Jam}
*📌 Kordinat:* ${data.Infogempa.gempa.Coordinates}
*📈 Magnitudo:* ${data.Infogempa.gempa.Magnitude}
*📉 Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
*🗺️ Lokasi:* ${data.Infogempa.gempa.Wilayah}
*⚠️ Potention:* ${poten}
*🏷️ Effect:* ${data.Infogempa.gempa.Dirasakan}


📮 *Note:* ↓
• Untuk mematikan fitur ini ketik .updategempa off
`

data1.lokasi = lokasi
data1.waktu = waktu

for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1))
console.log("menghapus auto update gempa pada group")
} else {
await sleep(2000)
conn.sendMessage(i,{contextInfo,text})
}
}
}
} else {
db.data.others['infogempa'] = {
lokasi : lokasi,
waktu: waktu
}
}
}, 60_000*10)// akhir dari set interval
}// akhir dari gempa.length










  // Open/close time group
  let groupTime = db.data.others['groupTime']
  if(groupTime){
  } else db.data.others['groupTime'] = []

  setInterval(async () => {
  if(groupTime && groupTime.length > 0){

  for (let i of groupTime ){
    let chat = global.db.data.chats[i]
    if(chat && chat.open !== 0 && Date.now() >= chat.open){
      let getGroups = await conn.groupFetchAllParticipating()
      let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anus = groupss.map(v => v.id)
      for(let i of groupTime){
        if(!anus.includes(i)) {
        groupTime.splice(groupTime.indexOf(i,1))
        console.log("menghapus auto open/close time pada group")
          return
        } else groupTime.splice(groupTime.indexOf(i,1))
        }
    conn.groupSettingUpdate(chat.id, 'not_announcement')
    chat.open = 0
    groupTime.splice(groupTime.indexOf(i,1))
    let text = `*Tepat waktu* grup dibuka oleh admin\n sekarang member dapat mengirim pesan`
    conn.sendMessage(chat.id,{text})
    } else if(chat && chat.close !== 0 && Date.now() >= chat.close){
      let getGroups = await conn.groupFetchAllParticipating()
      let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anus = groupss.map(v => v.id)
      for(let i of groupTime){
        if(!anus.includes(i)) {
        groupTime.splice(groupTime.indexOf(i,1))
        console.log("menghapus auto open/close time pada group")
          return
        } else groupTime.splice(groupTime.indexOf(i,1))
        }
    conn.groupSettingUpdate(chat.id, 'announcement')
    chat.close = 0

    const text = `*Tepat waktu* grup ditutup oleh admin\nsekarang hanya admin yang dapat mengirim pesan`
    conn.sendMessage(chat.id,{text})
    }


  }	
  }
  }, 5000)




setInterval(() => {
try{
var size = conn.getDirSize(`./.cache`)
} catch{
var size = 0
}
if(size > 5000000){
fs.rmdir(`./.cache`, { recursive: true }, (err) => {
    if (err) {
        console.error('Error while deleting the folder:', err);
    } else {
        console.log('Folder cache telah di hapus');
    }
});
}
}, 5000)



    
    
    

    
    
    
    
    
    



}catch(err){
console.log(err)
}


}// akhir dari function