import _data from "../../lib/totalcmd.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!q) return setReply(mess.query);
  if (!isOwner) return setReply(mess.only.ownerB);

  if (!_data.checkDataId("commands", q, DataId))
    return setReply(`User bukan owner`);
  _data.removeDataId("commands", q, DataId);
  setReply(`Berhasil menghapus ${q} ke daftar fitur owner`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["delcmdowner"];
export default handler;
