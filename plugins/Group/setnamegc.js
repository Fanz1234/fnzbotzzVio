let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (!q) return reply(`Kirim perintah ${command} teks`);
  await conn
    .groupUpdateSubject(m.chat, q)
    .then((res) => {
      setReply(`Sukses`);
    })
    .catch(() => setReply(mess.error.api));
};

handler.tags = ["admin"];
handler.command = ["linkgc"];
handler.group = true;
export default handler;
