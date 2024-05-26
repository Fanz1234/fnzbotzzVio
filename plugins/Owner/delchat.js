let handler = async (m, { conn, q, args, setReply, usedPrefix, command }) => {
  await conn.chatModify(
    {
      delete: true,
      lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }],
    },
    m.chat
  );
  setReply("Sukses");
};
handler.help = ["delorder <idgc>"];
handler.tags = ["owner"];
handler.command =['delchat']
handler.owner = true;

export default handler;
