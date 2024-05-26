let handler = (m) => m;
handler.before = async function (m, { conn }) {
  const isKickarea = m.isGroup ? db.data.chats[m.chat].antiasing : false;

  if (m.isGroup && m.isBotAdmin && isKickarea && !m.itsMe) {
    let member = await m.groupMembers.map((u) => u.id);
    for (let i = 0; i < member.length; i++) {
      if (member[i].slice(0, 2) !== "62") {
        let usersId = await m.groupMembers.find((u) => u.id == member[i]);
        if (!usersId.groupAdmins) {
          await conn.groupParticipantsUpdate(m.chat, [member[i]], "remove");
          await sleep(2000);
        }
      }
    }
  }
};
export default handler;
