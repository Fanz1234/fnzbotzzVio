import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs-extra';
const ffmpeg = require('fluent-ffmpeg');

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime || !mime.includes('video')) throw `Video tidak ditemukan`;

  // Mendapatkan file video
  let videoData = await conn.downloadM(q, 'video'); // Simpan sebagai file video sementara

  // Menggunakan ffmpeg untuk meningkatkan resolusi video
  let output = '/absolute/path/to/your/directory/video.mp4'; // Gunakan absolute path
  ffmpeg(videoData)
    .outputOptions('-s', '1280x720') // Ganti resolusi sesuai kebutuhan
    .on('end', async () => {
      // Mengirim video yang telah ditingkatkan resolusinya
      try {
        await conn.sendFile(m.chat, output, '', `🍟 Nih Kak`, m);
      } catch (sendErr) {
        console.error(sendErr);
        m.reply('Terjadi kesalahan saat mengirim file hasil. ' + sendErr);
      }
    })
    .on('error', (err) => {
      console.error(err);
      m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err.message);
    })
    .save(output);
};

handler.command = handler.help = ['hdvid'];
handler.tags = ['tools'];

export default handler;
