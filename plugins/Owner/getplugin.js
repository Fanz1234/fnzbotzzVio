import { readdirSync, statSync } from 'fs';
import { join, parse } from 'path';
import fs from "fs-extra";

let handler = async (m, { q,usedPrefix, command, text }) => {
    let pluginFiles = getPluginFiles("./plugins");
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} menu`;

    const pluginPath = pluginFiles[text];
    if (!pluginPath) {
        m.reply(`Plugin *${text}* tidak ditemukan`);
        return;
    }
    let file = fs.readFileSync(pluginPath);
    let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
    let mimetype = "text/javascript"
    conn.sendMessage(
        m.chat,
        { document: file, fileName: q +'.js', mimetype, jpegThumbnail },
        { quoted: m }
      );
   // m.reply(require("fs").readFileSync(pluginPath, "utf-8"));
};

handler.help = ["getplugin"].map((v) => v + " <teks>");
handler.tags = ["host"];
handler.command = /^(getplugin|gp)$/i;

handler.owner = true;

export default handler;

function getPluginFiles(folderPath) {
    let files = {};

    function getFilesRecursively(folderPath) {
        const items = readdirSync(folderPath);

        for (let item of items) {
            const itemPath = join(folderPath, item);
            const itemStat = statSync(itemPath);

            if (itemStat.isDirectory()) {
                getFilesRecursively(itemPath); // Panggil rekursif untuk folder yang ada di dalamnya
            } else if (item.endsWith(".js")) {
                const { name } = parse(item);
                files[name] = itemPath;
            }
        }
    }

    getFilesRecursively(folderPath);
    return files;
}

