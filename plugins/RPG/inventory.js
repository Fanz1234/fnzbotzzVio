import daily from "./daily.js";
import weekly from "./weekly.js";
import monthly from "./monthly.js";
import adventure from "./adventure.js";
import fetch from "node-fetch";

const inventory = {
  others: {
    joinlimit: true,
    health: true,
    stamina: true,
    money: true,
    chip: true,
    exp: true,
  },
  items: {
    bibitanggur: true,
    bibitmangga: true,
    bibitpisang: true,
    bibitapel: true,
    bibitjeruk: true,
    anggur: true,
    mangga: true,
    pisang: true,
    apel: true,
    jeruk: true,
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
    rawdiamond: true,
    rawgold: true,
    rawiron: true,
    umpan: true,
    upgrader: true,
    pet: true,
    petfood: true,
  },
  durabi: {
    sworddurability: true,
    pickaxedurability: true,
    fishingroddurability: true,
    armordurability: true,
  },
  tools: {
    armor: {
      0: "❌",
      1: "Leather Armor",
      2: "Iron Armor",
      3: "Gold Armor",
      4: "Diamond Armor",
      5: "Emerald Armor",
      6: "Crystal Armor",
      7: "Obsidian Armor",
      8: "Netherite Armor",
      9: "Wither Armor",
      10: "Dragon Armor",
      11: "??? Unknown Armor ???",
    },
    sword: {
      0: "❌",
      1: "Wooden Sword",
      2: "Stone Sword",
      3: "Iron Sword",
      4: "Gold Sword",
      5: "Copper Sword",
      6: "Diamond Sword",
      7: "Emerald Sword",
      8: "Obsidian Sword",
      9: "Netherite Sword",
      10: "Samurai Slayer Green Sword",
      11: "Teguh’s Chimera Sword",
    },
    pickaxe: {
      0: "❌",
      1: "Wooden Pickaxe",
      2: "Stone Pickaxe",
      3: "Iron Pickaxe",
      4: "Gold Pickaxe",
      5: "Copper Pickaxe",
      6: "Diamond Pickaxe",
      7: "Emerlad Pickaxe",
      8: "Crystal Pickaxe",
      9: "Obsidian Pickaxe",
      10: "Netherite Pickaxe",
      11: "Teguh`s Exclusive 100 Level Pickaxe",
    },
    fishingrod: {
      0: "❌",
      1: "Wooden Fishingrod",
      2: "Stone Fishingrod",
      3: "Iron Fishingrod",
      4: "Gold Fishingrod",
      5: "Copper Fishingrod",
      6: "Diamond Fishingrod",
      7: "Emerald Fishingrod",
      8: "Crystal Fishingrod",
      9: "Obsidian Fishingrod",
      10: "God Fishingrod",
      11: "Teguh’s DevRod",
    },
  },
  crates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
    tbox: true,
  },
  makanan: {
    burger: true,
    pizza: true,
    kepitingbakar: true,
    ayambakar: true,
    steak: true,
    wine: true,
    beer: true,
  },
  ability: {
    strength: true,
    speed: true,
    defense: true,
  },
  pets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
    robo: 10,
  },
  lpet: {
    dino: 10,
    tano: 10,
    unicorn: 10,
    dragon: 10,
  },
  cooldowns: {
    lastclaim: {
      name: "claim",
      time: daily.cooldown,
    },
    lastweekly: {
      name: "weekly",
      time: weekly.cooldown,
    },
    lastmonthly: {
      name: "monthly",
      time: monthly.cooldown,
    },
    lastadventure: {
      name: "adventure",
      time: adventure.cooldown,
    },
  },
};
let handler = async (m, { conn }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  if (!(who in db.data.users)) return m.reply(`User ${who} not in database`);
  let user = db.data.users[who];
  let sortedlevel = Object.entries(db.data.users).sort(
    (a, b) => b[1].level - a[1].level
  );
  let userslevel = sortedlevel.map((v) => v[0]);
  let sortedmoney = Object.entries(db.data.users).sort(
    (a, b) => b[1].money - a[1].money
  );
  let usersmoney = sortedmoney.map((v) => v[0]);
  let sorteddiamond = Object.entries(db.data.users).sort(
    (a, b) => b[1].diamond - a[1].diamond
  );
  let usersdiamond = sorteddiamond.map((v) => v[0]);
  let sortedbank = Object.entries(db.data.users).sort(
    (a, b) => b[1].bank - a[1].bank
  );
  let usersbank = sortedbank.map((v) => v[0]);
  let sortedgold = Object.entries(db.data.users).sort(
    (a, b) => b[1].gold - a[1].gold
  );
  let usersgold = sortedgold.map((v) => v[0]);

  let limit = user.premiumTime >= 1 ? "Unlimited" : user.limit;
  const tools = Object.keys(inventory.tools)
    .map(
      (v) =>
        user[v] &&
        `*${rpg.emoticon(v)} ${v}:* ${
          typeof inventory.tools[v] === "object"
            ? inventory.tools[v][user[v]?.toString()]
            : `Level(s) ${user[v]}`
        }`
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  const items = Object.keys(inventory.items)
    .map((v) => user[v] && `*${rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  const dura = Object.keys(inventory.durabi)
    .map((v) => user[v] && `*${rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  const crates = Object.keys(inventory.crates)
    .map((v) => user[v] && `*${rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  const ability = Object.keys(inventory.ability)
    .map((v) => user[v] && `*${rpg.emoticon(v)} ${v}:*  ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  const pets = Object.keys(inventory.pets)
    .map(
      (v) =>
        user[v] &&
        `*${rpg.emoticon(v)} ${v}:* ${
          user[v] >= inventory.pets[v] ? "Max Levels" : `Level(s) ${user[v]}`
        }`
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  const mkn = Object.keys(inventory.makanan)
    .map((v) => user[v] && `*${rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  const lpet = Object.keys(inventory.lpet)
    .map(
      (v) =>
        user[v] &&
        `*${rpg.emoticon(v)} ${v}:* ${
          user[v] >= inventory.pets[v] ? "Max Levels" : `Level(s) ${user[v]}`
        }`
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  const cooldowns = Object.entries(inventory.cooldowns)
    .map(
      ([cd, { name, time }]) =>
        cd in user &&
        `*✧ ${name}*: ${new Date() - user[cd] >= time ? "✅" : "❌"}`
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  const caption = `
🎒 ɪɴᴠᴇɴᴛᴏʀʏ ᴜsᴇʀ : *${
    user.registered ? user.name : await conn.getName(who)
  }* ${
    user.level
      ? `
◦︎ ${rpg.emoticon("level")} level: ${user.level}`
      : ""
  } ${
    user.limit
      ? `
◦︎ ${rpg.emoticon("limit")} limit: ${limit}`
      : ""
  }
${Object.keys(inventory.others)
  .map(
    (v) =>
      user[v] &&
      `◦︎ ${rpg.emoticon(v)} ${v}: ${
        v == "money"
          ? "Rp " + user[v].toLocaleString()
          : user[v].toLocaleString()
      }`
  )
  .filter((v) => v)
  .join("\n")} ${
    tools
      ? `

𖨠──··· *ᴘᴇʀᴀʟᴀᴛᴀɴ* :
${tools}`
      : ""
  }${
    items
      ? `

𖨠──··· *ᴋᴇᴍᴀᴍᴘᴜᴀɴ*  :
${ability}

𖨠──··· *ᴍᴀᴋᴀɴᴀɴ & ᴍɪɴᴜᴍᴀɴ* ;
${mkn}

*ʙᴀʀᴀɴɢ-ʙᴀʀᴀɴɢ ʏᴀɴɢ ᴀᴅᴀ ᴅɪ ᴛᴀs* :
${items}

𖨠──··· *ᴄʀᴀᴛᴇ & ʙᴏx* 📥:
${crates}

𖨠──··· *ʜᴇᴡᴀɴ ᴘᴇʟɪʜᴀʀᴀᴀɴ*  :
${pets}

𖨠──··· *ᴘᴇʟɪʜᴀʀᴀᴀɴ ʟᴀɴɢᴋᴀ* :
${lpet}

𖨠──··· *Pᴇɴɢʜᴀʀɢᴀᴀɴ [ ᴀᴄʜɪᴇᴠᴇᴍᴇɴᴛ ]*
${
  user.dragon > 99
    ? "🔮 Tʜᴇ Dʀᴀɢᴏɴ Tᴀᴍᴇʀ\nᵈⁱᵈᵃᵖᵃᵗᵏᵃⁿ ᵏᵃʳᵉⁿᵃ ᵈʳᵃᵍᵒⁿ ᵐᵉⁿᶜᵃᵖᵃⁱ ˡᵉᵛᵉˡ ¹⁰⁰\n"
    : ""
} ${
          user.bank > 1000000000
            ? "💴 ᴍɪʟʟɪᴏɴᴀɪʀᴇ\nᵈⁱᵈᵃᵖᵃᵗᵏᵃⁿ ᵏᵃʳᵉⁿᵃ ᵐᵉᵐⁱˡⁱᵏⁱ ¹ ᵐⁱˡⁱᵃʳ ᵘᵃⁿᵍ ᵈⁱ ᵇᵃⁿᵏ\n"
            : ""
        } ${
          user.money > 1000000
            ? "🤑 ᴊᴜᴛᴀᴡᴀɴ\nᵈⁱᵈᵃᵖᵃᵗᵏᵃⁿ ᵏᵃʳᵉⁿᵃ ᵐᵉᵐⁱˡⁱᵏⁱ ¹ ʲᵘᵗᵃ ᵐᵒⁿᵉʸ\n"
            : ""
        } ${
          user.trophy > 0
            ? "⚜️ ɢᴏᴅ \nᵖˡᵃʸᵉʳ ⁱⁿⁱ ᵇᵉʳʰᵃˢⁱˡ ᵐᵉⁿᵍᵃˡᵃʰᵏᵃⁿ ᶠⁱⁿᵃˡ ᵇᵒˢˢ ˢᵉᵃˢᵒⁿ ¹\n"
            : ""
        } ${
          user.sword > 10
            ? "🌀 sᴘᴇᴄɪᴀʟ ᴜsᴇʀ \nᵐᵉᵐⁱˡⁱᵏⁱ ⁱᵗᵉᵐ ᵉˣᶜˡᵘˢⁱᵛᵉ ᵗᵉᵍᵘʰ \n"
            : ""
        }  ${user.chip > 99 ? "🦹🏻‍♂️ ᴅᴇᴡᴀ ᴊᴜᴅɪ \nᵐᵉᵐⁱˡⁱᵏⁱ ¹⁰⁰ ᶜʰⁱᵖ \n" : ""} ${
          user.strength > 999 ? "🦾 sᴇᴍɪ-ɢᴏᴅ\nᵐᵉᵐⁱˡⁱᵏⁱ ˢᵗʳᵉⁿᵍᵗʰ ¹⁰⁰⁰\n" : ""
        } ${user.speed > 1000 ? "🦿 ғʟᴀsʜ\nᵐᵉᵐⁱˡⁱᵏⁱ ᵏᵉᶜᵉᵖᵃᵗᵃⁿ ¹⁰⁰⁰\n" : ""} ${
          user.defense > 999 ? "📿 ᴋᴇʙᴀʟ\nᵐᵉᵐⁱˡⁱᵏⁱ ᵈᵉᶠᵉⁿˢᵉ ¹⁰⁰⁰\n" : ""
        } ${user.trash > 10000 ? "🚮 ᴍᴀɴᴜsɪᴀ sᴀᴍᴘᴀʜ\nᵒʷⁿᵉᵈ ¹⁰ᵏ ᵗʳᵃˢʰ\n" : ""} 

𖨠──··· *ᴘᴇʀɪɴɢᴋᴀᴛ* 🏆
${rpg.emoticon("money")} ᴛᴏᴘ ᴍᴏɴᴇʏ *${usersmoney.indexOf(who) + 1}* ᴅᴀʀɪ *${
          usersmoney.length
        }*
${rpg.emoticon("bank")} ᴛᴏᴘ ʙᴀɴᴋ *${usersbank.indexOf(who) + 1}* ᴅᴀʀɪ *${
          usersbank.length
        }*
${rpg.emoticon("level")} ᴛᴏᴘ ʟᴇᴠᴇʟ *${userslevel.indexOf(who) + 1}* ᴅᴀʀɪ *${
          userslevel.length
        }*
${rpg.emoticon("diamond")} ᴛᴏᴘ ᴅɪᴀᴍᴏɴᴅ *${
          usersdiamond.indexOf(who) + 1
        }* ᴅᴀʀɪ *${usersdiamond.length}*
${rpg.emoticon("gold")} ᴛᴏᴘ ɢᴏʟᴅ *${usersgold.indexOf(who) + 1}* ᴅᴀʀɪ *${
          usersgold.length
        }*

𖨠──··· *ᴄᴏᴏʟᴅᴏᴡɴ* ♻️
${cooldowns}`
      : ""
  }
*✧ dungeon: ${user.lastdungeon == 0 ? "✅" : "❌"}*
*✧ mining: ${user.lastmining == 0 ? "✅" : "❌"}*
`.trim();

  await conn.reply(m.chat, caption, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: "ɪɴᴠᴇɴᴛᴏʀʏ | ° ᶜˡⁱᶜᵏ ᵗᵒ ʲᵒⁱⁿ ᵍʳᵒᵘᵖ ᶜʰᵃᵗ °",
        thumbnailUrl: "https://telegra.ph/file/a2d065634f4a7fb8c1752.jpg",
        renderLargerThumbnail: true,
        mediaUrl: "https://chat.whatsapp.com/LvwPR1agfbw4Lq8PqN7GBs",
        sourceId: botName,
        sourceUrl: "https://chat.whatsapp.com/LvwPR1agfbw4Lq8PqN7GBs",
      },
    },
  });
};
handler.help = ["inventory", "inv"];
handler.tags = ["rpg"];
handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;
