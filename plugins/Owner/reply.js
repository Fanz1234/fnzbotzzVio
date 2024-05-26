let handler = async (m, { text, q, conn, isOwner, setReply }) => {
    if (!isOwner && !m.itsMe) return setReply(mess.only.owner);

  };
  handler.help = ["resest"];
  handler.tags = ["check"];
  handler.command = /^(reply|jawab)$/i;
  handler.owner = true;
  export default handler;
  