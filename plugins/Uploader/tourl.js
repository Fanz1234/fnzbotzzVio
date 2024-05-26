import { unlinkSync } from "fs";
const { FileIo, FileUgu, TelegraPh, AnonFiles, FileDitch, PomF2, Top4top } =
  await import(`../../lib/uploader.js?v=${Date.now()}`).catch((err) =>
    console.log(err)
  );
let handler = async (m, { conn, command, __dirname }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (/image|video|audio/.test(mime) && command == "telegraph") {
    await m.reply(wait);
    let media = await q.download(true);
    let ous = await TelegraPh(media);
    await m.reply(ous);
    unlinkSync(media);
  } else m.reply("Reply image/video");
};

handler.help = ["telegraph"];
handler.tags = ["uploader"];
handler.command = ["tourl"];
export default handler;
