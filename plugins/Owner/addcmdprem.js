import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (_data.checkDataId("premium", q, DataId))
    return setReply("Command sudah ada di database");
  if (!_data.checkDataName("premium", q, DataId)) {
    await _data.createDataId("premium", DataId);
  }
  _data.addDataId(q, "premium", DataId);
  setReply(`Berhasil menambahkan ${q} ke daftar fitur premium`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addcmdprem"];
export default handler;
