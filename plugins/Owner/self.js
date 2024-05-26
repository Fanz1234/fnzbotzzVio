let handler = async (m, { conn, isOwner, q, setReply, command, text }) => {
  var publik = db.data.settings["settingbot"].publik;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (publik == false) return setReply("Udah di mode self kak");
  db.data.settings["settingbot"].publik = false;
  let breh = `Mode self aktif kak`;
  setReply(breh);
};

handler.command = ["self"];
export default handler;
