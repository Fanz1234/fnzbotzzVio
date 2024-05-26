import _spam from "../../lib/antispam.js";
let handler = (m) => m;
handler.before = async function (m, { conn, isPremium }) {
//Auto Sticker Online
const AntiSpam = db.data.antispam
if(db.data.sticker[m.budy]){
    if (_spam.check("NotCase",m.senderNumber, AntiSpam)) return
    _spam.add("NotCase",m.senderNumber, "5s", AntiSpam)
    conn.sendMessage(m.chat,{sticker:{url:db.data.sticker[m.budy].link}})
    }
    
};
export default handler;
