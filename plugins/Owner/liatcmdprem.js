import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!_data.checkDataName("premium", q, DataId)) {
    await _data.createDataId("premium", DataId);
  }
  let nana = await DataId.filter((item) => item.name == "premium");
  let teks = "List Command For Premium User\n\n";
  let nunu = nana[0].id;
  for (let i of nunu) {
    teks += `• ${toFirstCase(i)}\n`;
  }
  teks += `\n• Total: ${nunu.length}\n`;
  setReply(teks);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["listcmdprem"];
export default handler;
