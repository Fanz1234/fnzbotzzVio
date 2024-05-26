let handler = async (m, { q, conn, text, setReply, command, usedPrefix }) => {
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);

  if (command == "gc" && q == "close") {
    conn.groupSettingUpdate(m.chat, "announcement");
    setReply(`Group telah di tutup`);
  } else if (command == "gc" && q == "open") {
    conn.groupSettingUpdate(m.chat, "not_announcement");
    setReply(`Group telah di buka`);
  }  if (command == "close") {
    conn.groupSettingUpdate(m.chat, "announcement");
    setReply(`Group telah di tutup`);
  } else if (command == "open") {
    conn.groupSettingUpdate(m.chat, "not_announcement");
    setReply(`Group telah di buka`);
  } else if(command == "gc" && !q) {
    setReply(
      `Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`
    );
  }
};
handler.help = ["gc open/close"];
handler.tags = ["admin"];
handler.command = ["gc", "group","open","close"];
handler.group = true;
handler.admin = true;
export default handler;
