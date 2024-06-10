let handler = async (
    m,
    { conn,q, args, isOwner, setReply, text, command, usedPrefix }
  ) => {
    const isAntiSpam = m.isGroup ? db.data.chats[m.chat].antispam : false;
    if (!m.isAdmin) return setReply(mess.only.admin);
    if (!m.isBotAdmin) return setReply(mess.only.Badmin);
    if (!m.isGroup) return setReply("hanya bisa di group");
    if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
      if (isAntiSpam) return setReply("Fitur sudah aktif kak");
      db.data.chats[m.chat].antispam = true;
      let ih = `Fitur antispam group telah di aktifkan`;
      setReply(ih);
    } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
      if (!isAntiSpam) return setReply("Udah mati");
      db.data.chats[m.chat].antispam = false;
      let ih = `Fitur antispam group telah di matikan`;
      setReply(ih);
    } else if (!q) {
      setReply("Pilih on atau off");
    }
  };
  handler.help = ["antilinkgc"];
  handler.tags = ["group"];
  handler.command = ["antispam"];
  handler.group = true;
  handler.admin = true;
  export default handler;
  