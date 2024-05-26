import fetch from "node-fetch";
import moment from "moment-timezone";
const cooldown = 300000;
let handler = async (m, { coon, usedPrefix }) => {
  try {
    let ct = [
      "AF",
      "AX",
      "AL",
      "DZ",
      "AS",
      "AD",
      "AO",
      "AI",
      "AQ",
      "AG",
      "AR",
      "AM",
      "AW",
      "AU",
      "AT",
      "AZ",
      "BS",
      "BH",
      "BD",
      "BB",
      "BY",
      "BE",
      "BZ",
      "BJ",
      "BM",
      "BT",
      "BO",
      "BQ",
      "BA",
      "BW",
      "BV",
      "BR",
      "IO",
      "BN",
      "BG",
      "BF",
      "BI",
      "KH",
      "CM",
      "CA",
      "CV",
      "KY",
      "CF",
      "TD",
      "CL",
      "CN",
      "CX",
      "CC",
      "CO",
      "KM",
      "CG",
      "CD",
      "CK",
      "CR",
      "CI",
      "HR",
      "CU",
      "CW",
      "CY",
      "CZ",
      "DK",
      "DJ",
      "DM",
      "DO",
      "EC",
      "EG",
      "SV",
      "GQ",
      "ER",
      "EE",
      "ET",
      "FK",
      "FO",
      "FJ",
      "FI",
      "FR",
      "GF",
      "PF",
      "TF",
      "GA",
      "GM",
      "GE",
      "DE",
      "GH",
      "GI",
      "GR",
      "GL",
      "GD",
      "GP",
      "GU",
      "GT",
      "GG",
      "GN",
      "GW",
      "GY",
      "HT",
      "HM",
      "VA",
      "HN",
      "HK",
      "HU",
      "IS",
      "IN",
      "ID",
      "IR",
      "IQ",
      "IE",
      "IM",
      "IL",
      "IT",
      "JM",
      "JP",
      "JE",
      "JO",
      "KZ",
      "KE",
      "KI",
      "KP",
      "KR",
      "XK",
      "KW",
      "KG",
      "LA",
      "LV",
      "LB",
      "LS",
      "LR",
      "LY",
      "LI",
      "LT",
      "LU",
      "MO",
      "MK",
      "MG",
      "MW",
      "MY",
      "MV",
      "ML",
      "MT",
      "MH",
      "MQ",
      "MR",
      "MU",
      "YT",
      "MX",
      "FM",
      "MD",
      "MC",
      "MN",
      "ME",
      "MS",
      "MA",
      "MZ",
      "MM",
      "NA",
      "NR",
      "NP",
      "NL",
      "AN",
      "NC",
      "NZ",
      "NI",
      "NE",
      "NG",
      "NU",
      "NF",
      "MP",
      "NO",
      "OM",
      "PK",
      "PW",
      "PS",
      "PA",
      "PG",
      "PY",
      "PE",
      "PH",
      "PN",
      "PL",
      "PT",
      "PR",
      "QA",
      "RS",
      "RE",
      "RO",
      "RU",
      "RW",
      "BL",
      "SH",
      "KN",
      "LC",
      "MF",
      "PM",
      "VC",
      "WS",
      "SM",
      "ST",
      "SA",
      "SN",
      "CS",
      "SC",
      "SL",
      "SG",
      "SX",
      "SK",
      "SI",
      "SB",
      "SO",
      "ZA",
      "GS",
      "SS",
      "ES",
      "LK",
      "SD",
      "SR",
      "SJ",
      "SZ",
      "SE",
      "CH",
      "SY",
      "TW",
      "TJ",
      "TZ",
      "TH",
      "TL",
      "TG",
      "TK",
      "TO",
      "TT",
      "TN",
      "TR",
      "XT",
      "TM",
      "TC",
      "TV",
      "UG",
      "UA",
      "AE",
      "GB",
      "US",
      "UM",
      "UY",
      "UZ",
      "VU",
      "VE",
      "VN",
      "VG",
      "VI",
      "WF",
      "EH",
      "YE",
      "ZM",
      "ZW",
    ];
    let ke = await fetch(
      `https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`
    );
    let kt = await ke.json();
    let user = global.db.data.users[m.sender];
    let timers = cooldown - (new Date() - user.lastadventure);
    if (user.health < 80)
      return m.reply(
        `ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs ʙᴇʟᴏᴡ 80﹗\nᴩʟᴇᴀsᴇ ʜᴇᴀʟ ❤ ғɪʀsᴛ ᴛᴏ ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴀɢᴀɪɴ.`
      );
    if (user.strength < 20)
      return conn.reply(
        m.chat,
        `ᴋᴀᴍᴜ ʙᴇʟᴜᴍ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ ᴜɴᴛᴜᴋ ᴍɪɴɪɴɢ ᴋᴀᴍᴜ ʜᴀʀᴜs ᴍᴇᴍᴘᴜɴʏᴀɪ 20 💪🏻 \n\n Saat Ini Kekuatan Mu Hanya ${user.strength} 💪🏻 \n ᴘᴇʀɢɪ ʟᴀᴛɪʜ ғɪsɪᴋᴍᴜ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ .ʟᴀᴛɪʜ `,
        m
      );
    if (new Date() - user.lastadventure <= cooldown)
      return m.reply(`ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ *ᴀᴅᴠᴇɴᴛᴜʀᴇ*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${conn.msToTime(new Date() - user.lastadventure)}`);

    let rewards = await reward(user);
    let text = `🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴛᴏ *${kt[1][0].name}*

❏ ––––––『
┊☃︎  *ɪᴅ :* ${kt[1][0].id}
┊☃︎  *ᴄɪᴛʏ :* ${kt[1][0].capitalCity}
┊☃︎  *ʟᴏɴɢɪᴛᴜᴅᴇ :* ${kt[1][0].longitude}
┊☃︎  *ʟᴀᴛɪᴛᴜᴅᴇ :* ${kt[1][0].latitude}
┗━═┅═━––––––๑\n

ᴀᴅᴠᴇɴᴛᴜʀᴇ ғɪɴɪsʜ (. ❛ ᴗ ❛.)
`;

    for (const lost in rewards.lost)
      if (lost in user) {
        const total = rewards.lost[lost].getRandom();
        Log(`${lost} : ${total}`);
        user[lost] -= total * 1;
        if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${total}`;
      }

    text += "\n\n🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :";
    for (const rewardItem in rewards.reward)
      if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom();
        //Log(`${rewardItem} ${total}`)
        user[rewardItem] += total * 1;
        if (total)
          text += `\n➠ ${global.rpg.emoticon(
            rewardItem
          )}${rewardItem}: ${total}`;
      }
    await conn.adReply(
      m.chat,
      text,
      "",
      "",
      `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`,
      "",
      m
    );
    user.lastadventure = new Date() * 1;
  } catch (err) {
    m.reply('Terjadi error silakan ulangi lagi')
  }
};
handler.help = ["adventure"];
handler.tags = ["rpg"];
handler.command = /^adv(entur(es?)?)?$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

function reward(user = {}) {
  let rewards = {
    reward: {
      money: [2087, 1086, 1888, 3008],
      exp: [925, 1231, 451, 646],
      trash: [102, 100, 70, 80],
      potion: [2, 1, 1, 3, 4],
      rock: [2, 1, 1, 3, 4],
      wood: [2, 1, 1, 3, 4],
      string: [2, 1, 1, 3],
      common: [91, 5, 34, 56, 12],
      uncommon: [5, 1, 18, 1, 3],
      mythic: [9, 0, 4, 0, 0, 1, 0, 2, 0],
      legendary: [0, 3, 0, 0, 5, 0, 0, 1, 0, 9],
      emerald: [0, 1, 0, 0, 0],
      pet: [0, 1, 0, 0, 0],
      iron: [0, 0, 0, 1, 0, 0],
      gold: [0, 0, 0, 0, 0, 1, 0],
      diamond: [9, 4, 0, 0, 1, 0, 1, 0],
    },
    lost: {
      health: [80, 75, 85, 90, 65],
      //armordurability: (15 - user.armor) * 7
    },
  };
  return rewards;
}
