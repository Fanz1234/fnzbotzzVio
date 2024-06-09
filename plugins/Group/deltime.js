import _time from "../../lib/grouptime.js";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  const setTime = db.data.others["setTime"];

  if (!m.isGroup) return setReply(mess.only.group);

  _time.del(m.from, setTime);
  setReply("Succes");
};

handler.tags = ["admin"];
handler.command = ["deltime", "delltime"];
handler.group = true;
handler.admin = true;
export default handler;
