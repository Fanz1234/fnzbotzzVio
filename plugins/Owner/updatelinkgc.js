let handler = async (m, { conn, isOwner, setReply }) => {
  if (!isOwner) return await setReply(mess.only.owner);
 
  setReply(`Updating...`);

  let getGroups = await conn.groupFetchAllParticipating();
  let groups = Object.values(getGroups);
  let gc = groups.filter((u) => !u.isCommunity && !u.isCommunityAnnounce);
  let result = [];

  for (let metadata2 of gc) {
    await sleep(3000);

    result.push(metadata2);

    let id = metadata2.id;
    let groupMetadata =
      (conn.chats[id] || {}).metadata ||
      (await conn.groupMetadata(id).catch((_) => null));
    let groupMembers = groupMetadata.participants;
    let bot = groupMembers.find((u) => conn.decodeJid(u.id) == conn.user.jid);
    let isBotAdmin = (bot && bot.admin == "admin") || false; // Are you Admin?

    if (isBotAdmin) {
      let chat = db.data.chats[metadata2.id];
      let Url = await conn
        .groupInviteCode(metadata2.id)
        .catch((err) => log(err));
      let link = "https://chat.whatsapp.com/" + Url;
      db.data.chats[metadata2.id].linkgc = link;
      let teks = `
Update link berhasil

• Group: ${chat.name} 
• Link: ${link}`

      setReply(teks);
    }

    if (result.length === gc.length) {
      await sleep(2000)
     setReply("Berhasil mengupdate semua link pada group");
  }
  }
};

handler.command = ["updatelinkgc"];
handler.owner = true;
export default handler;
