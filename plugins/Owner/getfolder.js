import fs from "fs-extra";
import zip from "zip-local";
 

let handler = async (m, { text, q, conn, setReply }) => {
  if (!q) return setReply("Nama foldernya apa?");
  let mimetype = "application/zip";
  let name = `${q}.zip`;
  let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");

  try {
    let folderExists = await fs.pathExists(`./${q}`);
    if (!folderExists) return setReply("Folder tidak ditemukan");

    setReply(mess.wait);

    zip.zip(`./${q}`, async (err, zipped) => {
      if (err) throw err;

      await zipped.compress(); // Kompresi folder

      await sleep(2000);

      await zipped.save(`./${name}`); // Menyimpan arsip ke disk
      await sleep(2000);
      let file = await fs.readFileSync(`./${name}`);
      await conn.sendMessage(
        m.chat,
        { document: file, fileName: name, mimetype, jpegThumbnail },
        { quoted: m }
      );
      await fs.unlinkSync(`./${name}`);
    });
  } catch (error) {
    console.error(error);
    setReply(`Error: ${error.message}`);
  }
};

handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = /^(getfolder|gfo)$/i;
handler.owner = true;
export default handler;
