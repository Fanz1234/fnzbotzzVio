let handler = async (m, { q, conn, isOwner, setReply }) => {
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
  const Input = m.mentionByTag[0]
    ? m.mentionByTag[0]
    : m.mentionByReply
    ? m.mentionByReply
    : q
    ? numberQuery
    : false;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (Input && !q.includes("chat.whatsapp.com/")) {
    if (db.data.users[Input].premiumTime == 0)
      return setReply(
        "Maap kak nomer tersebut tidak terdaftar sebagai user premium"
      );
    if (db.data.users[Input].premiumTime == undefined)
      return setReply("Maap kak user tersebut tidak ada di database");
    db.data.users[Input].premiumTime = 0;
    setReply(`Succes delete premium ${Input.split("@")[0]}`);
  } else if (!m.isGroup && q.includes("chat.whatsapp.com/")) {
    let query = q;
    const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
    let code = query.match(rex1);
    if (code === null) return setReply("No invite url detected.");
    code = code[0].replace("chat.whatsapp.com/", "");
    let { id, subject, creator, creation, desc, descId } = await conn
      .groupGetInviteInfo(code)
      .catch(async () => {
        return setReply("Invalid invite url.");
      });
    const metaData = await conn.groupMetadata(id);
    const members = metaData.participants;
    const anune = members.filter(
      (u) =>
        (u.admin !== "admin" && u.id !== botNumber) ||
        (u.admin !== "superadmin" && u.id !== botNumber)
    );
    let teks = `_*SUCCESS DELETE PREMIUM*_
          *Group Name:* ${subject}\n*Group Id:* ${id}${
      creator ? `\n*Creator:* ${creator.split("@")[0]}` : ""
    }
          *Create At:* ${new Date(creation * 1000).toLocaleString()}\n\n`;

    for (let i of members) {
      if (
        (i.admin !== "admin" && i.id !== botNumber) ||
        (i.admin == "superadmin" && i.id !== botNumber)
      ) {
        let namanye = await conn.getName(i.id);
        let nomernya = i.id;
        db.data.users[nomernya].premiumTime = 0;
        teks += `🆔 *Name :* ${namanye}
          📛 *Number:* ${nomernya.split("@")[0]}\n\n`;
      }
    }
    teks += `*Total : ${anune.length} admin*`;
    return setReply(teks);
  } else setReply("Tag/Reply/Input nomer target");
};
handler.help = ["delprem reply nomer"];
handler.tags = ["owner"];
handler.command = ["delprem", "delpremium"];
handler.owner = true;
export default handler;
