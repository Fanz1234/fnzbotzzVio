"use strict";
import axios from "axios";
import fs from 'fs-extra'
import fetch from "node-fetch";
import jimp from "jimp";
import chalk from "chalk";
const { spawn } = require("child_process") 



const checkWAVersion = async () => {
  const { data } = await axios.get(
    "https://web.whatsapp.com/check-update?version=1&platform=web"
  );
  return data.currentVersion.split(".").map((x) => parseInt(x));
};



const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (e) {
    console.log(`Error in getBuffer: ${e}`);
  }
};

const fetchJson = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });

const fetchText = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.text())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getGroupAdmins = function (lala) {
  let admins = [];
  for (let i of lala) {
    i.admin !== null ? admins.push(i.id) : "";
  }
  return admins;
};

const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

const removeEmojis = (string) => {
  var regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, "");
};



const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



/*
const formatp = sizeFormatter({
  std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});
*/
const isUrl = (url) => {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
      "gi"
    )
  );
};

const getCase = async (cases) => {
  try {
    try {
      var okeh =
        "case " +
        `'${cases}'` +
        fs
          .readFileSync("./message/case.js")
          .toString()
          .split(`'${cases}'`)[1]
          .split("break")[0] +
        "break";
    } catch (err) {
      console.log(err);
      var okeh =
        "case " +
        `'${cases}'` +
        fs
          .readFileSync("./message/case.js")
          .toString()
          .split(`"${cases}"`)[1]
          .split("break")[0] +
        "break";
    }
    var caz = okeh;
  } catch (err) {
    console.log(err);
    var caz = "Case tidak ditemukan";
  }
  return caz;
};

const addCase = async (q) => {
  let yoyo = q.split("case")[1].split(":")[0];
  let yeye = yoyo
    .replace('"', "")
    .replace('"', "")
    .replace(`'`, ``)
    .replace(`'`, ``);
  console.log(yeye);
  let whatCase = await getCase(yeye);
  console.log(whatCase);

  if (whatCase.length > 21) {
    var yoi = "Case tersebut sudah ada di dalam file";
  } else {
    var yoi = `Berhasil menambahkan case ${yeye}`;
    let code = fs.readFileSync("./message/case.js", "utf8");
    let indexSwitchCommand = code.indexOf("switch(command){");
    if (indexSwitchCommand !== -1) {
      const newCase = `\n\n\n\n${q}\n\n\n\n`;
      code =
        code.slice(0, indexSwitchCommand + 17) +
        newCase +
        code.slice(indexSwitchCommand + 20);
      fs.writeFileSync("./message/case.js", code);
    }
  }
  return yoi;
};

const delCase = async (q) => {
  
  fs.copy('./message/case.js', './database/backup/case.js', (err) => {
    if (err) throw err;
    console.log('case.js was copied to databse/backup');
  })
  await sleep(3000)
  let whatCase = await getCase(q);
  if (whatCase == "Case tidak ditemukan") {
    var yoyo = whatCase;
  } else {
    let code = fs.readFileSync("./message/case.js", "utf8");
    let indexAwal = code.indexOf(`case '${q}'`);
    let indexAkhir = indexAwal + whatCase.length;
    code = code.slice(0, indexAwal) + code.slice(indexAkhir);
    fs.writeFileSync("./message/case.js", code);
    var yoyo = `Berhasil menghapus case ${q}`;
  }
  return yoyo;
};

const kyun = (seconds) => {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor((seconds % (60 * 60)) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const h2k = (number) => {
  var SI_POSTFIXES = ["", " Ribu", " Juta", " Miliar", " Triliun", " P", " E"];
  //  var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1) + "";
  if (/\.0$/.test(formatted))
    formatted = formatted.substr(0, formatted.length - 2);
  return formatted + postfix;
};

const FileSize = (number) => {
  var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"];
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(0) + "";
  if (/\.0$/.test(formatted))
    formatted = formatted.substr(0, formatted.length - 2);
  return formatted+ postfix;
};



const generateMessageID = () => {
  return randomBytes(4).toString("hex").toUpperCase();
};

const generateProfilePicture = async (buffer) => {
  const Jimp = await jimp.read(buffer);
  const min = Jimp.getWidth();
  const max = Jimp.getHeight();
  const cropped = Jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
    preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
  };
};

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2);
};

const formatDate = (n, locale = "id") => {
  let d = new Date(n);
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

//Random Nomer
const randomNomor = (angka) => {
  return Math.floor(Math.random() * angka) + 1;
};

const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};


function hitungUmur(date) {
  var formattedDate = date.split("/")
  var birthdateTimeStamp = new Date(formattedDate[2], formattedDate[1], formattedDate[0])
  var currentDate = new Date().getTime();
  var difference = currentDate - birthdateTimeStamp;
  var currentAge = Math.floor(difference / 31557600000)
  // dividing by 1000*60*60*24*365.25
  return currentAge
}

const createExif = (pack, auth) =>{
const code = [0x00,0x00,0x16,0x00,0x00,0x00]
const exif = {"sticker-pack-id": "com.client.tech", "sticker-pack-name": pack, "sticker-pack-publisher": auth, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.termux", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}
let len = JSON.stringify(exif).length
if (len > 256) {
len = len - 256
code.unshift(0x01)
} else {
code.unshift(0x00)
}
if (len < 16) {
len = len.toString(16)
len = "0" + len
} else {
len = len.toString(16)
}
//len = len < 16 ? `0${len.toString(16)}` : len.toString(16)
const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
const __ = Buffer.from(len, "hex")
const ___ = Buffer.from(code)
const ____ = Buffer.from(JSON.stringify(exif))
fs.writeFileSync('./database/take.exif', Buffer.concat([_, __, ___, ____]), function (err) {
console.log(err)
if (err) return console.error(err)
return `./database/take.exif`
})

}

const modStick = (from, media, m) => {
let out = getRandomFile('.webp')
try {
console.log(media)
spawn('webpmux', ['-set','exif', './database/take.exif', media, '-o', out])
.on('exit', () => {
conn.sendMessage(from, {sticker:fs.readFileSync(out)},{quoted: m})
fs.unlinkSync(out)
fs.unlinkSync(media)
})
} catch (e) {
console.log(e)
fs.unlinkSync(media)
}
}




export {
  checkWAVersion,
  getBuffer,
  fetchJson,
  fetchText,
  getGroupAdmins,
  runtime,
  removeEmojis,
  sleep,
 

  isUrl,
  getCase,
  kyun,
  h2k,
  FileSize,
  hitungUmur,
  generateMessageID,
 
  generateProfilePicture,
  jsonformat,
  formatDate,
  pickRandom,
  addCase,
  delCase,
  randomNomor,
  createExif,
  modStick

};

import { fileURLToPath, URL } from "url";
const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;
let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.bgGreen(chalk.black("[  UPDATE ]")),
    chalk.white(`${__filename}`)
  );
  import(`${file}?update=${Date.now()}`);
});