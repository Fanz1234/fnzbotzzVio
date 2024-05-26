let handler = async (m, { usedPrefix, command, q }) => {
if(q == "on"){
if(db.data.chats[m.chat].rpg) return m.reply("Rpg sudah aktif di group ini")
global.db.data.chats[m.chat].rpg = true
m.reply("Berhasil mengaktifkan rpg pada group ini")
} else if(q == "off"){
if(!db.data.chats[m.chat].rpg) return m.reply("Rpg sudah tidak aktif di group ini")
global.db.data.chats[m.chat].rpg = false
m.reply("Berhasil menonaktifkan rpg pada group ini")
} else m.reply("Pilih on/off")
  
};

handler.command = ['rpg'];
handler.tags = ['game'];
handler.admin = true
handler.group = true
export default handler;