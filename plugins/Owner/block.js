let handler = async (m, { conn, q, setReply, isOwner }) => {
  if (!isOwner) return setReply(mess.only.ownerB);
  if (m.isGroup) {
    if (m.users) {
      await conn.updateBlockStatus(m.users, "block");
      setReply(`Sukses block user`);
    } else {
      setReply(
        "Silakan reply pesan atau tag atau input nomer yang mau di block"
      );
    }
  } else if (!m.isGroup) {
    if (q) {
      var woke =
        q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
      if (woke.startsWith("08")) return setReply("Awali nomer dengan 62");
      if (!woke.startsWith("62"))
        return setReply(
          "Silakan reply pesan atau tag atau input nomer yang mau di block"
        );
      await conn.updateBlockStatus(woke, "block");
    } else if (!q) {
      setReply("Masukan nomer yang ingin di block");
    }
    setReply(`Berhasil Block user ${woke.split("@")[0]}`);
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = /^(block)$/i;
handler.owner = true;
handler.group = false;

export default handler;
