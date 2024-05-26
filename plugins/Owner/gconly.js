let handler = async (m, { text, q, conn, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const gcOnly = db.data.settings["settingbot"].gcOnly;
  if (q == "on") {
    if (gcOnly) throw "Sudah on";
    db.data.settings["settingbot"].gcOnly = true;
    setReply("Berhasil  mensetting bot ke group only");
  } else if (q == "off") {
    if (gcOnly) throw "Sudah off";
    db.data.settings["settingbot"].gcOnly = false;
    setReply("Berhasil  menonaktifkan group only");
  }
};

handler.command = ["gconly", "grouponly"];
handler.owner = true;
export default handler;
