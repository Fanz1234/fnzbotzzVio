let handler = async (m, { q, conn, isOwner, setReply }) => {
  try {
    if (!m.isGroup) return setReply(mess.only.group);
    if (!m.isBotAdmin) return setReply(mess.only.Badmin);
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    await setReply("Done wkwkw");
  } catch (err) {
    setReply(`${err}`);
  }
};
handler.help = ["kickme"];
handler.tags = ["admin"];
handler.command = ["kickme"];
handler.group = true;
export default handler;
