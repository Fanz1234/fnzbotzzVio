let handler = async (m, { conn, isOwner, q, setReply, command, text }) => {
  var publik = db.data.settings["settingbot"].publik;
  if (!isOwner) return setReply(mess.only.ownerB);
  if (publik) return setReply("Udah di mode publick kak");
  db.data.settings["settingbot"].publik = true;
  let bab = `Mode public aktif kak`;
  setReply(bab);
};

handler.command = ["publik", "public"];
export default handler;
