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

            ffmpeg()
                    .input(media)
                    .input(media)
                    .complexFilter('[0][1]afir=dry=10:wet=13')
                    .output(ran)
                    .on('end', () => {
                        fs.unlinkSync(media);
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { mimetype: "audio/mp4", ptt: true, audio: buff }, { quoted: m });
                        fs.unlinkSync(ran);
                    })
                    .on('error', (err) => {
                        fs.unlinkSync(media);
                        m.reply(`_*TERJADI KESALAHAN!*_`);
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
handler.command = ["reverb"];

export default handler;
