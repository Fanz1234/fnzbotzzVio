let handler = async (m, { conn, q, args, isOwner, setReply }) => {
  const isAntidelete = m.isGroup ? db.data.chats[m.chat].antidelete : false;
  if (!m.isGroup) return setReply("Kusus group");
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntidelete) return setReply("Sudah aktif!!");
    db.data.chats[m.chat].antidelete = true;
    setReply("Sukses mengaktifkan antidelete!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntidelete) return setReply("Udah off!!");
    db.data.chats[m.chat].antidelete = false;
    setReply("Sukses mematikan antidelete!");
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};

handler.tags = ["group"];
handler.command = ["antidelete"];
handler.group = true;
handler.admin = true;

export default handler;
