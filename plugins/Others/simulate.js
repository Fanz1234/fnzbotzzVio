import {WelcomeLeave} from "../../lib/welcome.js";
import fs from 'fs-extra'
let handler = async (m, { conn, q,setReply }) => {
let poto =   "https://telegra.ph/file/59a2583b604f3cb255cb4.jpg"
    let url = await WelcomeLeave(poto,m.pushname,'halo om')
    log(url)
    conn.sendMessage(m.chat,{image:fs.readFileSync(url)},{quoted:m})








const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
//let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

let contextInfo = {
forwardingScore: 1,
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterJid,
serverMessageId: 100,
newsletterName
},
externalAdReply:{
showAdAttribution: false,
title: `W E L C O M E`,
body:`Runtime ${transformText(runTime)} `,
sourceUrl:global.myUrl,
mediaType: 1,
renderLargerThumbnail : true,
//thumbnailUrl: url,
}
}









conn.sendMessage(
    m.chat,
    { document: fs.readFileSync('./media/lala.docx'),
    caption: 'welcomeText',
    fileName: copyright,
    mimetype,
    pageCount: 100, 
    fileLength: 999999999999, 
    contextInfo
    }
    );
};
handler.help = ["speedtest"];
handler.tags = ["spesifikasi"];
handler.command = ["simulate",'sim'];
export default handler;
