import { FileSize } from "../../lib/myfunc.js";
import fs from "fs-extra";
import ffmpeg from "fluent-ffmpeg";

let handler = async (m, { q, conn, isOwner, setReply }) => {
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isVideo = m.type === "videoMessage";
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const client = require("filestack-js").init(fileStackApi);

  if (!q) return setReply("Nama audionya apa?");
  if (db.data.audio[q])
    return setReply("Nama tersebut sudah ada di dalam database");

  if (isQuotedAudio) {
    let media = await conn.downloadAndSaveMediaMessage(quoted, q);
    await client.upload(media, {}, { filename: q }, {}).then((data) => {
      db.data.audio[q] = {
        name: data._file.name,
        id: data.handle,
        size: FileSize(data._file.size),
        link: data.url,
      };
    });
    let teks = `Berhasil menambahkan audio
        ke dalam database dengan nama *${q}*`;
    await setReply(teks);
    await fs.unlinkSync(media);
  } else if (isQuotedVideo || isVideo) {
    setReply(mess.wait);
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile(".mp3");

    ffmpeg(media)
      .noVideo()
      .audioCodec("libmp3lame")
      .audioBitrate(128)
      .format("mp3")
      .on("error", (err) => {
        fs.unlinkSync(media);
        fs.unlinkSync(ran);
        setReply(`Err: ${err.message}`);
      })
      .on("end", async () => {
        fs.unlinkSync(media);

        let buffer453 = fs.readFileSync(ran);

        await client.upload(buffer453, {}, { filename: q }, {}).then((data) => {
          db.data.audio[q] = {
            name: data._file.name,
            id: data.handle,
            size: FileSize(data._file.size),
            link: data.url,
          };
        });

let teks = `Berhasil menambahkan audio
ke dalam database dengan nama *${q}*`;
        await setReply(teks);

        fs.unlinkSync(ran);
      })
      .save(ran);
  } else {
    setReply("Reply audio/videonya");
  }
};

handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addvn"];
handler.owner = true;
export default handler;
