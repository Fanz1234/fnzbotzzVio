import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, {q, conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} url`
	try {
		let res = await youtubedl(q)
		log(res)
		let data = res.audio[Object.keys(res.audio)[0]]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendMessage(m.chat, { audio: { url: site }, mimetype: 'audio/mp4' }, { quoted : m })
	} catch (e) {
		console.log(e)
	} 
}


handler.command = ["ytaudio"]

export default handler