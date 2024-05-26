
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { conn, setReply }) => {
    const isQuotedAudio = m.type === "extendedTextMessage" && m.content.includes("audioMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (!isQuotedAudio) {
        return setReply("Reply audionya");
    }

    setReply("Tunggu sebentar...");

    try {
        let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
        let ran = getRandomFile(".mp3");

        ffmpeg(media)
            .save(ran)
            .on("end", async () => {
                fs.unlinkSync(media);
                let buffer = fs.readFileSync(ran);
                await conn.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4", ptt: true }, { quoted: m });
                fs.unlinkSync(ran);
            })
            .on("error", async (err) => {
                fs.unlinkSync(media);
                fs.unlinkSync(ran);
                setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi audio ke PTT."}`);
            });
    } catch (err) {
        setReply(`Error: ${err.message || "Terjadi kesalahan saat mengunduh atau mengonversi audio."}`);
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["toptt"];

export default handler;
