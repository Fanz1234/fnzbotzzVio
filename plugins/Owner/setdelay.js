import fs from "fs-extra";
let handler = async (m, { conn, q, setReply }) => {
  let delayRespon = db.data.settings["settingbot"].delay;

  let angka = parseInt(q);

  if (!q) throw "Masukan angka 1 detik = 1000, 5 detik = 5000";
  if (!isNumber(angka)) throw "Masukan angka 1 detik = 1000, 5 detik = 5000";
  db.data.settings["settingbot"].delay = angka;
  setReply(`Berhasil mengubah delay respon ke ${q}`);
};
handler.help = ["setdelay"];
handler.tags = ["owner"];
handler.command = ["setdelay", "setdelayrespon"];
handler.owner = true;

export default handler;
