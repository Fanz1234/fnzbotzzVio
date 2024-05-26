//import fs from "fs";
import fs from 'fs-extra'
import chalk from "chalk";
import toMs from "ms";

/**
 * Add user to bannedList database
 * @param {String} userId
 * @param {String} expired
 * @param {Object} _data
 */
const add = (nama, tanggal, userId, info, _dir) => {
  const obj = { name: nama, id: userId, date: tanggal, reason: info };
  _dir.push(obj);
};

/**
 * Unbanned someone.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Number}
 */
const del = (userId, _data) => {
  let position = null;
  Object.keys(_data).forEach((i) => {
    if (_data[i].id === userId) {
      position = i;
    }
  });
  if (position !== null) {
    _data.splice(position, 1);
  }
  return true;
};

/**
 * Check user is premium.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Boolean}
 */
const check = (userId, _dir) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      status = true;
    }
  });

  return status;
};

const clear = (_dir) => {
  Object.keys(_dir).forEach((i) => {
    _dir.splice(_dir[i], 1);
  });
  console.log("Sukses clear all ban");
};

export default {
  add,
  del,
  check,
  clear,
};

import { fileURLToPath, URL } from "url";
const __filename = new URL("", import.meta.url).pathname;
let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.bgGreen(chalk.black("[  UPDATE ]")),
    chalk.white(`${__filename}`)
  );
  import(`${file}?update=${Date.now()}`);
});


