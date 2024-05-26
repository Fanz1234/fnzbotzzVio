import ms from "parse-ms";
import { runtime, FileSize } from "../../lib/myfunc.js";

let handler = async (m, { conn, setReply }) => {
  try {
    const hitnya = db.data.hittoday;
    const dash = db.data.dashboard;
    let storage = conn.getDirSize(process.cwd());
    let moduls = conn.getDirSize("./node_modules");
    let Session = conn.getDirSize(global.session);
    let databse = conn.getFileSize("./database/database.json");

    let gcHit = `\n\n––––––『 Group Hit 』––––––\n`
    let data = db.data.chats
    for (let key in data) {
        if (data[key].hasOwnProperty('hit')) {
          gcHit += '⭔ ' + data[key].name + " : " + data[key].hit+'\n'
        }
    }




    // Hitung total hit
   // let totalHit = hitnya.reduce((acc, cur) => acc + cur.count, 0);

    // Hitung waktu reset
    let resetTime = hitnya.map(i => ms(i.expired - Date.now()));
    let resetnye = resetTime.map(cekvipp => `${cekvipp.hours} jam ${cekvipp.minutes} menit`).join(", ");

let teks = `
––––––『 Dashboard 』––––––
⭔ Runtime: ${runtime(process.uptime())}
⭔ Reset: ${resetnye}
⭔ Total Hit: ${thisHit.toLocaleString()}
⭔ Storage: ${FileSize(storage)}
⭔ Modules: ${FileSize(moduls)}
⭔ Session: ${FileSize(Session)}
⭔ Database: ${FileSize(databse)}
`;


    // Buat teks untuk commands today
    let fall = "––––––『 Commands Today 』––––––\n";
    dash.forEach(e => fall += ` ⭔ ${e.cmd} : ${e.succes + e.failed}\n`);
    let akoh = `Total : ${dash.length} used`;

    // Buat teks untuk commands failed
    let tod = "––––––『 Commands Failed 』––––––\n";
    let filteredArray = dash.filter(item => item.failed > 0);
    filteredArray.forEach(e => tod += ` ⭔ ${e.cmd} : ${e.failed}\n`);
    let aw = `Total : ${filteredArray.length} failed`;

    // Hitung total success dan total failed
    let totalSuc = dash.reduce((acc, cur) => acc + cur.succes, 0);
    let totalFail = dash.reduce((acc, cur) => acc + cur.failed, 0);

    let tekz =
      teks +
      "\n\n" +
      fall +
      "\n" +
      akoh +
      "\n\n" +
      "––––––『 Commands Status 』––––––\n" +
      ` ⭔ Succes : ${totalSuc}\n` +
      ` ⭔ Failed : ${totalFail}\n\n` +
      tod + 
      gcHit +
      "\n\n";

    let link = "https://telegra.ph/file/b659d66189445cab43a25.jpg";
    setReply(tekz);
  } catch (error) {
    console.error("Error in dashboard handler:", error);
    setReply("Oops! Terjadi kesalahan dalam menampilkan dashboard.");
  }
};

handler.help = ["db"];
handler.tags = ["spesifikasi"];
handler.command = /^(dashboard)$/i;


export default handler;
