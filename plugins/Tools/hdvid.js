import axios from 'axios';
import fetch from "node-fetch";
import fs from 'fs-extra';
const ffmpeg = require('fluent-ffmpeg');

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw `Video tidak ditemukan`;

  // Mendapatkan file video
  let videoData = await conn.downloadM(q, 'video'); // Simpan sebagai file video sementara

  // Menggunakan ffmpeg untuk meningkatkan resolusi video
  let tmpDir = './tmp/'; // Temporary directory for storing the processed video
  ffmpeg(videoData)
    .outputOptions('-s', '1280x720') // Ganti resolusi sesuai kebutuhan, contoh disini menggunakan 1280x720
    .save(tmpDir + 'output.mp4') // Save the processed video in the temporary directory with a specific name
    .on('end', () => {
      // Mengirim video yang telah ditingkatkan resolusinya
      conn.sendFile(m.chat, tmpDir + 'output.mp4', '', `🍟 Nih Kak`, m)
        .then(() => {
          // Optional: Clean up the temporary file after sending
          fs.unlinkSync(tmpDir + 'output.mp4');
        })
        .catch((err) => {
          console.error('Failed to send file:', err);
        });
    })
    .on('error', (err) => {
      console.error(err);
      m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err);
    });
};

handler.command = handler.help = ["hdvid"];
handler.tags = ["tools"];

export default handler;
