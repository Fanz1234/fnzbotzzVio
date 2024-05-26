let handler = async (m, { conn, q, args, setReply, usedPrefix, command }) => {
  const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
  let code = q.match(rex1);
  if (code === null) return setReply("No invite url detected.");
  code = code[0].replace("chat.whatsapp.com/", "");
  let nana = await conn.groupGetInviteInfo(code);
  //console.log(nana)
  let { id, subject, creator, creation,participants, desc, descId } = await conn
    .groupGetInviteInfo(code)
    .catch(async () => {
      return setReply("Invalid invite url.");
    });
    log(participants)
  let text =
    `Subject: ${subject}\nGroupId: ${id}${
      creator ? `\nCreator: ${creator.split("@")[0]}` : ""
    }
        Create At: ${new Date(creation * 1000).toLocaleString()}` +
    `${desc ? `\nDesc: ${desc}\nDescId: ${descId}` : ""}`;
  setReply(text);
};
handler.help = ["delorder <idgc>"];
handler.tags = ["owner"];
handler.command = ["inspect"];
handler.owner = true;

export default handler;
