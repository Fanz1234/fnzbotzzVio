import fs from "fs-extra";
let handler = async (m, { text, q, conn, setReply }) => {
  try {
    let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");

    // Tulis data ke file JSON
    fs.writeFile(
      "mongoDB.json",
      JSON.stringify(db.data, null, 2),
      async (err) => {
        if (err) throw err;
        console.log("Data berhasil disimpan ke mydatabase.json");
        let file = fs.readFileSync(`./mongoDB.json`);
        await conn.sendMessage(
          m.chat,
          {
            document: file,
            fileName: "mongoDB.json",
            mimetype: "application/json",
            jpegThumbnail,
          },
          { quoted: m }
        );
      }
    );
    await sleep(5000);
    fs.unlinkSync("./mongoDB.json");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = ["getmongo", "getmongodb"];
handler.owner = true;
export default handler;
