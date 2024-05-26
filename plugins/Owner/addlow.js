let handler = async (m, { q, isOwner, setReply }) => {
  let lowFitur = db.data.lowfeature;

  if (!isOwner) return setReply(mess.owner);
  if (!q) return setReply(mess.query);
  if (lowFitur.includes(q))
    return setReply("Command tersebut sudah ada di database");
  lowFitur.push(q);
  setReply("Succes");
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addlow"];
export default handler;
