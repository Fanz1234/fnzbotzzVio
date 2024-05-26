import toMs from "ms";
import ms from "parse-ms";

let handler = async (m, { conn, args, isPremium, isOwner, setReply }) => {
  let user = db.data.users[m.sender];
  if (!isPremium && !isOwner) return setReply(`Kamu bukan user premium`);
  if (user.timeOrder == undefined) i.timeOrder = "";
  if (user.timeEnd == undefined) i.timeEnd = "";

  let cekvip = ms(user.premiumTime - Date.now());
  let cekbulan = Math.floor(cekvip.days / 30);
  let premiumnya = `${cekbulan} Bulan ${cekvip.days - cekbulan * 30} Hari ${
    cekvip.hours
  } Jam ${cekvip.minutes} Menit `;
  // Calculate months remaining

  let teks = `
––––––『 *USER PREMIUM* 』––––––

• *Name :* ${user.name}
• *Number:* ${m.senderNumber}
• *Days:* ${premiumnya}
• *Countdown:* ${user.premiumTime - Date.now()}
• *Time order:* ${user.timeOrder}
• *Time end:* ${user.timeEnd}

${copyright}
`;

  setReply(teks);
};
handler.help = ["cekprem"];
handler.tags = ["info"];
handler.command = /^(cekprem|cekpremium)$/i;

export default handler;
