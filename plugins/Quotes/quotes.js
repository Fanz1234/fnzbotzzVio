import fs from 'fs-extra'
let handler = async (m, { conn }) => {
  let data = fs.readFileSync("./lib/game/quotes.js");
  let jsonData = JSON.parse(data);
  let randIndex = Math.floor(Math.random() * jsonData.length);
  let randKey = jsonData[randIndex];
  let text = randKey.quotes;
  conn.sendMessage(m.chat, { text }, { quoted: m });
};
handler.help = ["no"];
handler.tags = ["random"];
handler.command = ["quotes"];

export default handler;
