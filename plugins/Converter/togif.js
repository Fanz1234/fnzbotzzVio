
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { conn, setReply }) => {
    const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
    const isQuotedVideo = m.type === "extendedTextMessage" && m.content.includes("videoMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (isQuotedSticker) {
        setReply("Tunggu sebentar...");
        let file = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
        let outMp4 = getRandomFile(".mp4");

        ffmpeg(file)
            .inputOptions(["-ignore_loop", "0", "-i", file])
            .outputOptions(["-vf", "crop=trunc(iw/2)*2:trunc(ih/2)*2", "-b:v", "0", "-crf", "25", "-pix_fmt", "yuv420p"])
            .output(outMp4)
            .on("end", async () => {
                await fs.unlinkSync(file);
                let buffer = fs.readFileSync(outMp4);
                conn.sendMessage(m.chat, { gifPlayback: true, video: buffer });
                fs.unlinkSync(outMp4);
            })
            .on("error", async (err) => {
                await fs.unlinkSync(file);
                console.error(err);
                setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi sticker ke GIF."}`);
            })
            .run();
    } else if (isQuotedVideo) {
        setReply("Tunggu sebentar...");
        let file = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
        let buffer = fs.readFileSync(file);
        conn.sendMessage(m.chat, { gifPlayback: true, video: buffer });
        await fs.unlinkSync(file);
    } else {
        setReply("Balas pesan dengan stiker atau video!");
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["togif"];

export default handler;
