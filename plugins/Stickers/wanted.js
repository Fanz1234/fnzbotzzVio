import { TelegraPh } from '../../lib/uploader.js'
import { nekohime } from '../../lib/restApi.js'
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";
let handler = async (m, { q, conn, args, setReply, usedPrefix, command }) => {
    const isImage = m.type === "imageMessage";
    const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage");
    const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
    const isVideo = m.type === "videoMessage";
    const isQuotedVideo = m.type === "extendedTextMessage" && m.content.includes("videoMessage");
    
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
 
    if (isQuotedImage || isImage) {
    setReply(mess.wait)
    let olalah = await conn.downloadAndSaveMediaMessage(quoted,makeid(5))
    let anuah = await TelegraPh(olalah)
    let data = new nekohime()
    let media = await data.wantedMaker(anuah)
    await conn.toSticker(m.chat, media, m)  
    } else if(isQuotedSticker){
        let media = await conn.downloadMed(quoted, makeid(5));
        let ran = getRandomFile('.png');

        ffmpeg(media)
            .output(ran)
            .on('end', async () => {
                fs.unlinkSync(media);
                const filePath = process.cwd() +'/'+ ran
                let anuah = await TelegraPh(filePath)
                let data = new nekohime()
                let mesdia = await data.wantedMaker(anuah)
                await conn.toSticker(m.chat, mesdia, m)  
                fs.unlinkSync(ran);
            })
            .on('error', (err) => {
                fs.unlinkSync(media);
                setReply(err.message || 'Terjadi kesalahan saat mengonversi sticker.');
            })
            .run();

    } else throw 'Reply image'




};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["wanted"];

export default handler;
























