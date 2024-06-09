import fetch from "node-fetch";
import fs from "fs-extra";
import {  TelegraPh  } from '../../lib/uploader.js'
const client = require("filestack-js").init(fileStackApi);

let handler = async (m, { conn, text, command, q, usedPrefix }) => {
  if (!m.quoted) return m.reply("Balas Pesan Dengan Perintah *" + usedPrefix + command + "*")
  const isQuotedImage =
  m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isImage = m.type === "imageMessage";
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isVideo = m.type === "videoMessage";
  const isQuotedText = (m.quoted.mtype === "extendedTextMessage" || m.quoted.mtype === "conversation")
  

const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;  
if (!m.quoted) return m.reply("Balas Pesan Dengan Perintah *" + usedPrefix + command + "*")
if (!text) return m.reply("Penggunaan: " + usedPrefix + command + " <teks>\n\nContoh:\n" + usedPrefix + command + " tes")
let p = m.quoted ? m.quoted : m;
let mime = (p.msg || p).mimetype || "";
let msgs = global.db.data.chats[m.chat].store

if(msgs) {


if (isQuotedVideo||isVideo||isImage||isQuotedImage) {
  log('image/vidio')
await m.reply(wait);
let media = await p.download(true);
log(media)
let ous = await TelegraPh(media);

//global.db.data.chats[m.chat].store = {}
let nana = global.db.data.chats[m.chat].store[text]
if(!nana) global.db.data.chats[m.chat].store[text] = {
id:m.senderNumber,
caption: m.quoted.text,
media: ous
}
m.reply("Berhasil Menambahkan media dengan nama " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
fs.unlinkSync(media);
} else if (isQuotedText) {

//global.db.data.chats[m.chat].store = {}
let nana = global.db.data.chats[m.chat].store[text]
if(!nana) global.db.data.chats[m.chat].store[text] = {
id:m.senderNumber,
text: m.quoted.text
}

return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
} else if (isQuotedAudio) {
  await m.reply(wait);
let media = await conn.downloadAndSaveMediaMessage(quoted, q);
await client.upload(media, {}, { filename: q }, {}).then((data) => {
//global.db.data.chats[m.chat].store = {}
let nana = global.db.data.chats[m.chat].store[text]
if(!nana) global.db.data.chats[m.chat].store[text] = {
id:m.senderNumber,
caption: '',
media: data.url
}
m.reply("Berhasil Menambahkan media dengan nama " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
fs.unlinkSync(media);
});

} else m.reply("Reply image/video/audio/text");






} if(!msgs) {

  if (isQuotedVideo||isVideo||isImage||isQuotedImage) {
    log('image/vidio')
  await m.reply(wait);
  let media = await p.download(true);
  log(media)
  let ous = await TelegraPh(media);
  
  global.db.data.chats[m.chat].store = {}
  let nana = global.db.data.chats[m.chat].store[text]
  if(!nana) global.db.data.chats[m.chat].store[text] = {
  id:m.senderNumber,
  caption: m.quoted.text,
  media: ous
  }
  m.reply("Berhasil Menambahkan media dengan nama " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
  fs.unlinkSync(media);
  } else if (isQuotedText) {
  
  global.db.data.chats[m.chat].store = {}
  let nana = global.db.data.chats[m.chat].store[text]
  if(!nana) global.db.data.chats[m.chat].store[text] = {
  id:m.senderNumber,
  text: m.quoted.text
  }
  
  return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
  } else if (isQuotedAudio) {
    await m.reply(wait);
  let media = await conn.downloadAndSaveMediaMessage(quoted, q);
  await client.upload(media, {}, { filename: q }, {}).then((data) => {
  global.db.data.chats[m.chat].store = {}
  let nana = global.db.data.chats[m.chat].store[text]
  if(!nana) global.db.data.chats[m.chat].store[text] = {
  id:m.senderNumber,
  caption: '',
  media: data.url
  }
  m.reply("Berhasil Menambahkan audio dengan nama " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
  fs.unlinkSync(media);
  });
  
  } else  m.reply("Reply image/video/audio/text");

}






/*

msgs[text] = {
id:m.senderNumber,
text: m.quoted.text
}
return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
*/

}
handler.help = ["addstore"]
handler.tags = ["owner"]
handler.command = ["addstore","addlist"]
handler.group = true
handler.admin = true
export default handler



































































// Fungsi untuk menyimpan file dari URL ke sistem file lokal
async function saveFileFromURL(url, filePath) {
try {
const response = await fetch(url);
if (!response.ok) {
throw new Error('Gagal mengambil file');
}

const fileStream = fs.createWriteStream(filePath);
response.body.pipe(fileStream);

return new Promise((resolve, reject) => {
fileStream.on('finish', resolve);
fileStream.on('error', reject);
});
} catch (error) {
console.error('Gagal menyimpan file:', error);
}
}


