import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (_data.checkDataId("commands", q, DataId))
    return setReply("Sudah ada di database");
  if (!_data.checkDataName("commands", q, DataId)) {
    await _data.createDataId("commands", DataId);
  }
  _data.addDataId(q, "commands", DataId);
  setReply(`Berhasil menambahkan ${q} ke daftar fitur owner`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addcmdowner"];
export default handler;
