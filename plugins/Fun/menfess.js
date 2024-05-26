let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) return m.reply(`*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Wajan|Halo.`)
    let [jid, name, pesan] = text.split('|');
    if (jid.startsWith('0')) return m.reply('Gunakan format 62')
    if ((!jid || !name || !pesan)) return m.reply(`*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Wajan|Halo.`)
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) return m.reply('Nomer tidak terdaftar di whatsapp.')
    if (jid == m.sender) return m.reply('tidak bisa mengirim pesan menfess ke diri sendiri.')
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai Kak, kamu menerima pesan Menfess nih.\n\nDari: *${name}*\nPesan: \n${pesan}\n\nMau balas pesan ini kak? bisa kak. kakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim();
        await conn.reply(data.jid, txt, null)
        .then(() => {
            m.reply('Berhasil mengirim pesan menfess.')
            conn.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        m.reply('eror');
    }
}
handler.tags = ['anonymous']
handler.help = ['menfess'].map(v => v + ' <nomor>|<nama>|<pesan>')
handler.command = /^(mfs|men(fes|fess)|con(fes|fess))$/i
handler.private = true

export default handler