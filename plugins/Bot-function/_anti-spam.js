let handler = (m) => m;
handler.before = async function (m, { conn,isOwner }) {
// NEW ANTI SPAM
if(!m.isGroup) return
const isSticker = (m.type === 'stickerMessage');
const isText = (m.type === 'extendedTextMessage');

conn.spamSticker = conn.spamSticker ? conn.spamSticker : {};
conn.spamText = conn.spamText ? conn.spamText : {};


const chat = db.data.chats[m.chat]
if (chat && chat.antispam) {


    if (isSticker && !m.isAdmin) {
        if (m.sender in conn.spamSticker) {
            conn.spamSticker[m.sender].count += 1
            let timeSinceLastSpam = m.messageTimestamp.toNumber() - conn.spamSticker[m.sender].lastspam;
            
            if (timeSinceLastSpam <= 10) {
                if (conn.spamSticker[m.sender].count > 5) {
                    conn.spamSticker[m.sender].count = 0;
                    //let name = m.pushname || await conn.getName(m.sender);
                    let teks = `Terdeteksi nomor ${m.senderNumber} telah melakukan spam sticker lebih dari 5 kali, bot akan kick otomatis. Untuk menonaktifkan fitur ini ketik antispam off.`;

                    m.reply(teks);
                    
                    await sleep(2000)
                    if(isOwner) return m.reply("Tolong jangan spam ya ka")

                    // Implementasikan logika untuk kick user di sini
                    if(m.isBotAdmin) conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                }
            } else {
                conn.spamSticker[m.sender].count = 1; // Reset count jika lebih dari 1 menit
                conn.spamSticker[m.sender].lastspam = m.messageTimestamp.toNumber();
            }
        } else {
            conn.spamSticker[m.sender] = {
                count: 1,
                lastspam: m.messageTimestamp.toNumber()
            };
        }
    }



    if (isText && !m.isAdmin) {
        if (m.sender in conn.spamText) {
            conn.spamText[m.sender].count += 1
            let timeSinceLastSpam = m.messageTimestamp.toNumber() - conn.spamText[m.sender].lastspam;
            
            if (timeSinceLastSpam <= 15) {
                if (conn.spamText[m.sender].count > 10) {
                    let name = m.pushname || await conn.getName(m.sender);
                    let teks = `Terdeteksi nomor ${m.senderNumber} telah melakukan spam text lebih dari 10 kali, bot akan kick otomatis. Untuk menonaktifkan fitur ini ketik antispam off.`;

                    m.reply(teks);
                    conn.spamText[m.sender].count = 0;
                    if(isOwner) return m.reply("Tolong jangan spam ya ka")

                    // Implementasikan logika untuk kick user di sini
                    if(m.isBotAdmin) conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                }
            } else {
                conn.spamText[m.sender].count = 1; // Reset count jika lebih dari 1 menit
                conn.spamText[m.sender].lastspam = m.messageTimestamp.toNumber();
            }
        } else {
            conn.spamText[m.sender] = {
                count: 1,
                lastspam: m.messageTimestamp.toNumber()
            };
        }
    }





}

};
export default handler;
