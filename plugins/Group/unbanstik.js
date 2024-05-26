let handler = async (m, { q, conn, isOwner, setReply }) => {
  const isPremium = isOwner ? true : db.data.users[m.sender].premium;
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  let antiSticker = db.data.others["antiSticker"];
  if (!antiSticker) db.data.others["antiSticker"] = [];
  if ((m.isGroup && !isOwner && !m.isAdmin) || (!m.isGroup && !isPremium))
    return setReply(mess.only.owner);

  if (!isQuotedSticker) return setReply("Reply stickernya");
  let sticker = m.quoted.fileSha256.toString("base64");
  if (!antiSticker.includes(sticker)) return setReply("Tidak ada di database");
  antiSticker.splice(antiSticker.indexOf(sticker, 1));
  setReply("Sukses");
};
handler.help = ["reply sticker"];
handler.tags = ["admin"];
handler.command = ["unbanstik"];
export default handler;
