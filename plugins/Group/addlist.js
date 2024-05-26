
let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!m.quoted) return m.reply("Balas Pesan Dengan Perintah *" + usedPrefix + command + "*")
  if (!text) return m.reply("Penggunaan: " + usedPrefix + command + " <teks>\n\nContoh:\n" + usedPrefix + command + " tes")
  let msgs = global.db.data.chats[m.chat].store
  
  if(!msgs) {
    global.db.data.chats[m.chat].store = {}
   let nana = global.db.data.chats[m.chat].store[text]
     if(!nana) global.db.data.chats[m.chat].store[text] = {
          id:m.senderNumber,
          text: m.quoted.text
          }
    
    return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
  }

   msgs[text] = {
    id:m.senderNumber,
    text: m.quoted.text
    }
  return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
}
handler.help = ["addstore"]
handler.tags = ["owner"]
handler.command = ["addstore","addlist"]
handler.group = true
handler.admin = true
export default handler