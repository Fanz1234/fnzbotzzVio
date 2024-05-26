let handler = async (m, { q, conn, isOwner, setReply }) => {
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isBotAdmin) return m.reply(mess.Badmin);
  let Url = await conn
    .groupInviteCode(m.chat)
    .catch(() => seReply(mess.error.api));
  let asu = "https://chat.whatsapp.com/" + Url;
  setReply(asu);
};
handler.help = ["linkgc"];
handler.tags = ["admin"];
handler.command = ["linkgc"];
handler.group = true;
export default handler;
