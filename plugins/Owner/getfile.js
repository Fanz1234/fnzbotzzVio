import fs from "fs-extra";

let handler = async (m, { q, conn, setReply }) => {
  if (!q)
    return setReply(
      "Mau cari file apa? contoh getfile group.js, tambahkan -text di bagian akhir untuk mengirim dengan teks"
    );
  let format = q.split(".")[1];
  if (!format) return setReply("Tipe file js atau json?");
  format.replace("-text", "");
  let text = q.endsWith("-text");
  let mimetype =
    format == "js"
      ? "text/javascript"
      : format == "json"
      ? "application/json"
      : "application/octet-stream";
  let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
  setReply("Getting File...");
  await sleep(1000);
  let teks = q.replace("-text", "").replace(" ", "");

  async function getFolder() {
    let folders = fs
      .readdirSync(process.cwd(), { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    let arrayBaru = await folders.filter(
      (kata) =>
        !kata.startsWith("node_modules") &&
        !kata.startsWith(".cache") &&
        !kata.startsWith(".lesson") &&
        !kata.startsWith(session)
    );
    return arrayBaru;
  }
  let ada = false;
  let dir = await fs.existsSync(`./${teks}`);
  if (dir && text) {
    ada = true;
    m.reply(require("fs").readFileSync(`./${teks}`, "utf-8"));
  } else if (dir) {
    ada = true;
    conn.sendMessage(
      m.chat,
      {
        document: fs.readFileSync(`./${teks}`),
        fileName: teks,
        mimetype,
        jpegThumbnail,
      },
      { quoted: m }
    );
  }
  let folders = await getFolder();

  for (let i of folders) {
    let data = await fs.existsSync(`./${i}/${teks}`);
    if (data) {
      let file = fs.readFileSync(`./${i}/${teks}`);
      if (format == "mp4") {
        ada = true;
        conn.sendMessage(m.chat, { video: file }, { quoted: m });
      } else if (format == "jpg" || format == "jpeg") {
        ada = true;
        conn.sendMessage(m.chat, { image: file }, { quoted: m });
      } else {
        if (text) {
          ada = true;
          m.reply(require("fs").readFileSync(`./${i}/${teks}`, "utf-8"));
        } else {
          ada = true;
          conn.sendMessage(
            m.chat,
            { document: file, fileName: teks, mimetype, jpegThumbnail },
            { quoted: m }
          );
        }
      }
    }
  } //akhir dari folders
  if (!ada) setReply("File tidak di temukan");
};
handler.help = ["getfile"];
handler.tags = ["internet"];
handler.command = /^(getfile|gfi)$/i;
handler.owner = true;
export default handler;
