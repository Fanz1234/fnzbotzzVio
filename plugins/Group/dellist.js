

let handler = async (m, { q, conn, text, command, usedPrefix }) => {
  if (!text) return m.reply("Penggunaan: " + usedPrefix + command + " <teks>\n\n" + usedPrefix + command + " tes")
  let msgs = global.db.data.chats[m.chat].store
  if(!msgs) return m.reply('Tidak ada daftar list store di group ini')
  if(!msgs[text]) return m.reply(`Tidak ada list yang bernama ${text} di dalam database store`)
  delete msgs[text]
  return m.reply("Berhasil Menambahkan " + text + " Ke List Store.\n\nAkses Dengan Mengetik Namanya")
}
handler.help = ["dellstore"]
handler.tags = ["owner"]
handler.command = ["delstore","dellstore","dellist","delllist"]
handler.group = true
handler.admin = true
export default handler