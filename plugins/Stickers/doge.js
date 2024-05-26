import fetch from "node-fetch";
let handler = async (m, { q, conn, args, setReply, usedPrefix, command }) => {
  setReply(mess.wait);
  await fetch('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
    .then((res) => res.text())
    .then((body) => {
      let tod = body.split("\n");
      let pjr = tod[Math.floor(Math.random() * tod.length)];
      conn.toSticker(m.chat, pjr, m);
    });
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["doge"];

export default handler;
