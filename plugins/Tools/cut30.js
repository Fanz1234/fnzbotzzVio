 
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { q, conn, args, prefix, setReply, command }) => {
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const isVideo = m.type === "videoMessage";
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  
  if (quoted < 30) return setReply("Vidio harus lebih dari 30 detik");
  
  if (isQuotedVideo || isVideo) {
    setReply(mess.wait);
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    ffmpeg(media)
      .setStartTime(0)
      .setDuration(30)
      .on("end", async () => {
        let directoryPath = path.join();
        fs.readdir(directoryPath, async function (err, files) {
          var filteredArray = await files.filter((item) =>
            item.startsWith("output")
          );
          filteredArray.forEach(async function (file) {
            let sampah = fs.existsSync(file);
            if (sampah) {
              await conn.sendMessage(m.chat, {
                caption: `${file}`,
                video: fs.readFileSync(file),
              });
              fs.unlinkSync(file);
            }
          });
        });
      })
      .on("error", (err) => {
        setReply(`Err: ${err}`);
      })
      .saveToFile("output.mp4");
  } else {
    setReply("Reply videonya");
  }
};

handler.help = ["tools"];
handler.tags = ["tools"];
handler.command = ["cut30"];

export default handler;
