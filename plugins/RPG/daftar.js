import { promises as fsPromises } from "fs";
import { createHash } from "crypto";
import fetch from "node-fetch";
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  if (user.registered === true)
    return m.reply(
      `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`
    );
  const umurRandom = Math.floor(Math.random() * 100) + 1;
  const formatSalah = `⚠️ ɴᴀᴍᴀ ᴅᴀɴ ᴜᴍᴜʀ ᴛɪᴅᴀᴋ ʙᴏʟᴇʜ ᴋᴏsᴏɴɢ\nᴋᴇᴛɪᴋ : *${
    usedPrefix + command
  } nama.umur*\n📌Contoh : *${usedPrefix + command}* Teguh.${umurRandom}`;
  if (!Reg.test(text)) return m.reply(formatSalah);
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) return m.reply("Nama tidak boleh kosong (Alphanumeric)");
  if (!age) return m.reply("Umur tidak boleh kosong (Angka)");
  age = parseInt(age);
  if (age > 40) return m.reply("*Gak boleh!*,\nTᴜᴀ Bᴀɴɢᴋᴀ Mᴀᴛɪ ᴀᴊᴀ Kᴏɴᴛᴏʟ");
  if (age < 5) return m.reply("*Gak boleh!*,\nBanyak pedo 🗿");
  if (user.name && user.name.trim() === name.trim())
    return m.reply("Nama sudah dipakai");
  let sn = makeid(6)
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : m.fromMe
      ? conn.user.jid
      : m.sender;

  let anu = "https://telegra.ph/file/a704a4f302e4ba6bd725f.jpg";

  let contextInfo = {
    externalAdReply: {
      showAdAttribution: false,
      title: "Saved to database",
      mediaType: 1,
      renderLargerThumbnail: true,
      thumbnailUrl: anu,
    },
  };

  let cap = `
*VERIFIKASI BERHASIL*

• *Nama :* ${name}
• *Umur :* ${age} tahun
• *Verified :* ${calender}
• *Grade :* ${user.grade}
• *Level :* ${user.level}
• *Serial Number (SN) :* ${sn}

Terima kasih telah melakukan verifikasi. Data pengguna telah disimpan dengan aman di database bot. Data kamu sekarang sudah terverifikasi.

🚀 Sekarang kamu dapat menggunakan fitur-fitur khusus yang hanya tersedia untuk pengguna terverifikasi.
`;

  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;
  let benar = `sᴜᴋsᴇs ᴅᴀғᴛᴀʀ \n${
    m.sender.split("@")[0]
  } telah di verifikasi!\n\n`;
  //m.reply(cap)
  conn.sendMessage(m.chat, { contextInfo, text: cap }, { quoted: m });
};

handler.help = ["daftar", "register"].map((v) => v + " <nama>.<umur>");
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function isNumber(x) {
  return !isNaN(x);
}

function generateRandomCharacter() {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return characters[Math.floor(Math.random() * characters.length)];
}
