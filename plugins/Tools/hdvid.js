const path = require('path');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime || !mime.includes('video')) throw `Video tidak ditemukan`;

  // Temporary directory for storing the processed video
  let tmpDir = path.resolve(__dirname, 'tmp/');
  fs.ensureDirSync(tmpDir); // Ensure tmpDir exists

  try {
    // Mendapatkan file video
    let videoData = await conn.downloadAndSaveMediaMessage(q, 'tmp'); // Simpan sebagai file video sementara

    // Menggunakan ffmpeg untuk meningkatkan resolusi video
    ffmpeg(videoData)
      .outputOptions('-s', '1280x720') // Ganti resolusi sesuai kebutuhan
      .save(path.join(tmpDir, 'output.mp4')) // Save the processed video in the temporary directory
      .on('end', () => {
        // Mengirim video yang telah ditingkatkan resolusinya
        conn.sendFile(m.chat, path.join(tmpDir, 'output.mp4'), '', `🍟 Nih Kak`, m)
          .then(() => {
            // Optional: Clean up the temporary file after sending
            fs.unlinkSync(path.join(tmpDir, 'output.mp4'));
          })
          .catch((err) => {
            console.error('Failed to send file:', err);
          });
      })
      .on('error', (err, stdout, stderr) => {
        console.error('ffmpeg stderr:', stderr);
        console.error('Failed to process video:', err);
        m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err.message);
      });
  } catch (err) {
    console.error('Failed to download video:', err);
    m.reply('Terjadi kesalahan saat mengunduh video. ' + err.message);
  }
};

handler.command = handler.help = ["hdvid"];
handler.tags = ["tools"];

export default handler;
