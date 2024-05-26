let handler = (m) => m;

handler.before = async function (m, { conn,setReply,isOwner }) {
    const isImage = m.type === "imageMessage";
    const isVideo = m.type === "videoMessage";
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
    const user = db.data.users[m.sender]
    const isCmd = m.body.startsWith('.')

//ketika ada yang invite/kirim link grup di chat pribadi
if ((m.type === 'groupInviteMessage' || m.budy.includes('https://chat') || m.budy.includes('Buka tautan ini')) && !isCmd && !m.isBaileys && !m.isGroup && !m.itsMe && !isOwner) {
 
let teks = `Hallo kak ${m.pushname}
Untuk memasukan bot ke dalam group
kamu harus menyewa bot terlebih dahulu
harga mulai 3k untuk 7 hari, bisa cek di
https://wa.me/c/6285953938243

untuk order
silakan hub: wa.me/6285156137901
`
m.reply(teks)
}

};
export default handler;
