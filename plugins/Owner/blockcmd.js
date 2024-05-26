import _blockcmd from "../../lib/blockcmd.js";
let handler = async (m, { conn, q, setReply, isOwner, prefix }) => {
  const listcmdblock = db.data.blockcmd;
  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q)
    return setReply(
      `Textnya mana cih\n\nContoh : ${prefix}blockcmd menu\nGituuuuuuu`
    );
  if (_blockcmd.check(q, listcmdblock))
    return setReply(`Command tersebut sudah ada di database`);
  _blockcmd.add(q, listcmdblock);
  setReply(
`Berhasil memblokir command 「 *${q}* 」\nsilakan ketik ${prefix}listblockcmd untuk melihat\ndaftar command yang telah di block`
  );
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ['blockcmd']
handler.owner = true;

export default handler;
