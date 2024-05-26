
import fetch from "node-fetch";
import fs from "fs-extra";
import { miftah } from '../../lib/restApi.js'
const {  TelegraPh} =
  await import(`../../lib/uploader.js?v=${Date.now()}`).catch((err) =>
    console.log(err)
  );
let handler = async (m, { q,conn, command, __dirname }) => {
  let p = m.quoted ? m.quoted : m;
  let mime = (p.msg || p).mimetype || "";

  if (/image|video|audio/.test(mime)) {
    await m.reply(wait);
    let media = await p.download(true);
    log(media)
    let ous = await TelegraPh(media);
    await m.reply(ous);
    fs.unlinkSync(media);
  } else if(q.startsWith('https://www.instagram.com')){
    ///log(q)
    
    const data = new miftah()
    let res = await data.instagram(q)

// Contoh penggunaan:
const url = res.data[0].url
log(url)
const filePath = process.cwd() +'/'+ getRandomFile('.mp4')

// Panggil fungsi untuk menyimpan file dari URL ke sistem file lokal
await saveFileFromURL(url, filePath)
    .then(async () => {
        console.log('File berhasil disimpan:', filePath);

        let ous = await TelegraPh(filePath)
         m.reply(ous);


    })
    .catch(error => {
        console.error('Gagal menyimpan file:', error);
    });
    
  } else m.reply("Reply image/video");
};

handler.help = ["telegraph"];
handler.tags = ["uploader"];
handler.command = ["telegraph",'tgp'];
export default handler;


// Fungsi untuk menyimpan file dari URL ke sistem file lokal
async function saveFileFromURL(url, filePath) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Gagal mengambil file');
      }

      const fileStream = fs.createWriteStream(filePath);
      response.body.pipe(fileStream);

      return new Promise((resolve, reject) => {
          fileStream.on('finish', resolve);
          fileStream.on('error', reject);
      });
  } catch (error) {
      console.error('Gagal menyimpan file:', error);
  }
}