import toMs from "ms";

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

  if (roomA && roomA.state == "CHATTING") {
    await conn.sendMessage(roomA.b, {
      text: "Partnermu telah meninggalkan room anonymous",
    });
    await setTimeout(() => {
      setReply("Kamu telah keluar dari room anonymous");
      roomA.a = roomA.b;
      roomA.b = "";
      roomA.state = "WAITING";
      roomA.expired = Date.now() + toMs("5m");
    }, 1000);
  } else if (roomA && roomA.state == "WAITING") {
    setReply("Kamu telah keluar dari room anonymous");

    anonChat.splice(anonChat.indexOf(roomA, 1));
  } else if (roomB && roomB.state == "CHATTING") {
    await conn.sendMessage(roomB.a, {
      text: `Partnermu telah meninggalkan room anonymous`,
    });
    setReply(
      "Kamu telah keluar dari room anonymous dan meninggalkan partner mu"
    );

    roomB.b = "";
    roomB.state = "WAITING";
    roomB.expired = Date.now() + toMs("5m");
  } else
    setReply(
      `Kamu sedang tidak berada di room anonymous, tekan button untuk mencari partner`
    );
};
handler.tags = ["anonymous"];
handler.help = ["menfess"].map((v) => v + " <nomor>|<nama>|<pesan>");
handler.command = ["keluar"];
handler.private = true;

export default handler;
