
const { uploader } = require('../../lib/uploader');
  const { exec } = require('child_process');

let handler = async (m, { conn, command, usedPrefix }) => {
	
const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) return m.reply(`Mana vidionya bang?`);
  m.reply(mess.wait);
  const media = await conn.downloadAndSaveMediaMessage(q);
  const url = await TelegraPh(media);
  const output = 'output.mp4'; 
  
  exec(`ffmpeg -i ${media} -vf "hqdn3d=1.5:1.5:6:6,nlmeans=p=7:s=7,vaguedenoiser=threshold=2.0:method=soft:nsteps=5,deband,atadenoise,unsharp=3:3:0.6,eq=brightness=0.05:contrast=1.2:saturation=1.1" -vcodec libx264 -profile:v main -level 4.1 -preset veryslow -crf 18 -x264-params ref=4 -acodec copy -movflags +faststart ${output}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    conn.sendMessage(m.chat, { caption: `_Success To Enhanced Video_`, video: { url: output }}, {quoted: m});
  });
  
      fs.unlinkSync(output);
      fs.unlinkSync(media);
}
handler.help = ["hdvid2"];
handler.tags = ["tools"];
handler.command = /^hdvid2$/i;

export default handler;
