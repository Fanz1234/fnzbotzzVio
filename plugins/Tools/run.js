import { spawn } from 'child_process';
//import fs from 'fs';
import axios from 'axios'
import fetch from 'node-fetch'
import fs from 'fs-extra'
import path, { join } from 'path';  // Corrected import syntax for `path.join`

let handler = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!/image/.test(mime)) throw `Gambarnya??!`;
  try { q = await m.quoted.download(); }  // Added `await` for asynchronous download
  catch (e) { q = await m.download(); }   // Added `await` for asynchronous download
  m.reply(wait);
  running(await q).then(vid => conn.sendFile(m.chat, vid, 'run.mp4', wm, m));
};

handler.command = ["run"];

export default handler;

let tmp = path.join('./tmp/');  // Added `;` at the end of statement

function running(img, duration = 10, fps = 60) {
  return new Promise((resolve, reject) => {
    let layers = [
      `color=s=512x512:d=${duration}:r=${fps}[bg]`,
      '[0:v]scale=-2:512[img]',
      `[bg][img]overlay=x='(w+h)*((n/${fps})*-1/${duration})+h'`
    ];

    let n = +new Date() + 'run.jpg';  // Corrected concatenation
    let i = path.join(tmp, n);
    fs.writeFileSync(i, img);
    console.log(img);
    let o = path.join(tmp, n + '.mp4');
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
    //.stderr.on('data', a => console.log(a+''));
  });
}
