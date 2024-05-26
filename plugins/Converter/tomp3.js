
import fs from "fs-extra";
import ffmpeg from 'fluent-ffmpeg';

let handler = async (m, { conn, setReply }) => {
  const isVideo = m.type === "videoMessage";
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (isQuotedVideo || isVideo) {
    setReply(mess.wait);
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile(".mp3");

    // Convert video to mp3 using fluent-ffmpeg
    ffmpeg(media)
      .inputOption('-vn') // Remove video stream
      .outputOption('-acodec', 'libmp3lame') // Set audio codec to mp3
      .saveToFile(ran)
      .on('error', (err) => {
        console.error(err);
        return setReply(`Err: ${err}`);
      })
      .on('end', async () => {
        let buffer453 = fs.readFileSync(ran);
        await conn.sendMessage(
          m.chat,
          { mimetype: "audio/mp4", audio: buffer453 },
          { quoted: m }
        );
        fs.unlinkSync(media);
        fs.unlinkSync(ran);
      });
  } else {
    setReply("Reply videonya");
  }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["tomp3"];
export default handler;
