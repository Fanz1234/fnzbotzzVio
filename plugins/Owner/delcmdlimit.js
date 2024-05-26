import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!q) return setReply(mess.query);
  if (!isOwner) return setReply(mess.only.ownerB);

  if (!_data.checkDataId("limit", q, DataId))
    return setReply("Command tidak ada di database");
  _data.removeDataId("limit", q, DataId);
  setReply(`Berhasil menghapus ${q} ke daftar fitur limit`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["delcmdlimit"];
export default handler;
