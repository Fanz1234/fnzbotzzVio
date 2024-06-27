import axios from 'axios';
import fs from 'fs-extra';
import fg from 'api-dylux';

const axiosAdGuard = axios.create({
    baseURL: 'https://dns.adguard.com/dns-query',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    params: {
        dns: 'dns.adguard.com',
        ct: 'application/dns-json'
    }
});

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat];
    let userAge = global.db.data.users[m.sender]?.age || 0; // Handle undefined age

    if (userAge < 18) throw `❎ Kamu belum cukup umur! Silakan kembali ketika kamu berusia di atas 18 tahun`;
    
    if (!text) throw `✳️ Untuk mencari\n📌 Gunakan: *${usedPrefix + command} <pencarian>*\n\nUntuk mengunduh dari URL:\n📌 Gunakan: *${usedPrefix + command} <url>*`;

    m.react = '🔄';

    if (text.includes('http://') || text.includes('https://')) {
        if (!text.includes('xnxx.com')) throw `❎ Masukkan link dari *xnxx.com*`;

        try {
            let headers = {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36', // Example User-Agent
                // Add more headers if necessary
            };

            // Resolve DNS using AdGuard
            let dnsResponse = await axiosAdGuard.get('', {
                params: {
                    name: new URL(text).hostname,
                    type: 'A'
                }
            });
            let ipAddress = dnsResponse.data.Answer[0].data;

            // Make HTTP request using resolved IP address
            let response = await axios.get(text, {
                headers: {
                    ...headers,
                    'Host': new URL(text).hostname
                },
                // Use resolved IP address directly
                baseURL: `http://${ipAddress}`
            });
            let data = response.data;

            // Parse the video information
            let result = {
                title: data.title,
                duration: data.duration,
                quality: data.quality,
                videoUrl: data.files.high // Assuming 'high' is the key for the video file URL
            };

            // Download and send the video file
            let downloadResponse = await axios.get(result.videoUrl, {
                responseType: 'arraybuffer',
                headers: headers,
                // Use resolved IP address directly
                baseURL: `http://${ipAddress}`
            });

            // Save the video file temporarily
            let tmpFilePath = './tmpvideo.mp4'; // Temporary file path
            await fs.outputFile(tmpFilePath, downloadResponse.data);

            // Send the file to the chat
            conn.sendFile(m.chat, tmpFilePath, result.title + '.mp4', `
≡  *XNXX DL*
            
▢ *📌Judul*: ${result.title}
▢ *⌚Durasi*: ${result.duration}
▢ *🎞️Kualitas*: ${result.quality}
`.trim(), m, false, { asDocument: chat.useDocument });

            // Clean up: delete temporary file after sending
            await fs.unlink(tmpFilePath);

            m.react = '✅'; // React with success emoji
        } catch (error) {
            console.error('Error downloading or sending file:', error);
            m.reply(`🔴 Error: Coba lagi nanti`);
        }
    } else {
        try {
            let res = await fg.xnxxSearch(text);
            let ff = res.result.map((v, i) => `${i + 1}┃ *Judul*: ${v.title}\n*Link*: ${v.link}\n`).join('\n');
            if (res.status) m.reply(ff);
        } catch (e) {
            m.reply(`🔴 Error: Coba lagi nanti`);
        }
    }
}

handler.help = ["xnxx"].map(v => v + " <query/url>");
handler.tags = ["nsfw"];
handler.command = ["xnxxsearch", "xnxx"];

export default handler;
