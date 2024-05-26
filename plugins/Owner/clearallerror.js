import _error from "../../lib/totalerror.js";
let handler = async (m, { q, isOwner, setReply }) => {
  const listerror = db.data.listerror;
  if (!isOwner) return setReply(mess.only.ownerB);
  setReply("SukseS clear all error");
  _error.clear(listerror);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["clearallerror"];
export default handler;
