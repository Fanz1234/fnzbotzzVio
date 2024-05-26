let handler = async (m, { conn, setReply }) => {
  if (!m.mentionByReply) return setReply("Reply pesan");
  if (m.mentionByReply == m.botNumber) {
    conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: m.quoted.id,
        participant: m.mentionByReply,
      },
    });
  } else if (m.mentionByReply !== m.botNumber && m.isBotAdmin) {
    conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.mentionByReply,
      },
    });
  }
};
handler.help = ["del"];
handler.tags = ["group"];
handler.command = ["del", "delete"];

handler.group = true;

export default handler;
