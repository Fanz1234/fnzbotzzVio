import ms from "parse-ms";


let handler = async (m, { conn, setReply,isPremium,isOwner }) => {


const user = global.db.data.users[m.sender]
const chat = global.db.data.chats[m.chat]


//User
const userLevel = user? db.data.users[m.sender].level : false
const userExp = user? db.data.users[m.sender].exp : false
const userId = user? db.data.users[m.sender].id : false
const amountExp = Math.floor(Math.random() * 10) + 50
const requiredExp = userLevel == 0? 500 : 1000 * userLevel
const userPersen = userExp/requiredExp*100
const userVerified = user? db.data.users[m.sender].date : false














let link = "https://telegra.ph/file/419855356e8135488d144.jpg"
let contextInfo =
{
externalAdReply: {
showAdAttribution: false,
title: copyright,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: link,
}
}

//let ppimg = await conn.profilePictureUrl(sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
const { userXp, userLeveling, } = (await import("../../lib/user.js"))
try{
let sol = await conn.fetchStatus(m.sender)
var stst = sol.status == undefined ? '' : sol.status
} catch(err){
var stst = ""

}
let persenya =`${userPersen}`
let nana =`${userExp}/${requiredExp}`
let cekvip = ms(user.premiumTime - Date.now())
let premiumnya = `${cekvip.days} hari ${cekvip.hours} jam ${cekvip.minutes} menit ${cekvip.seconds}`
let prmm = isPremium? isOwner? 'Premium' : user? premiumnya : '' : 'Not Premium'




let teks = `––––––『 *PROFILE USER* 』––––––

🆔 Nama : ${m.pushname}
💳 Saldo  : Rp ${db.data.users[m.sender].money.toLocaleString()}
✅ Verified : ${userVerified}
📇 Status : ${isPremium ? 'Premium':'Free'}
🧬 Level : ${userLevel}
🔰 Grade : ${userLeveling(`${db.data.users[m.sender].level}`)}
⚡ Exp :  ${userXp(userPersen)} ${persenya.split(".")[0]}%
♻️ Total Exp : ${nana}
📟 User Hit : ${db.data.users[m.sender].hit}
🤖 Status Bot : ${isOwner ? 'Owner':'User'}
🕔 Expired : ${prmm}
📉 Limit : ${isPremium ? 'Unlimited' : `${db.data.users[m.sender].limit}/${limitCount}`}
📈 Limit Game : ${db.data.users[m.sender].glimit}/${gcounti.user}
📲 No : wa.me/${m.sender.split("@")[0]}
🧸 Bio : ${stst}`

conn.sendMessage(m.chat,{contextInfo, text:teks},{quoted:m})

};

handler.tags = ["info"];
handler.command = ["profile",'me'];
export default handler;



