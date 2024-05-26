 

let handler = async (m, { q, isOwner, setReply, command }) => {
  if (!m.key.fromMe & !isOwner) return setReply("Only owner");
  if (!q) return setReply("Masukan query");
  try {
    if (!db.data.sticker[q])
      return setReply("Nama tersebut tidak ada di dalam data base");
    delete db.data.sticker[q];
    setReply(`Succes delete sticker ${q}!`);
  } catch (err) {
    console.log(err);
    setReply(`Gagal delete sticker ${q}!`);
  }
};
handler.command = ["delstik", "delstick", "delsticker"];
handler.owner = true;
handler.owner = true;
export default handler;
