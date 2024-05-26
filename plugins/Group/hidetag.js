import fs from "fs-extra";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  const isImage = m.type === "imageMessage";
  const isVideo = m.type === "videoMessage";
  const isAudio = m.type == "audioMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
  const isQuotedText =
    m.type === "extendedTextMessage" && m.content.includes("conversation");

  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isAdmin && !isOwner) return m.reply(mess.only.admin);
  let mem = [];

  if (
    !isQuotedText &&
    (isQuotedImage ||
      isQuotedVideo ||
      isImage ||
      isVideo ||
      isQuotedAudio ||
      isAudio)
  ) {
    let p = m.quoted ? m.quoted : m;
    let media = await p.download(true);

    m.groupMembers.map((i) => mem.push(i.id));

    if (isQuotedImage || isImage) {
      let caption = m.quoted ? m.quoted.caption : q; // m.message.imageMessage.caption
      conn.sendMessage(m.chat, {
        image: fs.readFileSync(media),
        caption,
        mentions: mem,
      });
    } else if (isQuotedVideo || isVideo) {
      let caption = m.quoted ? m.quoted.caption : q; // m.message.videoMessage.caption
      conn.sendMessage(m.chat, {
        video: fs.readFileSync(media),
        caption,
        mentions: mem,
      });
    } else if (isQuotedAudio || isAudio) {
      //  let caption = m.quoted? m.quoted.caption : q // m.message.videoMessage.caption
      conn.sendMessage(m.chat, {
        audio: fs.readFileSync(media),
        mentions: mem,
        mimetype: "audio/mp4",
      });
    }
  } else if (m.quoted && (m.quoted.mtype == "extendedTextMessage" || m.quoted.mtype == "conversation")) {
    Log("m.quoted.text");
    m.groupMembers.map((i) => mem.push(i.id));
    conn.sendMessage(m.chat, { text: m.quoted.text, mentions: mem });
  } else {
    Log("nothing");
    m.groupMembers.map((i) => mem.push(i.id));
    conn.sendMessage(m.chat, { text: q ? q : "", mentions: mem });
  }
};

handler.tags = ["admin"];
handler.command = ["hidetag", "tag"];
handler.group = true;
export default handler;
