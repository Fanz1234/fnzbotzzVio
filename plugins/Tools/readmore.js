let handler = async (m, { q, conn, args, prefix, setReply, command }) => {
  const more = String.fromCharCode(8206);
  const readmore = more.repeat(4001);
  if (!q.includes("|")) return setReply("Penggunaan teks| teks");
  const text1 = q.substring(0, q.indexOf("|") - 0);
  const text2 = q.substring(q.lastIndexOf("|") + 1);
  setReply(`${text1}${readmore}${text2}`);
};
handler.help = ["tools"];
handler.tags = ["tools"];
handler.command = ["readmore"];

export default handler;
