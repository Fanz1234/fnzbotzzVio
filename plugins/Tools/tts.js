import fs from 'fs-extra'
let handler = async (m, { q, setReply, args, prefix, command }) => {
  if (!q) return setReply("Contoh tts id halo");
  const gtts = require("node-gtts");
  function tts(text, lang = "id") {
    // console.log(lang, text)
    return new Promise((resolve, reject) => {
      try {
        let tts = gtts(lang);
        let filePath = 1 * new Date() + ".mp3";
        tts.save(filePath, text, () => {
          resolve(fs.readFileSync(filePath));
          fs.unlinkSync(filePath);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  const defaultLang = "id";

  let lang = args[0];
  let text = args.slice(1).join(" ");
  if ((args[0] || "").length !== 2) {
    lang = defaultLang;
    text = args.join(" ");
  }
  if (!text && m.quoted?.text) text = m.quoted.text;

  let ras;
  try {
    ras = await tts(text, lang);
  } catch (e) {
    m.reply(e + "");
    text = args.join(" ");
    if (!text) setReply(`Use example ${prefix}${command} en hello world`);
    ras = await tts(text, defaultLang);
  } finally {
    if (ras) conn.sendMedia(m.chat, ras, m, { caption: "Nih" });
    //conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
  }
};
handler.help = ["npmsearch"];
handler.tags = ["tools"];
handler.command = ["tts"]

export default handler;
