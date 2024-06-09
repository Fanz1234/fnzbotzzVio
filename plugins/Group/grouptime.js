import fs from 'fs-extra'
import toMs from "ms"
import moment from "moment-timezone"



//Time to open group
const open = (name, id, clock, _dir) => {
let position = null;
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === id) {
position = i;
}
});


if(_dir[position] && position !== null) {

if(_dir[position].opened) _dir[position].opened = false
 _dir[position].timeOpen = clock
_dir[position].id = id

} else {

let obj = {
name: name,
id: id,
opened : false,
closed : false,
timeOpen: clock,
timeClose: ''
}
_dir.push(obj);

}
};


//Time to close group
const close = (name, id, clock, _dir) => {
let position = null;
Object.keys(_dir).forEach((i) => {
  if (_dir[i].id === id) {
  position = i;
  }
});


if(_dir[position] && position !== null) {

if(_dir[position].closed) _dir[position].closed = false
_dir[position].timeClose = clock
_dir[position].id = id

} else {

let obj = {
name: name,
id: id,
opened : false,
closed : false,
timeOpen: '',
timeClose: clock
}
_dir.push(obj);

}
};





//Time for open/close group
const running = async (_dir) => {
let setTime = db.data.others['setTime']
if(!setTime) db.data.others['setTime'] = []

if(setTime.length > 0){
setInterval( async() => {
const time = moment().tz('Asia/Jakarta').format('HH:mm')
for(let i of setTime){
if(i.timeOpen !== '' && time == i.timeOpen && !i.opened){
i.opened = true

let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id) 

if(!anus.includes(i.id)) {
setTime.splice(setTime[i],1)
console.log("menghapus auto open/close time pada group")
} 




let text = `Tepat waktu group untuk di buka oleh admin
sesuai jam ${i.timeOpen} wib dan akan di tutup kembali pada jam ${i.timeClose}`
await conn.groupSettingUpdate(i.id, 'not_announcement')
await conn.sendMessage(i.id,{text})
} else if(i.timeClose !== '' && time == i.timeClose && !i.closed){
i.closed = true


let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id) 

if(!anus.includes(i.id)) {
setTime.splice(setTime[i],1)
console.log("menghapus auto open/close time pada group")
} 


let text = `Tepat waktu group untuk di tutup oleh admin
sesuai jam ${i.timeClose} wib dan akan di buka kembali pada jam ${i.timeOpen}`
await conn.groupSettingUpdate(i.id, 'announcement')
await conn.sendMessage(i.id,{text})
} else if(i.timeOpen !== '' && time !== i.timeOpen && i.opened){
i.opened = false
} else if(i.timeClose !== '' && time !== i.timeClose && i.closed){
i.closed = false
}

}

}, 2000)

}
};









const del = (userId, _data) => {
  let position = null;
  Object.keys(_data).forEach((i) => {
    if (_data[i].id === userId) {
      console.log(i)
      position = i;
    }
  });
  if (position !== null) {
    _data.splice(_data.indexOf(position, 1));
  }
  return true;
};
  

const getIndex = (userId, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
      position = i
  });
  if (position !== null) {
    return _dir[position]
  }
};

//To get what time the group is open
const getOpen = (userId, _dir) => {
let position = null;
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
position = i;
}
});
if (position !== null) {
return _dir[position].open;
}
};

//To get what time the group is Close
const getClose = (userId, _dir) => {
let position = null;
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
position = i;
}
});
if (position !== null) {
return _dir[position].close;
}
};


//to check group id
const check = (userId, _dir) => {
let status = false;
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
status = true;
}
});
return status;
};




export default {
  open,
  close,
  getOpen,
  getClose,
  running,
  check,
  getIndex,
  del
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