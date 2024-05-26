import speed from "performance-now";
let handler = async (m, { conn, setReply }) => {
  let teks = "*Sticker list :*\n\n";
  for (let awokwkwk of Object.keys(db.data.sticker)) {
    teks += `- ${awokwkwk}\n`;
  }
  teks += `\n*Total : ${Object.keys(db.data.sticker).length}*`;
  setReply(teks);
};
handler.help = ["others"];
handler.tags = ["spesifikasi"];
handler.command = ["liststik"];
export default handler;
