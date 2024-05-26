let handler = (m) => m;

handler.before = async function (m, { conn }) {
  const ownerNumber = [
    `${nomerOwner}@s.whatsapp.net`,
    `${nomerOwner2}@s.whatsapp.net`,
    `6285156137902@s.whatsapp.net`,
    `${conn.user.jid}`,
  ];

  //ANTI LINK GROUP setReply
  const isAntilinkGc = m.isGroup ? db.data.chats[m.chat].antilinkgc : false;
  if (m.isGroup && isAntilinkGc && m.budy.includes(`chat.whatsapp.com`)) {
    if (m.isAdmin) return m.reply("Alah sia admin grup mah bebas yekan :v");
    if (ownerNumber.includes(m.sender))
      return m.reply("Alah sia owner bot mah bebas yekan :v");
    let linkgc = await conn.groupInviteCode(m.chat);
    if (m.budy.includes(`${linkgc}`))
      return m.reply(
        "Wuanjir kirain link grup lain, huh hampir aja kena kick 😆"
      );
    if (m.budy.includes("zin admin") || m.budy.includes("zinmin"))
      return m.reply("Izin Admin diterima");

    await sleep(1500);
    if (m.isBotAdmin) await conn.sendMessage(m.chat, { delete: m.key });



    /*
    await conn
      .groupParticipantsUpdate(m.chat, [m.sender], "remove")
      .catch((e) => {
        setReply(`BOT HARUS JADI ADMIN`);
      })
      */
  }
};
export default handler;
