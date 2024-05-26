import _blockcmd from "../../lib/blockcmd.js";
let handler = async (m, { conn, q, setReply, isOwner, prefix }) => {
  const listcmdblock = db.data.blockcmd;

  try {
    if (!isOwner) return setReply(mess.only.ownerB);
    if (!q) return setReply("Textnya mana cih");
    if (!_blockcmd.check(q, listcmdblock))
      return setReply(`Command tersebut tidak ada di database`);
    _blockcmd.del(q, listcmdblock);
    setReply(`Berhasil unblock command 「 *${q}* 」`);
  } catch (err) {
    setReply("Bjirr error, keknya ada yang error");
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["unblockcmd"];
handler.owner = true;

export default handler;
