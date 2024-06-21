import FormData from "form-data";
import Jimp from "jimp";

let handler = async (m, { conn, usedPrefix, command }) => {
  switch (command) {
case 'remini2':
case 'hd2':{
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const quoted = (quoted.msg || quoted)
if (/image/.test(mime)) {
await reply('sek proses, please wait...');
let media = await conn.downloadAndSaveMediaMessage(quoted);
let re2s = await await TelegraPh(media)
let res = await fetchJson(`https://aemt.me/remini?url=${re2s}&resolusi=4`)
await conn.sendMessage(m.chat, { image: {url: res.url }, caption: 'kio su wes dadi gambare:v' , mimetype: "image/jpeg"},{ quoted: m });
} else return reply('Bot Hanya Bisa Enhance Image/gambar.') 

}
break
};
handler.help = ["remini2", "color", "hdr"];
handler.tags = ["ai"];
handler.command = ["hd2", "remini2"];
export default handler;
