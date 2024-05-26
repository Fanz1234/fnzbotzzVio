
import fs from "fs-extra";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (isImage || isQuotedImage) {
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    await conn
      .updateProfilePicture(m.chat, { url: media })
      .then((res) => {
        setReply(`Sukses`);
        fs.unlinkSync(media);
      })
      .catch(() => reply(mess.error.api));
  } else {
    setReply(`Kirim/balas gambar dengan caption ${command}`);
  }
};

handler.tags = ["admin"];
handler.command = ["setppgc"];
handler.group = true;
handler.admin = true;
export default handler;
