import _time from "../../lib/grouptime.js";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  const setTime = db.data.others["setTime"];

  if (!m.isGroup) return setReply(mess.only.group);
  //if(!isGroupAdmins) return setReply(mess.only.admin)
  if (!q) return setReply("Masukan angka jam, contoh 23:00/23.00");
  if(!q.includes(".")) return setReply('Masukan angka jam, contoh 23.00')
  let waktu = q.replace(".", ":");
  _time.open(m.groupName, m.from, waktu, setTime);
  setReply(`Berhasil mensetting waktu group di buka setiap jam ${q}`);
};

handler.tags = ["admin"];
handler.command = ["setopen"];
handler.group = true;
handler.admin = true;
export default handler;
