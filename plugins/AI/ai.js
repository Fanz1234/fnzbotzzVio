import fetch from "node-fetch";
import axios from "axios";

let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  if (!q) return m.reply("Mau ngomong apa?");
  try {
    const url = `https://api.maher-zubair.tech/ai/chatgpt?q=${q}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        conn.sendMessage(m.chat, { text: data.result }, { quoted: m });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (Error) {
    Log(Error.toString());
  }
};
handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["ai"];

export default handler;
