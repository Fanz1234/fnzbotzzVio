let handler = async (m, { q, isOwner, setReply }) => {
  let lowFitur = db.data.lowfeature;

  if (!isOwner) return setReply(mess.owner);
  if (!q) return setReply(mess.query);
  if (!lowFitur.includes(q))
    return setReply("Command tersebut tidak ada di database");
  lowFitur.splice(lowFitur.indexOf(q, 1));
  setReply("Succes");
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["dellow"];
export default handler;
