import axios from "axios";
import BodyForm from "form-data";
import fetch from "node-fetch";
import fs from 'fs-extra'
import FormData from "form-data"

function TelegraPh(Path) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(Path));
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      //console.log(data)
      return resolve("https://telegra.ph" + data.data[0].src);
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}


async function elegraPh(path) {
    let data = new FormData()
    data.append("file", fs.createReadStream(path))
    let response = await fetch("https://telegra.ph/upload", {
        method: "POST",
        body: data
    })
    return await response.json()
}





async function AnonFiles(path) {
    let data = new FormData()
    data.append("file", fs.createReadStream(path))
    let response = await fetch('https://api.anonfiles.com/upload', {
        method: "POST",
        body: data
    })
    return await response.json()
}



async function FileIo(path) {
  Log(path)
    let data = new FormData()
    data.append("file", fs.createReadStream(path))
    let response = await fetch("https://file.io", {
        method: "POST",
        body: data
    })
    return await response.json()
}



async function FileUgu(path) {
  Log(path)
    let data = new FormData()
    data.append("files[]", fs.createReadStream(path))
    let response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: data
    })
    return await response.json()
}



async function FileDitch(path) {
  Log(path)
    let data = new FormData()
    data.append("files[]", fs.createReadStream(path))
    let response = await fetch('https://up1.fileditch.com/upload.php', {
        method: "POST",
        body: data
    })
    return await response.json()
}


async function PomF2(path) {
  Log(path)
    let data = new FormData()
    data.append("files[]", fs.createReadStream(path))
    let response = await fetch("https://pomf2.lain.la/upload.php", {
        method: "POST",
        body: data
    })
    return await response.json()
}


async function Top4top(path) {
  Log(path)
    let data = new FormData()
    data.append("files", fs.createReadStream(path))
    let response = await fetch("https://www.top4top.me/#uploader", {
        method: "POST",
        body: data
    })
    return await response.json()
}






export { 
TelegraPh,
AnonFiles,
FileIo,
FileUgu,
FileDitch,
PomF2,
Top4top
};

import { fileURLToPath, URL } from "url";
const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;
import chalk from "chalk";
let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.bgGreen(chalk.black("[  UPDATE ]")),
    chalk.white(`${__filename}`)
  );
  import(`${file}?update=${Date.now()}`);
});
