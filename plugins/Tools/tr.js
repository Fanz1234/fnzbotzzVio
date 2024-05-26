let handler = async (m, { q, conn, args, prefix, setReply,command }) => {
  let translate = require("translate-google-api")
  let defaultLang = "en";
  let tld = "com";
  let err = `
        Contoh:
        ${prefix + command} <lang> [text]
        ${prefix + command} id your messages
        Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
        `.trim();

  let lang = args[0];
  let text = args.slice(1).join(" ");
  if ((args[0] || "").length !== 2) {
    lang = defaultLang;
    text = args.join(" ");
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  let result;
  try {
    result = await translate(`${text}`, { tld, to: lang });
  } catch (e) {
    result = await translate(`${text}`, { to: defaultLang });
    m.reply(err)
  } finally {
    m.reply(result[0]);
  }
};
handler.help = ["translate"];
handler.tags = ["tools"];
handler.command = ["tr", "translate"];

export default handler;
