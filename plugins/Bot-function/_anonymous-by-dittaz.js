let handler = (m) => m;
handler.before = async function (m, { conn, prefix }) {
  const anonChat = db.data.anonymous;

  //ANONYMOUS CHAT
  const roomChat = Object.values(anonChat).find(
    (room) => [room.a, room.b].includes(m.sender) && room.state == "CHATTING"
  );
  const roomA = Object.values(anonChat).find((room) => room.a == m.sender);
  const roomB = Object.values(anonChat).find((room) => room.b == m.sender);
  const room = Object.values(anonChat).find(
    (room) => room.state == "WAITING" && room.b == ""
  );
  const isCmd = m.body.startsWith(prefix);

  if (roomChat && !isCmd && !m.isGroup && roomChat.b !== "") {
    //let nono = m.quoted.fakeObj? m.quoted.fakeObj : m
    let other = [roomChat.a, roomChat.b].find((user) => user !== m.sender);
    m.copyNForward(other, true);
  }

  if (room && Date.now() >= room.expired) {
    await conn.sendMessage(room.a, {
      text: "Partner tidak di temukan\nKamu telah keluar dari room anonymous",
    });
    anonChat.splice(anonChat.indexOf(room, 1));
  }
};
export default handler;
