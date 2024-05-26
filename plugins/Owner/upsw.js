import fetch from "node-fetch";
import fs from "fs";

const commandList = ["upsw"];

const mimeAudio = "audio/mpeg";
const mimeVideo = "video/mp4";
const mimeImage = "image/jpeg";

let handler = async (m, { conn, command, args }) => {
  let teks;
  if (args.length >= 1) {
    teks = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    teks = m.quoted.text;
  }

  if (m.quoted && m.quoted.mtype) {
    const mtype = m.quoted.mtype;
    let type;

    if (mtype === "audioMessage") {
      type = "vn";
    } else if (mtype === "videoMessage") {
      type = "vid";
    } else if (mtype === "imageMessage") {
      type = "img";
    } else if (mtype === "conversation") {
      type = "txt";
    } else {
      throw "❌ Media type tidak valid!";
    }

    const doc = {};

    if (type === "vn") {
      let media = await conn.downloadAndSaveMediaMessage(m.quoted, makeid(5));
      doc.mimetype = mimeAudio;
      doc.audio = fs.readFileSync(media);
    } else if (type === "vid") {
      let media = await conn.downloadAndSaveMediaMessage(m.quoted, makeid(5));
      doc.mimetype = mimeVideo;
      doc.caption = teks;
      doc.video = fs.readFileSync(media);
    } else if (type === "img") {
      let media = await conn.downloadAndSaveMediaMessage(m.quoted, makeid(5));
      doc.mimetype = mimeImage;
      doc.caption = teks;
      doc.image = fs.readFileSync(media);
    } else if (type === "txt") {
      doc.text = teks;
    }

    await conn
      .sendMessage("status@broadcast", doc, {
        backgroundColor: getRandomHexColor(),
        font: Math.floor(Math.random() * 9),
        statusJidList: Object.keys(global.db.data.users),
      })
      .then((res) => {
        conn.reply(m.chat, `Sukses upload ${type}`, res);
      })
      .catch(() => {
        conn.reply(m.chat, `Gagal upload ${type}`, m);
      });
  } else {
    throw "❌ Tidak ada media yang diberikan!";
  }
};

handler.help = commandList;
handler.tags = ["main"];
handler.owner = true;
handler.rowner = true;
handler.command = commandList;
//new RegExp(`^(${commandList.join('|')})$`, 'i');

export default handler;

async function generateVoice(
  Locale = "id-ID",
  Voice = "id-ID-ArdiNeural",
  Query
) {
  const formData = new FormData();
  formData.append("locale", Locale);
  formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
  formData.append("ip", "46.161.194.33");
  const response = await fetch("https://app.micmonster.com/restapi/create", {
    method: "POST",
    body: formData,
  });
  return Buffer.from(
    ("data:audio/mpeg;base64," + (await response.text())).split(",")[1],
    "base64"
  );
}

function getRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}
