import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply, command }) => {
  const DataId = db.data.data;

  if (!_data.checkDataName("owner", q, DataId)) {
    await _data.createDataId("owner", DataId);
  }
  let nana = await DataId.filter((item) => item.name == "owner");
  if (!nana) return setReply("Tidak ada");
  let teks = "List Owner\n";
  let nunu = nana[0].id;
  for (let i of nunu) {
    teks += `- wa.me/${i.split("@")[0]} \n`;
  }
  setReply(teks);
};
handler.command = ["listowner"];
handler.owner = true;
export default handler;
