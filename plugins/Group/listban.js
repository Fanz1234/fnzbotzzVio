import _ban from "../../lib/banned.js";

let handler = async (m, { isOwner, setReply, q }) => {
  const ban = db.data.banned;

  let banya = `*List Banned*\nJumlah : ${ban.length}\n\n`;
  ban.map(function (e, i) {
    banya +=
      i +
      1 +
      `. Nomer : wa.me/${e.id}\n└▸ Tanggal : ${e.date}\n└▸ Alasan : ${e.reason} \n\n`;
  });
  setReply(banya);
};
handler.help = ["repy/tag target"];
handler.tags = ["group"];
handler.command = ["listban", "banlist"];
export default handler;
