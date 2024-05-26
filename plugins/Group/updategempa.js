let handler = async (m, { q, conn, isOwner, setReply }) => {
  let dataGempa = db.data.others["updateGempa"];

  if (m.isGroup) {
    if (q == "on") {
      if (dataGempa.includes(m.chat))
        return setReply("Sudah aktif di group ini");
      dataGempa.push(m.chat);
      setReply(
        `Berhasil menambahkan group ${m.groupName}  kedalam auto update gempa`
      );
    } else if (q == "off") {
      if (!dataGempa.includes(m.chat))
        return setReply("Sudah nonaktif di group ini");
      dataGempa.splice(dataGempa.indexOf(m.chat));
      setReply(
        `Berhasil menonaktifkan group ${m.groupName}  kedalam auto update gempa`
      );
    }
  } else {
    if (!q) return setReply("Masukin idgc");
    if (db.data.others["updateGempa"].includes(m.chat))
      return setReply("Sudah aktif");
    db.data.others["updateGempa"].push(q);
    setReply(`Berhasil menambahkan  ${q}  kedalam auto update gempa`);
  }
};
handler.help = ["updategempa on/off"];
handler.tags = ["admin"];
handler.command = ["updategempa"];
export default handler;
