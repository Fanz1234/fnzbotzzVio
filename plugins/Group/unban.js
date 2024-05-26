import _ban from "../../lib/banned.js";

let handler = async (m, { isOwner, setReply, q }) => {
  const ban = db.data.banned;

  if (!m.isAdmin && !isOwner) return setReply("hanya admin dan owner");
  if (q.startsWith("+")) {
    let woke = q.replace(new RegExp("[()+-/ +/]", "gi"), "");
    if (!_ban.check(woke, ban))
      return setReply("User sudah di unban sebelumnya");
    _ban.del(woke, ban);
    setReply(`Berhasil unbanned ${woke}`);
  } else if (m.users) {
    let Nomer = `${m.users.split("@")[0]}`;
    if (!_ban.check(Nomer, ban))
      return setReply("User sudah di unban sebelumnya");
    _ban.del(Nomer, ban);
    setReply(`Berhasil unbanned ${m.users.split("@")[0]}`);
  } else setReply("Reply/tag/input targetnya");
};
handler.help = ["repy/tag target"];
handler.tags = ["group"];
handler.command = ["unban", "delban", "unbanned"];
export default handler;
