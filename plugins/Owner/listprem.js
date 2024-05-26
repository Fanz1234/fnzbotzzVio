import ms from "parse-ms";

let handler = async (m, { conn, setReply }) => {
  let premium = Object.values(db.data.users);
  let premiumCount = 0;
  let data = db.data.users;

  // Loop through each user
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key].premiumTime !== 0) {
        premiumCount++;
      }
    }
  }

  let txt = `––––––『 *LIST PREMIUM* 』––––––\nTotal : ${premiumCount}\n\n`;
  let men = [];

  for (let i of premium) {
    if (i.premiumTime !== 0) {
      men.push(i.id + "@s.whatsapp.net");

      let cekvip = ms(i.premiumTime - Date.now());

      // Calculate months remaining
      let cekbulan = Math.floor(cekvip.days / 30);

      // Calculate remaining days
      let cekhari = cekvip.days % 30;

      txt += `*Name :* ${i.name}\n*Number :* wa.me/${i.id}\n*Remaining Time :* ${cekbulan} Bulan ${cekhari} Hari ${cekvip.hours} Jam ${cekvip.minutes} Menit\n\n•·–––––––––––––––––––––––––·•\n`;
    }
  }
  txt += `\n© ${fake1}`;
  setReply(txt, men);
};

handler.help = ["premlist [angka]"];
handler.tags = ["info"];
handler.command = /^(listprem|premlist)$/i;
handler.owner = true;
export default handler;
