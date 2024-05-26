
let handler = async (m, { conn, text, command, usedPrefix }) => {

  let teks = '\n\n––––––『 *LIST STORE* 』––––––\n\n'
  if(db.data.chats[m.chat].store == undefined) return m.reply('Group ini tidak memiliki list')
  for (let awokwkwk of Object.keys(db.data.chats[m.chat].store)) {
  teks += `• ${awokwkwk}\n`
  }
  teks += `\n*Total ada : ${Object.keys(db.data.chats[m.chat].store).length}*`
  teks += `\n\n📮 *Note:* ↓
  • Untuk mengambil list ketik nama list
  • Gunaka huruf sesuai dengan nama list
  • Dilarang spam berlebihan menggunakan list\n`
  m.reply(teks)

}
handler.help = ["addstore"]
handler.tags = ["owner"]
handler.command = ["liststore","list"]
handler.group = true
export default handler