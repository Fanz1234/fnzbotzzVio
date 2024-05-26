import { generateProfilePicture } from "../../lib/myfunc.js";

let handler = async (m, { conn, q, setReply, isOwner }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  if (!isOwner) return setReply(mess.only.owner);
  if (isImage || isQuotedImage) {
    if (q == "full") {
      const media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
      const { img } = await generateProfilePicture(media);
      await conn.query({
        tag: "iq",
        attrs: { to: botNumber, type: "set", xmlns: "w:profile:picture" },
        content: [{ tag: "picture", attrs: { type: "image" }, content: img }],
      });
      await setReply("Sukses");
    } else {
      let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
      let data = await conn.updateProfilePicture(botNumber, { url: media });
      fs.unlinkSync(media);
      setReply(`Sukses`);
    }
  } else {
    setReply(
      `Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`
    );
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["setppbot"];

export default handler;
