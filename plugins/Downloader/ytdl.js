import fetch from "node-fetch";

let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  if (!q) return m.reply("Masukan link youtube");
  m.reply(wait);
  let api_y2mate = await fetch(
    `https://skizo.tech/api/y2mate?url=${q}O&apikey=officialdittaz`
  );
  let tech = await api_y2mate.json();
  let url = tech.video["720p"]
    ? tech.video["720p"]
    : tech.video["3600p"]
    ? tech.video["3600p"]
    : tech.video["240p"]
    ? tech.video["240p"]
    : null;
  if (!url) return "can't download video now, try again later";
  let resp = await fetch(url.url);
  if (/text|json/.test(resp.headers.get("content-type")))
    throw await resp.text();
  let y2mate_bf = await resp.buffer();

  conn.sendFile(m.chat, y2mate_bf, "", `*${tech.title}*`, m);
};
handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["yt", "ytdl"];

export default handler;







  




