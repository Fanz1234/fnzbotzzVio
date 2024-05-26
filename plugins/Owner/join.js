let handler = async (m, { text, q, conn, setReply, isOwner }) => {
  if (!isOwner) return setReply(mess.only.owner);
  let link = q.startsWith("http");
  if (!link) return setReply(`Kirim perintah ${command} _linkgrup_`);
  let ano = q.split("https://chat.whatsapp.com/")[1];
  await conn.groupAcceptInvite(ano);
  setReply("Sukses join group");
};

handler.command = ["join"];
handler.owner = true;
export default handler;
