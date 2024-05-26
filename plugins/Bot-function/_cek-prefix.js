import _spam from "../../lib/antispam.js";
let handler = (m) => m;
handler.before = async function (m, { conn, thePrefix }) {
  //jika ada yg cek prefix bot akan merespon
  const AntiSpam = db.data.antispam;
  if (m.budy.includes("ekprefix") || m.budy.includes("ek prefix")) {
    if (_spam.check("NotCase", m.senderNumber, AntiSpam)) return;
    _spam.add("NotCase", m.senderNumber, "10s", AntiSpam);
    conn.sendMessage(
      m.chat,
      { text: `Baik kak untuk prefix saat ini adalah : 「  ${thePrefix}  」` },
      { quoted: m }
    );
  }
};
export default handler;
