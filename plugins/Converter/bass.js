import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";
import { exec } from "child_process";

let handler = async (m, { conn, setReply }) => {
    const isQuotedAudio = m.type === "extendedTextMessage" && m.content.includes("audioMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (!isQuotedAudio) {
        return setReply("Reply audionya");
    }

    setReply("Tunggu sebentar...");

    try {
        if (isQuotedAudio) {
            let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
            let ran = getRandomFile('.mp3');

            ffmpeg(media)
                .audioFilter('equalizer=f=50:width_type=o:width=1:g=10')
                .output(ran)
                .on('end', () => {
                    fs.unlinkSync(media);
                    let buff = fs.readFileSync(ran);
                    conn.sendMessage(m.chat, { mimetype: "audio/mp4", ptt: true, audio: buff }, { quoted: m });
                    fs.unlinkSync(ran);
                })
                .on('error', (err) => {
                    fs.unlinkSync(media);
                    fs.unlinkSync(ran);
                    setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi audio."}`);
                })
                .run();
        } else {
            m.reply(`Balas vn/audio yang ingin diubah dengan caption *${userbot.prefix}bass*`);
        }

    } catch (err) {
        setReply(`Error: ${err.message || "Terjadi kesalahan saat mengunduh atau mengonversi audio."}`);
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["bass"];

export default handler;
