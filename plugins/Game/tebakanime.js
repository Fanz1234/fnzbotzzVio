import fetch from 'node-fetch';

let timeout = 120000;
let poin = 500;

let handler = async (m, { conn, usedPrefix, command }) => {
    conn.tebakanime = conn.tebakanime || {}; // Initialize if not already initialized
    let id = m.chat;

    if (conn.tebakanime[id]) {
        // If there's an active game for this chat ID
        conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebakanime[id][0]);
        throw false; // Exit the handler function
    }

    try {
        let response = await fetch('https://raw.githubusercontent.com/unx21/ngetezz/main/src/data/nyenyenye.json');
        let src = await response.json();
        let json = src[Math.floor(Math.random() * src.length)];

        let caption = `
Waktu *${(timeout / 1000).toFixed(2)} Detik*
Ketik ${usedPrefix}wa Untuk Bantuan
Bonus: ${poin} XP
`.trim();

        let message = await conn.reply(m.chat, json.img, 'anu.jpg', caption, m, false);

        conn.tebakanime[id] = [
            message,
            json,
            poin,
            setTimeout(async () => {
                if (conn.tebakanime[id]) {
                    await conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, conn.tebakanime[id][0]);
                    delete conn.tebakanime[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        throw error; // Throw the error further to handle it
    }
};

handler.help = ['tebakanime'];
handler.tags = ['game'];
handler.command = /^tebakanime$/i;

export default handler;
