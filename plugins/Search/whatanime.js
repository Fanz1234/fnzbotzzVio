
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { q, setReply, command, conn }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isSticker = m.type == "stickerMessage";
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  
  if (isImage || isQuotedImage) {
    let yoooo = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    
    ffmpeg(yoooo)
      .outputOptions("-f", "image2pipe")
      .outputOptions("-vcodec", "png")
      .outputOptions("-vf", "fps=1")
      .outputFormat("image2")
      .pipe()
      .on('end', () => {
        fs.unlinkSync(yoooo);
      })
      .on('error', (err) => {
        setReply("Gagal :V");
        fs.unlinkSync(yoooo);
      });
  } else if (isSticker || isQuotedSticker) {
    let yoooo = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile(".png");
    
    ffmpeg(yoooo)
      .output(ran)
      .on('end', async () => {
        fs.unlinkSync(yoooo);

        let bodyForm = new FormData();
        bodyForm.append("image", fs.createReadStream(ran));
        
        fetchJson("https://api.trace.moe/search", {
          method: "POST",
          body: bodyForm,
        })
        .then(async (res) => {
          if (res.result && res.result.length <= 0)
            return setReply("Anime not found! :(");
          
          let teks = "";
          if (res.result[0].similarity < 0.92) {
            teks += "*Low similarity. 🤔*\n\n";
          }
          teks += `*Title*: ${res.result[0].filename.split(".mp4")[0]}\n*Episode*: ${res.result[0].episode}\n*Similarity*: ${(res.result[0].similarity * 100).toFixed(1)}%`;
          
          await conn.sendMessage(
            m.chat,
            { caption: teks, video: { url: res.result[0].video } },
            { quoted: m }
          );
          
          fs.unlinkSync(ran);
        })
        .catch((err) => {
          setReply(mess.error.api);
          fs.unlinkSync(ran);
        });
      })
      .on('error', (err) => {
        setReply("Gagal :V");
        fs.unlinkSync(yoooo);
      });
  } else {
    setReply(`Kirim/reply gambar atau sticker dengan caption ${command}`);
  }
};

handler.help = ["anime"];
handler.tags = ["search"];
handler.command = ["whatanime"];

export default handler;
