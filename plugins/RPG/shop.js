import fs from "fs";
const items = {
  buy: {
  	tbox: {
      money: 100000000,
    },
    chip: {
      money: 1000000,
    },
    kondom: {
      money: 50000,
    },
    exp: {
      money: 1000,
    },
    potion: {
      money: 1250,
    },
    trash: {
      money: 40,
    },
    wood: {
      money: 700,
    },
    coal: {
      money: 500,
    },
    rock: {
      money: 850,
    },
    string: {
      money: 400,
    },
    iron: {
      money: 3000,
    },
    diamond: {
      money: 300000,
    },
    emerald: {
      money: 250000,
    },
    gold: {
      money: 150000,
    },
    common: {
      money: 12000,
    },
    uncommon: {
      money: 120000,
    },
    mythic: {
      money: 175000,
    },
    legendary: {
      money: 300000,
    },
    petfood: {
      money: 35000,
    },
    pet: {
      money: 120000,
    },
    anggur: {
      money: 2000,
    },
    apel: {
      money: 2000,
    },
    jeruk: {
      money: 2000,
    },
    mangga: {
      money: 2000,
    },
    pisang: {
      money: 2000,
    },
    bibitanggur: {
      money: 2000,
    },
    bibitapel: {
      money: 2000,
    },
    bibitjeruk: {
      money: 2000,
    },
    bibitmangga: {
      money: 2000,
    },
    bibitpisang: {
      money: 2000,
    },
    umpan: {
      money: 5000,
    },
    limit: {
      money: 10000,
    },
  },
  sell: {
    tbox: {
      money: 45000000,
    },
    exp: {
      money: 1,
    },
    chip: {
      money: 1000000,
    },
    potion: {
      money: 625,
    },
    trash: {
      money: 20,
    },
    wood: {
      money: 350,
    },
    rock: {
      money: 425,
    },
    string: {
      money: 200,
    },
    iron: {
      money: 1500,
    },
    diamond: {
      money: 250000,
    },
    emerald: {
      money: 150000,
    },
    gold: {
      money: 150000,
    },
    common: {
      money: 1000,
    },
    uncommon: {
      money: 10000,
    },
    mythic: {
      money: 37500,
    },
    legendary: {
      money: 100000,
    },
    petfood: {
      money: 1750,
    },
    pet: {
      money: 60000,
    },
    anggur: {
      money: 1000,
    },
    apel: {
      money: 1000,
    },
    jeruk: {
      money: 1000,
    },
    mangga: {
      money: 1000,
    },
    pisang: {
      money: 1000,
    },
    bibitanggur: {
      money: 1000,
    },
    bibitapel: {
      money: 1000,
    },
    bibitjeruk: {
      money: 1000,
    },
    bibitmangga: {
      money: 1000,
    },
    bibitpisang: {
      money: 1000,
    },
    umpan: {
      money: 2500,
    },
    limit: {
      money: 5000,
    },
  },
};

let handler = async (m, { isPremium, command, usedPrefix, args }) => {
  const item = (args[0] || "").toLowerCase();
  //if (!item.match('limit') && db.data.chats[m.chat].rpg == false && m.isGroup) return dfail('rpg', m, conn)
  let user = db.data.users[m.sender];

  if (command == "shop") {
    let buy = Object.fromEntries(
      Object.entries(items["buy"]).filter(([v]) => v && v in user)
    );
    let sell = Object.fromEntries(
      Object.entries(items["sell"]).filter(([v]) => v && v in user)
    );
    let teks = `––––––『 *SHOP* 』––––––

🆔 Nama : ${m.pushname}
💰 Saldo : Rp ${db.data.users[m.sender].money.toLocaleString()}
🎫 limit :  ${isPremium ? "Unlimited" : `${db.data.users[m.sender].limit}`}

🛒 buy Item :
${Object.keys(buy)
  .map((v) => {
    let paymentMethod = Object.keys(buy[v]).find((v) => v in user);
    return `◆ 1 ${rpg.emoticon(v)} ${capitalize(v)} : Rp ${buy[v][
      paymentMethod
    ].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––

🛒 Sell Item :
${Object.keys(sell)
  .map((v) => {
    let paymentMethod = Object.keys(sell[v]).find((v) => v in user);
    return `◆ 1 ${rpg.emoticon(v)} ${capitalize(v)} : Rp ${sell[v][
      paymentMethod
    ].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––


 ⁉️ ᴛᴜᴛᴏʀɪᴀʟ :
➠ To Buy or Sell Item:
${usedPrefix}buy [item] [quantity]
${usedPrefix}sell [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}buy potion 10
${usedPrefix}sell potion 10
`.trim();

    return conn.adReply(
      m.chat,
      teks,
      "ᴍᴀʀᴛ",
      "ʙᴇʟɪ ᴀᴛᴀᴜ ᴍᴇɴᴊᴜᴀʟ ʙᴀʀᴀɴɢ",
      fs.readFileSync("./media/shop.jpg"),
      "",
      m
    );
  }

  const listItems = Object.fromEntries(
    Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user)
  );
  let text = "";
  let footer = "";
  let image = "";
  let buttons = "";

  text =
    command.toLowerCase() == "buy"
      ? `
*––––––『 𝙱𝚄𝚈𝙸𝙽𝙶 』––––––*
`.trim()
      : `
*––––––『 𝚂𝙴𝙻𝙻𝙸𝙽𝙶 』––––––*
`.trim();
  footer =
    command.toLowerCase() == "buy"
      ? `
🛒 ʟɪsᴛ ɪᴛᴇᴍ :
${Object.keys(listItems)
  .map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find((v) => v in user);
    return `◆ 1 ${rpg.emoticon(v)} ${capitalize(v)} : Rp ${listItems[v][
      paymentMethod
    ].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––
 ⁉️ ᴛᴜᴛᴏʀɪᴀʟ :
➠ ᴛᴏ ʙᴜʏ ɪᴛᴇᴍs:
${usedPrefix}${command} [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} potion 10
`.trim()
      : `
🛒 ʟɪsᴛ ɪᴛᴇᴍ :
${Object.keys(listItems)
  .map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find((v) => v in user);
    return `◆ 1 ${rpg.emoticon(v)} ${capitalize(v)} : Rp ${listItems[v][
      paymentMethod
    ].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––
 ⁉️ ᴛᴜᴛᴏʀɪᴀʟ :
➠ ᴛᴏ sᴇʟʟ ɪᴛᴇᴍs:
${usedPrefix}${command} [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} potion 10
`.trim();

  const total =
    Math.floor(
      isNumber(args[1])
        ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
        : 1
    ) * 1;
  if (!listItems[item])
    return conn.adReply(
      m.chat,
      footer,
      "ᴍᴀʀᴛ",
      "ʙᴇʟɪ ᴀᴛᴀᴜ ᴍᴇɴᴊᴜᴀʟ ʙᴀʀᴀɴɢ",
      fs.readFileSync("./media/shop.jpg"),
      "",
      m
    );
  if (command.toLowerCase() == "buy") {
    let paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    if (user[paymentMethod] < listItems[item][paymentMethod] * total)
      return m.reply(
        `Kamu membutuhkan *${
          listItems[item][paymentMethod] * total - user[paymentMethod]
        }* ${capitalize(paymentMethod)} ${rpg.emoticon(
          paymentMethod
        )} Lagi, Untuk Membeli *${total}* ${capitalize(item)} ${rpg.emoticon(
          item
        )}. Kamu hanya memiliki *${user[paymentMethod]}* ${capitalize(
          paymentMethod
        )} ${rpg.emoticon(paymentMethod)}.`
      );
    user[paymentMethod] -= listItems[item][paymentMethod] * total;
    user[item] += total;
    return conn.reply(
      m.chat,
      `Sukses Membeli *${total} ${capitalize(item)} ${rpg.emoticon(
        item
      )}*, Seharga *${listItems[item][paymentMethod] * total} ${capitalize(
        paymentMethod
      )} ${rpg.emoticon(paymentMethod)}*`,
      m
    );
  } else {
    let paymentMethot = Object.keys(listItems[item]).find((v) => v in user);
    if (user[item] < total)
      return m.reply(
        `You don't have enough *${capitalize(item)} ${rpg.emoticon(
          item
        )}* to sell, you only have ${user[item]} items`
      );
    user[item] -= total;
    user[paymentMethot] += listItems[item][paymentMethot] * total;
    return conn.reply(
      m.chat,
      `Sukses Menjual *${total} ${capitalize(item)} ${rpg.emoticon(
        item
      )}*, Seharga *${listItems[item][paymentMethot] * total} ${capitalize(
        paymentMethot
      )} ${rpg.emoticon(paymentMethot)}*`,
      m
    );
  }
};

handler.help = ["buy", "sell"].map((v) => v + " <item> <count>");
handler.tags = ["rpg"];
handler.command = /^(buy|sell|shop)$/i;
handler.register = true;
handler.group = true;
handler.disabled = false;

export default handler;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1);
}