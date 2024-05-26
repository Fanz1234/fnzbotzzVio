
import fs from "fs-extra";
let handler = async (m, { q, conn, isOwner, setReply, command }) => {
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const isAllMedia =
    m.type === "imageMessage" ||
    m.type === "videoMessage" ||
    m.type === "stickerMessage" ||
    m.type === "audioMessage";
  const isQuotedText =
    m.type === "extendedTextMessage" &&
    (m.content.includes("conversation") ||
      m.content.includes("extendedTextMessage"));
  if (!isOwner) return setReply(mess.only.owner);
  if (!q)
    return setReply(
      `where is the path?\n\nexample:\n${prefix + command} plugins/menu.js`
    );

  if (isAllMedia && !isQuotedText) {
    if (!q) return setReply("Jangan lupa isi query, Contoh ./media/lala.jpg");
    let delb = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    await fs.copy(delb, q);
    fs.unlinkSync(delb);
    setReply(`File telah tersimpan`);
  } else if (isQuotedText) {
    let path = `${q}`;
    await require("fs").writeFileSync(path, m.quoted.text);
    setReply(`Saved ${path} to file!`);
  } else setReply(`reply code/photo/video/audio`);
};

handler.tags = ["owner"];
handler.command = ["save",'savefile','sf'];
handler.owner = true;
export default handler;
