let handler = async (m, { q, isOwner, setReply, command }) => {
  if (!isOwner) return setReply(mess.only.ownerB);
  try {
    if (!db.data.audio[q])
      return setReply("Nama tersebut tidak ada di dalam data base");
    delete db.data.audio[q];
    setReply(`Sukses delete vn ${q}`);
  } catch (err) {
    console.log(err);
    setReply("eror kak");
  }
};
handler.help = ["delvn"];
handler.tags = ["owner"];
handler.command = ["delvn", "dellvn"];
handler.owner = true;
export default handler;
