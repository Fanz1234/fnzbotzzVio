import fetch from "node-fetch";
import fs from "fs-extra";
import yts from "yt-search";
import ytdl from "ytdl-core";

let handler = async (m, { q, conn, args, usedPrefix, setReply, command }) => {
  //DOWNLOAD MP4
  const downloadMp4 = async (Link) => {
    try {
      await ytdl.getInfo(Link);
      let mp4File = getRandomFile(".mp4");
      let nana = ytdl(Link)
        .pipe(fs.createWriteStream(mp4File))
        .on("finish", async () => {
          await conn.sendMessage(
            m.chat,
            {
              video: fs.readFileSync(mp4File),
              caption: "Nih!",
              gifPlayback: false,
            },
            { quoted: m }
          );
          fs.unlinkSync(`./${mp4File}`);
        });
    } catch (err) {
      Log(err);
      setReply(`${err}`);
    }
  };

  //DOWNLOAD MP3
  const downloadMp3 = async (Link, name = "Audio", opt = "audio") => {
    try {
      await ytdl.getInfo(Link);
      let mp3File = name == "Audio" ? getRandomFile(".mp3") : name;
      ytdl(Link, { filter: "audioonly" })
        .pipe(fs.createWriteStream(mp3File))
        .on("finish", async () => {
          Log(opt);
          if (opt == "audio")
            await conn.sendMessage(
              m.chat,
              { audio: fs.readFileSync(mp3File), mimetype: "audio/mp4" },
              { quoted: m }
            );
          if (opt == "doc")
            await conn.sendMessage(
              m.chat,
              {
                document: fs.readFileSync(mp3File),
                fileName: name + ".mp3",
                mimetype: "audio/mp4",
              },
              { quoted: m }
            );
          fs.unlinkSync(mp3File);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (!q) return setReply("Masukan link youtube");
  if (q.includes("https://youtube.com/channel/"))
    return setReply("Goblok itu bukan link vidio bangsat");
  setReply("*Scrapping...*");
  let isLinks = args[0].match(
    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  );
  if (isLinks) downloadMp4(q);
};
handler.help = ["downloader"];
handler.tags = ["internet"];
handler.command = ["ytmp4"];

export default handler;
