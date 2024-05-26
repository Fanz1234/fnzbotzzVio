 

let handler = async (m, { q, conn, isOwner, setReply }) => {
  const isImage = m.type === "imageMessage";
  const isVideo = m.type === "videoMessage";
  const isViewOnce = m.type == "viewOnceMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isQuotedViewOnce =
    m.type === "extendedTextMessage" && m.content.includes("viewOnceMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const { downloadContentFromMessage } = (await import("baileys")).default;

  if (
    isImage ||
    isQuotedImage ||
    isVideo ||
    isQuotedVideo ||
    isViewOnce ||
    isQuotedViewOnce
  ) {
    if (isQuotedViewOnce) {
        if (quoted.seconds > 11) return m.reply("Maksimal 10 detik!")
      let view = m.quoted.message;
      let Type = Object.keys(view)[0];
      let media = await downloadContentFromMessage(
        view[Type],
        Type == "imageMessage" ? "image" : "video"
      );
      let buffer = Buffer.from([]);
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      conn.toSticker(m.chat, buffer, m);
    } else {
      if (quoted.seconds > 11) return m.reply("Maksimal 10 detik!");
      const media = await conn.downloadMed(quoted, makeid(5));
      conn.toSticker(m.chat, media, m);
    }
  }
};
handler.help = ["reply viewonce"];
handler.tags = ["admin"];
handler.command = ["s", "sticker"];
export default handler;
