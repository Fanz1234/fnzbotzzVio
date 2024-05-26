
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { conn, setReply }) => {
    const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (!isQuotedSticker) return setReply('Reply stickernya');

    setReply('Tunggu sebentar...');
    
    try {
        let media = await conn.downloadMed(quoted, makeid(5));
        let ran = getRandomFile('.png');

        ffmpeg(media)
            .output(ran)
            .on('end', async () => {
                fs.unlinkSync(media);
                let buffer = fs.readFileSync(ran);
                await conn.sendMessage(m.chat, { caption: "Nih", image: buffer });
                fs.unlinkSync(ran);
            })
            .on('error', (err) => {
                fs.unlinkSync(media);
                setReply(err.message || 'Terjadi kesalahan saat mengonversi sticker.');
            })
            .run();
    } catch (err) {
        setReply(err.message || 'Terjadi kesalahan saat mengunduh sticker.');
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["toimg", "toimage"];

export default handler;
