//import similarity from 'similarity'
const threshold = 0.72
export async function before(m,{conn}) {
    let id = m.chat
   // if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*calo/i.test(m.quoted.text) || /.*(calo|bantuan)/i.test(m.text)) return !0
    
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
   // if (!(id in conn.caklontong)) return m.reply('Soal itu telah berakhir')
    if (conn.caklontong[id]) {
        let json = JSON.parse(JSON.stringify(conn.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.caklontong[id][2]
            await conn.reply(m.chat, `*Benar!* +${conn.caklontong[id][2]} XP\n${json.deskripsi}`, m)
            clearTimeout(conn.caklontong[id][3])
            delete conn.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold){
            m.reply(`*Dikit Lagi!*`)
        } else if(m.body.includes('yerah')){
            m.reply('Yah nyeraah :(')
            delete conn.caklontong[id]
        } else m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0