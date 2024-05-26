let handler = async (m, { conn, q, args, setReply, usedPrefix, command }) => {
  if (!q) return setReply("Masukan info terbaru");
  let data = global.db.data.others["newinfo"];
  if (data) {
    data.info = q;
    data.lastinfo = +new Date();
    setReply("Berhasil memperbarui info update");
  } else {
    global.db.data.others["newinfo"] = {
      info: q,
      lastinfo: +new Date(),
    };
    setReply("Berhasil memperbarui info update");
  }
};
handler.help = ["delorder <idgc>"];
handler.tags = ["owner"];
handler.command = ["newupdate", "newinfo"];
handler.owner = true;

export default handler;
