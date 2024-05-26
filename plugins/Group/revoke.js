let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  await conn
    .groupRevokeInvite(m.chat)
    .then((res) => {
      setReply(`Sukses menyetel tautan undangan grup ini`);
    })
    .catch(() => reply(mess.error.api));
};

handler.tags = ["admin"];
handler.command = ["revoke"];
handler.group = true;
handler.admin = true;
export default handler;
