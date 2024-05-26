
import fetch from 'node-fetch'
let handler = async (m, { conn}) => {
try {
if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if(!m.mentionedJid.length) m.mentionedJid.push(m.sender)
let res = await fetch('https://api.waifu.pics/sfw/pat')
let json = await res.json()
let { url } = json
conn.toSticker(m.chat,url,m)
} catch (e) { }}
handler.command = /^(pat)$/i
export default handler