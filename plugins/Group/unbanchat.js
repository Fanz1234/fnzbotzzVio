let handler = async (m,{ conn, isOwner, setReply, text, command, usedPrefix }) => {
  const isBanchat = m.isGroup ? db.data.chats[m.chat].banchat : false;
  const chat = global.db.data.chats[m.chat];
  if (!m.isAdmin && !isOwner) return setReply("Hanya owner dan admin");
  if (!m.isGroup) return setReply(mess.only.group);
  try {
    if (!isBanchat) return setReply(`Sudah di unban`);
    db.data.chats[m.chat].banchat = false;
    setReply(`Bot telah di Unban di group ini`);
  } catch (err) {
    console.log(err);
    setReply(`${err}`);
  }
};
handler.help = ["unbanchat"];
handler.tags = ["group"];
handler.command = ["unbanchat", "unmute"];
handler.group = true;
handler.admin = true;
export default handler;
