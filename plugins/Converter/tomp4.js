
import fs from "fs-extra";
import { exec } from "child_process"; // Keep exec for imagemagick conversion
import ffmpeg from 'fluent-ffmpeg';
import fetch  from 'node-fetch'
import FormData  from 'form-data'
//import { JSDOM }  from 'jsdom'
let handler = async (m, { conn, setReply }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (isQuotedSticker) {
    setReply(mess.wait);
    let file = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let outGif = `./${getRandomFile(".gif")}`;
    let outMp4 = `./${getRandomFile(".mp4")}`;

    // Convert webp to gif using imagemagick
    exec(`convert ${file} ${outGif}`, (err) => {
      if (err) {
        console.log(err);
        return setReply(`${err}`);
      }

      // Convert gif to mp4 using fluent-ffmpeg
      ffmpeg(outGif)
        .videoCodec('libx264')
        .outputOptions([
          '-vf', 'crop=trunc(iw/2)*2:trunc(ih/2)*2',
          '-b:v', '0',
          '-crf', '25',
          '-pix_fmt', 'yuv420p'
        ])
        .saveToFile(outMp4)
        .on('error', (err) => {
          console.error(err);
          return setReply(`${err}`);
        })
        .on('end', async () => {
          await conn.sendMessage(
            m.chat,
            { video: fs.readFileSync(outMp4), caption: "Nih" },
            { quoted: m }
          );
          fs.unlinkSync(outGif);
          fs.unlinkSync(outMp4);
          fs.unlinkSync(file);
        });
    });
  }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["tomp4"];
export default handler;




async function webp2mp4(source) {
  let form = new FormData
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  form.append('new-image-url', isUrl ? source : '')
  form.append('new-image', isUrl ? '' : source, 'image.webp')
  let res = await fetch('https://s6.ezgif.com/webp-to-mp4', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > video > source').src, res2.url).toString()
}
