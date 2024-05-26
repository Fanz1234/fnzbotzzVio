import fs from "fs-extra";
let handler = async (m, { conn, setReply }) => {
  fs.readdir(`./${global.session}`, async function (err, files) {
    if (err) {
      console.log("Unable to scan directory: " + err);
      return setReply("Unable to scan directory: " + err);
    }
    let filteredArray = await files.filter(
      (item) =>
        item.startsWith("pre-key") ||
        item.startsWith("sender-key") ||
        item.startsWith("session-")
    );
    console.log(filteredArray.length);
    let teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`;
    if (filteredArray.length == 0) return setReply(teks);
    m.reply(teks);
    await sleep(2000);
    m.reply("Menghapus file sampah session");
    await filteredArray.forEach(function (file) {
      fs.unlinkSync(`./${global.session}/${file}`);
    });
    await sleep(2000);
    m.reply("Berhasil menghapus semua sampah di folder session");
  });
};
handler.help = ["clearsesi"];
handler.tags = ["owner"];
handler.command = /^(clearsesi)$/i;
handler.owner = true;

export default handler;
