import path from "path";
import fs from "fs-extra";
let handler = async (m, { q, isOwner, setReply, command }) => {
  if (!isOwner) return setReply(mess.only.ownerB);

  let directoryPath = path.join();
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      console.log("Unable to scan directory: " + err);
      return setReply("Unable to scan directory: " + err);
    }
    let filteredArray = await files.filter(
      (item) =>
        item.endsWith("gif") ||
        item.endsWith("png") ||
        item.endsWith("mp3") ||
        item.endsWith("mp4") ||
        item.endsWith("jpg") ||
        item.endsWith("webp") ||
        item.endsWith("webm")
    );
    console.log(filteredArray.length);
    let teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`;
    if (filteredArray.length == 0) return setReply(teks);
    filteredArray.map(function (e, i) {
      teks += i + 1 + `. ${e}\n`;
    });
    setReply(teks);
    await sleep(2000);
    setReply("Menghapus file sampah...");
    await filteredArray.forEach(function (file) {
      fs.unlinkSync(file);
    });
    await sleep(2000);
    setReply("Berhasil menghapus semua sampah");
  });
};

handler.tags = ["owner"];
handler.command = ["delsampah"];
handler.owner = true;
export default handler;
