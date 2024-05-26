let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (!q) return m.reply(`Kirim perintah ${command} teks`);
  await conn
    .groupUpdateDescription(m.chat, q)
    .then((res) => {
      setReply(`Sukses`);
    })
    .catch(() => m.reply(mess.error.api));
};

handler.tags = ["admin"];
handler.command = ["setdesc"];
handler.group = true;
handler.admin = true;
export default handler;
