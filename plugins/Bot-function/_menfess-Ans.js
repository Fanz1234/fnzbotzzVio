const delay = time => new Promise(res => setTimeout(res, time))
export async function before(m,{conn}) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	conn.menfess = conn.menfess ? conn.menfess : {}
	let mf = Object.values(conn.menfess).find(v => v.status === false && v.penerima == m.sender)
	if (!mf) return !0
	console.log({ text: m.text, type: m.quoted?.mtype })
	if ((m.text === 'Balas Pesan' || m.text === '') && m.quoted && m.quoted.mtype == 'buttonsMessage') return m.reply("Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan.");
	else {
		
		let txt = `Hai kak, kamu menerima balasan nih.\n\nPesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim();
		await conn.reply(mf.dari, txt, null).then(() => {
			m.reply('Berhasil Mengirim balasan.')
			delay(1500)
			delete conn.menfess[mf.id]
			return !0
		})
	}
	return 
}