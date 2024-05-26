
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { conn, args, setReply }) => {
    const isQuotedAudio = m.type === "extendedTextMessage" && m.content.includes("audioMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (Number(args[0]) >= 11) return setReply("Maksimal volume adalah 10");

    if (!isQuotedAudio) {
        return setReply("Reply audio!");
    }

    setReply("Tunggu sebentar...");

    try {
        let media3 = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
        let rname = getRandomFile(".mp3");

        ffmpeg(media3)
            .audioFilters(`volume=${args[0]}`)
            .save(rname)
            .on("end", async () => {
                let jadie = fs.readFileSync(rname);
                await conn.sendMessage(m.chat, { audio: jadie, mimetype: "audio/mp4", ptt: true }, { quoted: m });
                fs.unlinkSync(rname);
                fs.unlinkSync(media3);
            })
            .on("error", async (err) => {
                fs.unlinkSync(rname);
                fs.unlinkSync(media3);
                setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi audio."}`);
            });
    } catch (err) {
        setReply(`Error: ${err.message || "Terjadi kesalahan saat mengunduh atau mengonversi audio."}`);
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["volume"];

export default handler;
