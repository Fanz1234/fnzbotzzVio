import { fetchJson } from "../../lib/myfunc.js";
let handler = async (m, { q, conn, args, setReply, prefix, command }) => {
  let [emoji1, emoji2] = q.split`+`;
  if (!emoji1) return setReply(`Example : ${prefix + command} 😊 + 😂`);
  if (!emoji2) return setReply(`Example : ${prefix + command} 😊 + 😂`);
  let anu = await fetchJson(
    `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
      emoji1
    )}_${encodeURIComponent(emoji2)}`
  );
  for (let res of anu.results) {
    conn.toSticker(m.chat, res.url, m);
  }
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["emojimix"];

export default handler;
