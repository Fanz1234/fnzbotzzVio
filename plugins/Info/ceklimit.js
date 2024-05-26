import toMs from "ms";
import ms from "parse-ms";

let handler = async (m, { conn, args, isPremium, isOwner, setReply }) => {
  const gcount = isPremium ? gcounti.prem : gcounti.user
  let prefix = ".";
  let name = m.mentionByReply
    ? await conn.getName(m.mentionByReply)
    : m.pushname;
  let number = m.mentionByReply
    ? m.mentionByReply.split("@")[0]
    : m.senderNumber;
  let limid = m.mentionByReply
    ? db.data.users[m.mentionByReply].premiumTime !== 0
      ? "Unlimited"
      : `${db.data.users[m.mentionByReply].limit}/${limitCount}`
    : isPremium
    ? "Unlimited"
    : `${db.data.users[m.sender].limit}/${limitCount}`;
  let gemlimit = m.mentionByReply
    ? `${db.data.users[m.mentionByReply].glimit}/${gcount}`
    : `${db.data.users[m.sender].glimit}/${gcount}`;
  let uang = m.mentionByReply
    ? db.data.users[m.mentionByReply].money.toLocaleString()
    : db.data.users[m.sender].money.toLocaleString();

  let teks = `––––––『 *USER LIMIT* 』––––––
        
• Nama: ${name}
• Nomer: ${number}
• Limit : ${limid}
• Limit Game : ${gemlimit}
• Saldo : Rp ${uang}
        
Kamu dapat membeli limit dengan ${prefix}buy limit dan ${prefix}buyglimit untuk membeli game limit`;

  if (m.mentionByReply) {
    setReply(teks);
  } else {
    setReply(teks);
  }
};

handler.tags = ["info"];
handler.command = ["ceklimit", "limit"];

export default handler;
