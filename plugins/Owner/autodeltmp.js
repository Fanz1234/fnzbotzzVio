let handler = async (
  m,
  { q, conn, isOwner, setReply, args, usedPrefix, command }
) => {
  const settings = global.db.data.settings["settingbot"];
  if (q == "on") {
    if (settings.autoDelTmp) return setReply("Sudah aktif");
    settings.autoDelTmp = true;
    setReply("Berhasil mengaktifkan auto delete file tmp");
  } else if (q == "off") {
    if (!settings.autoDelTmp) return setReply("Sudah nonaktif");
    settings.autoDelTmp = false;
    setReply("Berhasil menonaktifkan auto delete file tmp");
  } else setReply("on/off");
};

handler.command = ["autodeltmp"];
handler.owner = true;
export default handler;
