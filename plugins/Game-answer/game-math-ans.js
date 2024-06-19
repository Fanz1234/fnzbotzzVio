let handler = m => m
handler.before = async function(m,{conn}) {
 //if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
 // if (!m.quoted || !m.quoted?.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted?.text)) return !0
  conn.math = conn.math ? conn.math : {}
  log(conn.math)
 // if (!(id in conn.math)) m.reply('Soal itu telah berakhir')

/// m.quoted?.id === conn.math[id][0]?.id
  if ((id in conn.math)) {
   
    let math = JSON.parse(JSON.stringify(conn.math[id][1]))
    log(math.result)
    log(m.body)
    if (parseInt(m.body) === math.result) {
      db.data.users[m.sender].exp += math.bonus
      clearTimeout(conn.math[id][3])
      delete conn.math[id]
     m.reply(`✅ *Benar!*\n+${math.bonus} XP`)
    } else if (/^-?[0-9]+(\.[0-9]+)?$/.test(m.body)) m.reply('salah');
    
    
    /*
    else {
      if (--conn.math[id][2] === 0) {
        clearTimeout(conn.math[id][3])
        delete conn.math[id]
        conn.reply(m.chat, `❗ *Kesempatan habis!*\nJawaban: *${math.result}*`, m)
      } else m.reply(`❌ *Jawaban Salah!*\nMasih ada ${conn.math[id][2]} kesempatan`)
    }

    */
  }
 // return !0
  
}
export default handler
