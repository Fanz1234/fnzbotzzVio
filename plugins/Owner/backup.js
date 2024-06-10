let handler = async (m,{ q, conn, isOwner, setReply, args, usedPrefix, command }) => {




    const fs = require('fs');
    const archiver = require('archiver');
    const path = require('path');
    let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
    // Nama file zip yang akan dihasilkan
    const output = fs.createWriteStream(`${botName} ${calender}.zip`);
    const nameFile = `${botName} ${calender}.zip`
    const archive = archiver('zip', {
        zlib: { level: 9 } // Set level kompresi
    });
    
    m.reply(wait)
    // Tangani event selesai
    output.on('close', async function() {
        m.reply(`File zip berhasil dibuat\nTotal ${await FileSize(archive.pointer())}`);
          await sleep(2000)
    await conn.sendMessage(m.sender, {document:fs.readFileSync(nameFile) , jpegThumbnail,mimetype: "application/zip", fileName: nameFile}, {quoted: m})
    await sleep(2000)  
    await fs.unlinkSync(nameFile)
    });
    
    // Tangani error
    archive.on('error', function(err) {
        throw err;
    });
    
    // Pipe output dari archive ke file
    archive.pipe(output);
    
    // Function untuk menambahkan file dan folder ke archive
    function addFilesAndFolders(dirPath, archive) {
        const items = fs.readdirSync(dirPath);
        items.forEach((item) => {
            const fullPath = path.join(dirPath, item);
            let kecuali = ['node_modules' ,'.git','package-lock.json','.heroku','.profile.d','vendor','.npm']
            if (fs.statSync(fullPath).isDirectory()) {
                if (!kecuali.includes(item)) {
                    // Tambahkan folder dan isinya
                    archive.directory(fullPath, item);
                }
            } else if (!fullPath.endsWith('.xml')) {
                // Tambahkan file kecuali file .xml
                archive.file(fullPath, { name: item });
            }
        });
    }
    
    // Tambahkan semua file dan folder dari direktori project kecuali node_modules
    addFilesAndFolders('.', archive);
    
    // Finalisasi archive
    await archive.finalize();
  
    



  };
  
  handler.command = ["backup"];
  handler.owner = true;
  export default handler;
  


  



  async function FileSize(number) {
    var SI_POSTFIXES = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier == 0) return number + " B"; // Tambahkan "B" untuk byte
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    var formatted = scaled.toFixed(1).replace('.', ',') + ""; // Ubah menjadi satu tempat desimal dan ganti titik dengan koma
    if (/\.0$/.test(formatted))
        formatted = formatted.substr(0, formatted.length - 2);
    return formatted + " " + postfix;
};









