import ms from "parse-ms";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";
const acrcloud = require("acrcloud");

const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "c9f2fca5e16a7986b0a6c8ff70ed0a06",
  access_secret: "PQR9E04ZD60wQPgTSRRqwkBFIWEZldj0G3q7NJuR",
});

let handler = async (m, { conn, q, args, command, setReply }) => {
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
  const isVideo = m.type === "videoMessage";
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (isVideo || isQuotedVideo || isQuotedAudio) {
    setReply(mess.wait);
    let media = await conn.downloadMed(quoted, makeid(5));
    let ran = getRandomFile(".mp3");

    // Convert using fluent-ffmpeg
    await ffmpeg(media)
      .audioCodec("libmp3lame") // Specify MP3 output
      .saveToFile(ran)
      .on("error", (err) => {
        console.error(err);
        fs.unlinkSync(media);
        return setReply("Gagal mengkonversi ke audio");
      })
      .on("end", async () => {
        fs.unlinkSync(media); // Delete original media after conversion
        let sample = fs.readFileSync(ran);
        acr.identify(sample).then(async (metadata) => {
          if (metadata.status.msg === "No result")
            return setReply("Music tidak ditemukan");
          let res = metadata.metadata.music[0];
          console.log(res.external_metadata);
          let text = `
Judul: ${res.title}
Durasi: ${conn.msToMinute(res.duration_ms)}
artis: ${res.artists[0].name}
Release: ${res.release_date}
Label: ${res.label}

`;
          setReply(text);
          fs.unlinkSync(ran); // Delete temporary MP3 file
        });
      });
  } else setReply("Reply audio atau video");
};
handler.help = ["pinterest"];
handler.tags = ["info"];
handler.command = ['wmusic','whatmusic']
export default handler;
