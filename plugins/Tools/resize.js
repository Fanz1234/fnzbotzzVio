 
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { q, conn, args, prefix, setReply, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  
  if (isQuotedImage || isImage) {
    if (!q)
      return setReply(
        `Masukan ukuran panjangxlebar, contoh ${prefix + command} 300x300`
      );
    setReply(mess.wait);
    let panjang = q.split("x")[0];
    let lebar = q.split("x")[1];
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile(".jpeg");

    ffmpeg(media)
      .size(`${panjang}x${lebar}`)
      .on("end", async () => {
        fs.unlinkSync(media);
        let buffer453 = fs.readFileSync(ran);
        await conn.sendMessage(
          m.chat,
          { mimetype: "image/jpeg", image: buffer453, caption: `Nih ${q}` },
          { quoted: m }
        );
        fs.unlinkSync(ran);
      })
      .on("error", (err) => {
        fs.unlinkSync(media);
        fs.unlinkSync(ran);
        setReply(`Err: ${err}`);
      })
      .save(ran);
  } else {
    setReply("Reply Imagenya");
  }
};

handler.help = ["tools"];
handler.tags = ["tools"];
handler.command = ["resize"];

export default handler;
