let handler = async (m, { conn, q,args, setReply }) => {
  const isUrl = (url) => {
    return url.match(
      new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
        "gi"
      )
    );
  };

  if (!q) return setReply("Masukan Link");
  if (!isUrl(args[0]) && !args[0].includes("www.")) return m.reply("Link error");
  let Url = `https://api.apiflash.com/v1/urltoimage?access_key=${apiflash}&wait_until=page_loaded&url=${q}`;
  conn.sendMessage(
    m.chat,
    { image: { url: Url }, caption: "Nih" },
    { quoted: m }
  );
};

handler.tags = ["info"];
handler.command = ["ss"];
export default handler;
