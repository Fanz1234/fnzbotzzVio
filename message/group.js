
import moment from "moment-timezone";
import chalk from "chalk";
import fs from 'fs-extra'
import util from "util";
import {
getBuffer,
getGroupAdmins,
} from "../lib/myfunc.js";
const bg = "https://tinyurl.com/y23xrfhu";

//Function update member
export const memberUpdate = async (conn, anu) => {
    await sleep(3000)
var jeda = false;
if (jeda) return console.log("spam welcome aktif");
jeda = true;
try {
const { id, participants, action } = anu;
 log(anu)


var dataChat = conn.chats[id]

if(action === "demote" && dataChat){
let members = conn.chats[id].metadata.participants //|| (await conn.groupMetadata(id)).participants
await members.forEach(participant => {
if (participant.id === participants[0]) {
participant.admin = null;
}
});
//let nana = members.filter(v => v.id === participants[0])
//log(nana)
} else if(action === "promote" && dataChat) {

let members = conn.chats[id].metadata.participants  
await members.forEach(participant => {
if (participant.id === participants[0]) {
participant.admin = 'admin'
}
});    
//let nana = members.filter(v => v.id === participants[0])
//log(nana)    
} else if(action === "add" && dataChat  ) {

let obj =   {
     id: participants[0], 
     admin: null 
    }

let members = conn.chats[id].metadata.participants  
members.push(obj)
let bot =  members.find(u => conn.decodeJid(u.id) == conn.user.jid) 
let isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?
let sender = conn.decodeJid(anu.participants[0])

if(isBotAdmin && participants[0].split('@')[0] === global.nomerOwner){
    await conn.groupParticipantsUpdate(id, [sender], "promote")
} 
  

} else if(action === "remove" && dataChat ) {

let members = conn.chats[id].metadata.participants
let idToRemove = participants[0]
members.filter(item => item.id !== idToRemove);

}
  



if(anu.participants[0].includes('@lid')) return log('log 1')
if ((action == "remove" || action == "promote" || action == "demote") &&
anu.participants[0].split("@")[0].includes(conn.user.id.split(":")[0])
)
return log('log 2')
const myGroup = Object.keys(db.data.chats);
const from = anu.id
const botNumber = conn.user.jid;
const groupMetadata = ((conn.chats[from] || {}).metadata || await conn.groupMetadata(from).catch(_ => null))  || {}
const groupName = groupMetadata.subject || [];
//const groupLength = groupMetadata.participants.length;
const sender = conn.decodeJid(anu.participants[0])//132345273258041_1@s.whatsapp.net
if(sender.includes('_')) return log('log 3')
const senderNumber = sender.split("@")[0];
const groupMembers = groupMetadata.participants || [];
const groupAdmins = getGroupAdmins(groupMembers) || [];
const groupDesc = groupMetadata.desc || [];
const groupOwner = groupMetadata.owner || [];
const user =
groupMembers.find((u) => conn.decodeJid(u.id) === sender) || {};
const bot =
groupMembers.find((u) => conn.decodeJid(u.id) == conn.user.jid) || {};

const isOwner = sender.split('@')[0] === nomerOwner 
const isRAdmin = (user && user.admin == "superadmin") || false;
const isAdmin = isRAdmin || (user && user.admin == "admin") || false;
const isBotAdmin = (bot && bot.admin == "admin") || false; // Are you Admin?
const pushname = await conn.getName(sender);
const oneMem = anu.participants.length === 1;
const itsMe = sender === botNumber;
const timeWib = moment.tz("Asia/Jakarta").format("HH:mm");
const chat = global.db.data.chats[id];
const add = action == "add";
const remove = action == "remove";
const isBanchat = myGroup.includes(from)
? db.data.chats[from].banchat
: false;
if (isBanchat) {
return log('log 4')
}
let m = {
chat: from,
pushname: pushname,
sender: sender,
};

if (!chat) return log('log 5')
//if (!chat.welcome) return log('log 6')
let sBye = chat.sBye;
let sWelcome = chat.sWelcome;

//Import allfake.js
// await (await import("../plugins/Case/allfake.js")).default(m);

//Group Update Console.log
if (add && oneMem)
console.log(
chalk.magenta("[GRUP UPDATE]"),
chalk.green(`${pushname} telah bergabung dari gc`),
chalk.magenta(`${groupName}`)
);
if (remove && oneMem)
console.log(
chalk.magenta("[GRUP UPDATE]"),
chalk.green(`${pushname} telah keluar di gc`),
chalk.magenta(`${groupName}`)
);

//Auto kick jika itu user yang sudah di tandai
let kickon = db.data.kickon[from];
if (add && kickon && kickon.includes(senderNumber)) {
let teks = `@user tidak di izinkan masuk
karena dia telah keluar dari group ini sebelumnya,
dan juga sudah di tandai sebagai user biadap`;
let text = teks.replace("user", await conn.getName(sender));

await conn.sendMessage(
from,
{ text,
mentions: [sender],
contextInfo: { mentionedJid: [sender] }
},

);
if (!isBotAdmin)
return conn.sendMessage(
from,
{
text: `Gagal  mengeluarkan @${senderNumber} dari group karena bot bukan admin`,
contextInfo: { mentionedJid: [sender] },
},

);
if (isBotAdmin)
return conn.groupParticipantsUpdate(from, [sender], "remove");
}

/*

try { //To get photo of user
var pp = await conn.profilePictureUrl(sender, 'image')
} catch (e) {
var pp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

try { // To get photo of group
var ppgc = await conn.profilePictureUrl(from, 'image')
} catch (e) {
var ppgc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}
*/

let welcome ='https://telegra.ph/file/e90a359b95411b120c635.jpg'// "https://telegra.ph/file/5bedca1f745b1649ecf0b.jpg";
//let welcome = 'https://telegra.ph/file/5bedca1f745b1649ecf0b.jpg'
let goodbye = 'https://telegra.ph/file/57355c93403c36dbf2ca4.jpg' //"https://telegra.ph/file/8c2a3e26e3e7f0a15a784.jpg";
// let goodbye = 'https://telegra.ph/file/c9b18fcfa9df16f13fd51.jpg'

if (action == "add") {
var link = chat.welcomeImage == ''? welcome : chat.welcomeImage
} else {
var link = chat.leaveImage == ''? goodbye : chat.leaveImage
}



const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
//let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

let contextInfo = {
forwardingScore: 1,
isForwarded: false,
mentionedJid: [sender],
forwardedNewsletterMessageInfo: {
newsletterJid,
serverMessageId: 100,
newsletterName
},
externalAdReply:{
showAdAttribution: false,
title: `${action == "add"? 'W E L C O M E': 'G O O D  B Y E'}`,
body:`Runtime ${transformText(runTime)} `,
sourceUrl:global.myUrl,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: link,
}
}







switch (action) {

case "add":{
if (!chat.welcome) return   
let teks = `Halo @user
welcome to group ${groupName}
${sWelcome}`;
const welcomeText = (chat.sWelcome || teks)
.replace("user", await conn.getName(sender))
.replace("@desc", groupDesc.toString() || "unknow")
.replace("@subject", groupName);


 
let data = isOwner? groupMetadata.participants : {}
let member = isOwner? data.filter(u => u.admin !== 'admin' || u.admin !== 'superadmin' ) : {}
let admin = isOwner? data.filter(u => u.admin === 'admin' || u.admin === 'superadmin' ) : {}

const welcometeks =`Yeeeaaay ownerku masuk group!!

Halloo ${conn.getName(sender)}
welcome to group ${groupName} 
total member : ${member.length} member 
total admin : ${admin.length} admin


${copyright} - ${calender}
`





if (chat.welcome && !itsMe && oneMem) conn.sendMessage(
from,
{ text: isOwner? welcometeks:welcomeText, mentions: [sender],
contextInfo
}
);


}
break;

case "remove":
{
if (!chat.welcome) return 
let teks = `Selamat tinggal @user
${sBye}`;
const byeText = (chat.sBye || teks)
.replace("user", await conn.getName(sender))
.replace("@desc", groupDesc.toString() || "unknow")
.replace("@subject", groupName);

const byeTeks =`Bye bye owner, thanks udah mmampir 😁`

if (chat.welcome && !itsMe && oneMem) conn.sendMessage(
from,
{ text:isOwner? byeTeks: byeText,mentions: [sender],
contextInfo
}
);
}
break






} // Akhir dari swith action

await sleep(5000);
jeda = false;
} catch (err) {

jeda = false;
console.log(err);
let e = String(err);
if (e.includes("this.isZero")) {
return;
}
if (e.includes("rate-overlimit")) {
return;
}
if (e.includes("Connection Closed")) {
return;
}
if (e.includes("Timed Out")) {
return;
}
console.log(chalk.white("GROUP :"), chalk.green(e));

let text =`${util.format(anu)}


${util.format(err)}`
conn.sendMessage(ownerBot,{text})

}
};



//----------------BATAS--------------\\




//Function Update group
export async function groupsUpdate(conn, anu) {
try {
console.log(anu);
/*
const from = anu[0].id
const botNumber = conn.user.jid
const groupMetadata = await conn.groupMetadata(from) || (conn.chats[from] || {}).metadata
const groupName =  groupMetadata.subject || []
const groupLength = groupMetadata.participants.length
const groupMembers =  groupMetadata.participants || []
const groupDesc =  groupMetadata.desc || []
const groupOwner =  groupMetadata.owner || []
const bot = groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) || {} // Your Data
const isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?

let chats = global.db.data.chats[id], text = ''


try { // To get photo of group
var ppgroup = await conn.profilePictureUrl(from, 'image')
} catch (e) {
var ppgroup = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}

const contextInfo = {
forwardingScore: 50,
isForwarded: true,
externalAdReply:{
title: copyright,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: ppgroup,
}
}


for (let i of anu) {
if (!from) continue
if (!chats?.detect) continue
if (i.desc) text = (chats.sDesc || 'Description has been changed to\n@desc').replace('@desc', groupUpdate.desc)
if (i.subject) text = (chats.sSubject || 'Subject has been changed to\n@subject').replace('@subject', groupUpdate.subject)
if (i.icon) text = (chats.sIcon || 'Icon has been changed to').replace('@icon', groupUpdate.icon)
if (i.revoke) text = (chats.sRevoke ||  'Group link has been changed to\n@revoke').replace('@revoke', groupUpdate.revoke)
if (announce ) text = (chats.sAnnounceOn ||  '*Group has been closed!*')
if (!i.announce) text = (chats.sAnnounceOff ||  '*Group has been open!*')
if (i.restrict ) text = (chats.sRestrictOn || '*Group has been all participants!*')
if (!i.restrict ) text = (chats.sRestrictOff || '*Group has been only admin!*')
if (!text) continue
conn.sendMessage(from,{contextInfo,text})
}
*/
} catch (err) {
console.log(err);
}
}


