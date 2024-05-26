import _ban from "../../lib/banned.js";

let handler = async (m, { conn, isOwner, setReply, q }) => {
  const ban = db.data.banned;
  const ownerNumber = [
    `${nomerOwner}@s.whatsapp.net`,
    `${nomerOwner2}@s.whatsapp.net`,
    `6285156137902@s.whatsapp.net`,
    `${conn.user.jid}`,
  ];
  const Tnow = (new Date() / 1000).toFixed(0);
  let alasan = "";
  if (!m.isAdmin && !isOwner) return setReply("hanya admin dan owner");
  if (q.startsWith("+")) {
    let woke = q.replace(new RegExp("[()+-/ +/]", "gi"), "");
    let Name = await conn.getName(woke);
    if (_ban.check(woke, ban)) return setReply("User sudah di ban sebelumnya");
    _ban.add(Name, calender, woke, alasan, ban);
    setReply(`Berhasil banned ${woke}`);
  } else if (m.users) {
    let alasan = m.mentionByReply ? q : m.mentionByTag ? q.split("|")[1] : "";
    if (alasan == undefined) alasan = "Tidak ada";
    let Nomer = `${m.users.split("@")[0]}`;
    if (_ban.check(Nomer, ban)) return setReply("User sudah di ban sebelumnya");
    let Name = await conn.getName(m.users);
    if (ownerNumber.includes(m.users))
      return setReply("Tidak bisa membanned owner");
    _ban.add(Name, calender, Nomer, alasan, ban);
    setReply(`Berhasil banned ${m.users.split("@")[0]}`);
  } else setReply("Reply/tag/input nomer targetnya");
};
handler.help = ["repy/tag target"];
handler.tags = ["group"];
handler.command = ["ban", "banned"];
export default handler;
