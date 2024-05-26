import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, {q, conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} url`
	try {
		m.reply(mess.wait)
		let res = await youtubedl(q)
		let data = res.video["720p"]? res.video["720p"] : res.video["480p"]? res.video["480p"] : res.video["360p"]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendMessage(m.chat, { video: { url: site }}, { quoted : m })
	} catch (e) {
		console.log(e)
	} 
}

handler.command = ["ytvidio","ytvideo","ytvid"]

export default handler