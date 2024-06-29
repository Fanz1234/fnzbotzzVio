import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

let tmpDir = './tmp/';

// Ensure tmpDir exists
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

let handler = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!/image/.test(mime)) throw `Gambarnya??!`;
  try { q = await m.quoted.download(); }
  catch (e) { q = await m.download(); }
  m.reply(wait);
  running(await q).then(vid => conn.sendFile(m.chat, vid, 'run.mp4', null, m));
};

handler.command = ["run"];

export default handler;

function running(img, duration = 10, fps = 60) {
  return new Promise((resolve, reject) => {
    let layers = [
      `color=s=512x512:d=${duration}:r=${fps}[bg]`,
      '[0:v]scale=-2:512[img]',
      `[bg][img]overlay=x='(w+h)*((n/${fps})*-1/${duration})+h'`
    ];

    let n = +new Date() + 'run.jpg';
    let i = path.join(tmpDir, n);
    fs.writeFileSync(i, img);
    console.log(img);
    let o = path.join(tmpDir, n + '.mp4');
    let args = [
      '-y',
      '-i', i,
      '-t', duration.toString(),
      '-filter_complex', layers.join(';'),
      '-pix_fmt', 'yuv420p',
      '-crf', '18',
      o
    ];
    console.log('ffmpeg', ...args);
    spawn('ffmpeg', args, { stdio: 'inherit' })
      .on('error', reject)
      .on('close', () => {
        try {
          fs.unlinkSync(i);
          resolve(fs.readFileSync(o));
          fs.unlinkSync(o);
        } catch (e) {
          reject(e);
        }
      });
  });
}
