import chalk from "chalk";
import moment from "moment-timezone";
import fs from 'fs-extra'
import _spam from "../../lib/antispam.js";

// Konstanta untuk menentukan metode pencatatan pesan


//Log text di group dan private chat
export const message = async (conn, m, budy, AntiSpam) => {
  if (budy && m.key.remoteJid !== "status@broadcast") {
    if (print) {
      console.log(
        m.isGroup
          ? chalk.bgMagentaBright(chalk.black("[  GROUP  ]")) //group chat
          : chalk.bgGreenBright(chalk.black("[ PRIVATE ]")), //private chat
        chalk.green(moment.tz("Asia/Jakarta").format("HH:mm")), //waktu
        chalk.hex("#9767FC").overline(budy),
        chalk.cyan("dari"), //teks
        chalk.hex("#A8E643").overline(`${m.pushname}`), //nama users
        m.isGroup ? `${chalk.red("di gc")} ${chalk.red(m.groupName)}` : ""
      );
    } else {
      // Catat pesan ke konsol dengan visualisasi
      console.log(
        m.isGroup ? "[  GROUP  ]" : "[ PRIVATE ]",
        moment.tz("Asia/Jakarta").format("HH:mm"),
        budy,
        "dari",
        `${m.pushname}`,
        m.isGroup ? `di gc ${m.groupName}` : ""
      );
    }
    if (budy && m.key.remoteJid !== "status@broadcast") {
      console.log(`ID: ${m.senderNumber}`);
    }
  }
};

function readLogs() {
  try {
    const data = fs.readFileSync('./database/logs.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []
  }
}

function saveUserData(data,obj) {
  if(data.length > 10) data.length = 0
  data.push(obj);
  const oke = JSON.stringify(data, null, 2);
  fs.writeFileSync('./database/logs.json', oke);
}

//Log command bot
export const commands = async (m, command,q,isCmd) => {
  if(isCmd) {
    if (print) {
      console.log(
        chalk.bgCyanBright(chalk.black("[ COMMAND ]")), // command
        chalk.green(moment.tz("Asia/Jakarta").format("HH:mm")), //waktu
        chalk.blue(`${command} ${q}`),
        chalk.cyan("dari"), // teks
        chalk.red(`${m.pushname}`), // nama
        m.isGroup ? `${chalk.red("di gc")} ${chalk.red(m.groupName)}` : ""
      );
    } else {
      // Catat command ke konsol dengan visualisasi
      console.log("[ COMMAND ]",
      moment.tz("Asia/Jakarta").format("HH:mm"),
      `${command} ${q}`,"dari",
      `${m.pushname}`
      ,m.isGroup ? `di gc ${m.groupName}` : "")
;
    }
    console.log(
      `ID: ${m.senderNumber}`,
      moment.tz("Asia/Jakarta").format("HH:mm") //waktu
    );
  }
  let data = readLogs()

  let obj = {
    name: m.pushname,
    command: command,
    query: q,
    time: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
    number: m.senderNumber,
    group: m.isGroup? m.groupName : 'Private chat'
  }

  saveUserData(data,obj)

};

//Log error
export const error = async (m, command) => {
  console.log(
    chalk.bgRed(chalk.black("[ ERROR ]")),
    chalk.green(moment.tz("Asia/Jakarta").format("HH:mm")),
    chalk.blue(`<span class="math-inline">\{command\} \[</span>{m.args.length}]`)
  );
};

// Fungsi untuk mencatat pesan dengan format
