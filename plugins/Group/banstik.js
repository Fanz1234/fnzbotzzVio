let handler = async (m, { q, conn, isOwner, setReply }) => {
  const isPremium = isOwner ? true : db.data.users[m.sender].premium;
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  let antiSticker = db.data.others["antiSticker"];
  if (!antiSticker) db.data.others["antiSticker"] = [];
  if ((m.isGroup && !isOwner && !m.isAdmin) || (!m.isGroup && !isPremium))
    return setReply(mess.only.owner);
  //if(!antiSticker) await db.data.others["antiSticker"]  = []
  if (!m.mentionByReply) return setReply("Reply pesan");
  if (m.entionByReply == m.botNumber) {
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

  if (!isQuotedSticker) return setReply("Reply stickernya");
  let sticker = m.quoted.fileSha256.toString("base64");
  if (antiSticker.includes(sticker)) return setReply("sudah ada di database");
  antiSticker.push(sticker);
  setReply("Sukses");
};
handler.help = ["reply sticker"];
handler.tags = ["admin"];
handler.command = ["banstik"];
export default handler;
