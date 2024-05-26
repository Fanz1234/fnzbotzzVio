let handler = async (m, { conn, q, setReply, command, isOwner,prefix }) => {
  if (!isOwner && !m.itsMe) return setReply("Khusus Owner");
  if (!q)
    return setReply(
      `Kirim perintah ${prefix + command} nama\n\nContoh : ${command} Paijo`
    );
  await conn.updateProfileStatus(q);
  await setReply(`Berhasil mengganti status bio ke *${q}*`);
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["setbio"];
handler.owner = true;

export default handler;
