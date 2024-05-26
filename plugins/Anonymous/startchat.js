let handler = async (m, { conn, q, usedPrefix, setReply, command }) => {
  const anonChat = db.data.anonymous;
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
  const Input = m.mentionByTag[0]
    ? m.mentionByTag[0]
    : m.mentionByReply
    ? m.mentionByReply
    : q
    ? numberQuery
    : false;

  //ANONYMOUS CHAT
  const roomChat = Object.values(anonChat).find(
    (room) => [room.a, room.b].includes(m.sender) && room.state == "CHATTING"
  );
  const roomA = Object.values(anonChat).find((room) => room.a == m.sender);
  const roomB = Object.values(anonChat).find((room) => room.b == m.sender);
  const room = Object.values(anonChat).find(
    (room) => room.state == "WAITING" && room.b == ""
  );

  if (m.isGroup) return setReply("Fitur Tidak Dapat Digunakan Di Dalam Group!");
  if (!q) return setReply("Masukan nomer target yang mau di chat");
  if (roomA || roomB)
    return setReply(
      "Kamu masih berada di dalam room anonymous,  ketik keluar untuk keluar dari room anonymous mu"
    );
  let id = +new Date();
  const obj = {
    id,
    a: m.sender,
    b: Input,
    state: "CHATTING",
    expired: "INFINITY",
  };

  anonChat.push(obj);

  setReply(
    `Kamu telah membuat room anonymous\nDan menjadikan ${Input} sebagai partner mu\nSekarang kamu bisa mengirim pesan`
  );
};
handler.tags = ["anonymous"];
handler.help = ["menfess"].map((v) => v + " <nomor>|<nama>|<pesan>");
handler.command = ['startchat']
handler.private = true;

export default handler;
