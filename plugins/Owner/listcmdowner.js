import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  let nana = await DataId.filter((item) => item.name == "commands");
  let teks = "List Commands For Owner\n";
  let nunu = nana[0].id;
  for (let i of nunu) {
    teks += `. ${i}\n`;
  }
  setReply(teks);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["listcmdowner"];
export default handler;
