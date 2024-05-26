let handler = async (m, { conn, q, setReply, isOwner }) => {
  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (q == "nopref" || q == "noprefix") return setReply("Bot ini sudah nopref");
  if (q == "multi") {
    db.data.settings["settingbot"].multi = true;
    setReply("Berhasil mengubah prefix ke multi");
  } else {
    db.data.settings["settingbot"].multi = false;
    db.data.settings["settingbot"].prefix = q;
    setReply(`Berhasil mengubah prefix ke ${q}`);
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["setprefix"];

export default handler;
