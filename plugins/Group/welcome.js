let handler = async (
  m,
  { conn, isOwner, q, setReply, text, command, usedPrefix }
) => {
  let chat = db.data.chats[m.chat];
  if (!q) return setReply("Masukan query on atau of");
  if (!chat) return setReply("Group ini belom terdaftar di database bot");
  if (!m.isGroup) return setReply(mess.only.group);
  if (q == "on") {
    if (chat.welcome == true) return setReply("Welcome sudah aktif");
    db.data.chats[m.chat].welcome = true;
    setReply("Berhasil mengaktifkan welcome pada group ini");
  } else if (q == "off") {
    if (chat.welcome == false) return setReply("Welcome sudah tidak aktif");
    db.data.chats[m.chat].welcome = false;
    setReply("Berhasil menonaktifkan welcome pada group ini");
  } else setReply("Pilih on atau off");
};
handler.help = ["welcome"];
handler.tags = ["group"];
handler.command = ["welcome"];
handler.group = true;
handler.admin = true;
export default handler;
