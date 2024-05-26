import fs from "fs-extra";

let handler = async (m, { q, conn, setReply }) => {
  let lala = JSON.parse(fs.readFileSync("./package.json"));
  let listmodule = Object.keys(lala.dependencies);
  let nono = Object.entries(lala.dependencies);
  let teks = "\n\n––––––『 *LIST MODULE* 』––––––\n\n";
  for (let i of nono) {
    teks += `• ${i[0]}: ${i[1]}\n`;
  }
  teks += `\n*Total ada : ${listmodule.length}*`;
  teks += `\n\n📮 *Note:* ↓
    \n`;
  setReply(teks);
};
handler.help = ["npmlist"];
handler.tags = ["internet"];
handler.command = /^(listnpm|npmlist)$/i;
handler.owner = true;
export default handler;
