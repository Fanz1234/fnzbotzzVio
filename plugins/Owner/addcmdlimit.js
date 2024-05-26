import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (_data.checkDataId("limit", q, DataId))
    return setReply("Command sudah ada di database");
  if (!_data.checkDataName("limit", q, DataId)) {
    await _data.createDataId("limit", DataId);
  }
  _data.addDataId(q, "limit", DataId);
  setReply(`Berhasil menambahkan ${q} ke daftar fitur limit`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addcmdlimit"];
export default handler;
