import fetch from 'node-fetch';
import fs from 'fs';
let handler = async (m, { conn, q, args, setReply, usedPrefix, command }) => {
if(!m.quoted.text.includes('https://raw.githubusercontent.com')) throw 'Masukan link https://raw.githubusercontent.com'   
if(!q) throw 'contoh .installplugins search/lirik.js'
if(!m.quoted || m.quoted && !m.quoted.text) throw 'Reply link nya'
    
    const url = m.quoted.text
    const destination = `./plugins/${toFirstCase(q)}`
    log(destination)
    
    async function downloadFile(url, destination) {
      const response = await fetch(url);
      const fileStream = fs.createWriteStream(destination);
    
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", (err) => {
          reject(err);
        });
        fileStream.on("finish", function() {
          resolve();
        });
      });
    
      console.log('File downloaded successfully.');
      m.reply(`File telah tersimpan di folder ${destination}`)
    }
    
    downloadFile(url, destination);


  };

  handler.command = ["installplugins","pluginsinstall",'installplugin','ip'];
  handler.owner = true;
  
  export default handler;
  