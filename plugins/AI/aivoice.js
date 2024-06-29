
import axios from 'axios'
import fetch from 'node-fetch'
import gtts from 'node-gtts'
//import { readFileSync, unlinkSync } from 'fs'
import fs from 'fs-extra'
import { join } from 'path'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {

  
  let teks 
  if (m.quoted) {
  teks = m.quoted ? m.quoted.text : ''
  } else if (text) {
  teks = text ? text : ''
  } else throw `example: ${usedPrefix+command} hai`
  m.reply(wait)
  
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAnpf08xcDfbhmR_jdADigoVWnnaQ3-XAM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: teks
                    }]
                }]
            }),
        });
const {
            candidates
        } = await response.json();
        if (!candidates) throw 'eror 404'
            const content = candidates[0].content;
            const result = content.parts[0].text
try {
const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": result ,
    "voice": 'id_001'
})
let audio = {
    audio: Buffer.from(data.data, "base64"),
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        mediaUrl: '',
        title: 'FANZAI VOICE',
        body: '',
        sourceUrl: '',
        thumbnail: await (await conn.getFile('https://telegra.ph/file/509d0541f75f9edc4feec.jpg')).data,
        renderLargerThumbnail: true
      }
    }
  };

  conn.sendMessage(m.chat, audio, { quoted: m })
} catch (e) {
 let res = await tts(result, 'id') 
 let audios = {
    audio: Buffer.from(res, "base64"),
    mimetype: 'audio/mp4',
    ptt: false,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        mediaUrl: '',
        title: 'FANZAI VOICE',
        body: '',
        sourceUrl: '',
        thumbnail: await (await conn.getFile('https://telegra.ph/file/509d0541f75f9edc4feec.jpg')).data,
        renderLargerThumbnail: true
      }
    }
  };
    conn.sendMessage(m.chat, audio, { quoted: m })
    
}
}
handler.help = ["aivoice"]
handler.tags = ["tools"]
handler.command = ["aivoice", "fanzaivoice"]


export default handler

function tts(text, lang = 'id') {
  console.log(lang, text)
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
let filePath =  (1 * new Date) + '.mp3'
tts.save(filePath, text, () => {
resolve(fs.readFileSync(filePath))
fs.unlinkSync(filePath)
})
} catch (e) { reject(e) }
})
}    