import fetch from "node-fetch"
import {facebook} from "@xct007/frieren-scraper"

// others version will added soon.
let handler = async (m, {conn, args, text, usedPrefix,command}) => {
try{
m.reply(wait)
 let results = await facebook.v1(text)
 let caption = `*[ F A C E B O O K ]*

*Title:* ${results.title}
*HD:* ${results.isHdAvailable}
	`
let out = results.urls[0].hd ? results.urls[0].hd : (results.urls[1].sd ? results.urls[1].sd : false)
await conn.sendFile(m.chat, out, "", caption, m)
} catch(err){
	
	m.reply(`${err}`)

}
}
handler.help = ["facebook"]
handler.tags = ["downloader"]
handler.alias = ["fb", "fbdl", "facebook", "facebookdl"]
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler