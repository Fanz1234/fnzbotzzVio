import fetch from "node-fetch";
import fs from "fs";

let handler = async (m, { conn,setReply }) => {

    let flaaa = [
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=welcome',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=welcome',
   // 'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=welcome',
  //  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=welcome',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]
    let imgr = flaaa.getRandom()



let teks ='https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=SEWA%20BOT'

  

let photo = pickRandom(fotoRandom)
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
externalAdReply:{
showAdAttribution: false,
title: botName,
body:baileysVersion,
sourceUrl:"https://wa.me/c/6285812373011",
mediaType: 1,
renderLargerThumbnail : true,
//thumbnail: await (await fetch(imgr + "Sewa Bot")).buffer(),
thumbnailUrl:teks,  
}
}


  
    let text =`
Berikut adalah list harga untuk order bot per grup

––––––『 *ORDER BOT* 』––––––

🧸 *Order 7 hari*
- Harga Rp. 3000
- Masa aktif 7 Hari

🎟️ *Order 15 hari*
- Harga Rp. 5000 
- Masa aktif 15 Hari

🎫 *Order 1 bulan*
- Harga Rp. 10.000
- Masa aktif 30 Hari

🔖 *Order 2 bulan*
- Harga Rp. 20.000 
- Premium 
- Masa aktif  60 Hari 

🏷️ *Order 4 bulan*
- Harga Rp. 40.000
- Premium
- Premium all admin
- Masa aktif 120 Hari

💎 *Order 6 bulan*
- Harga Rp. 60.000 
- Premium
- Premium all admin
- Masa aktif  180 Hari 

✨ *Order 8 bulan*
- Harga Rp. 80.000 
- Premium
- Premium all admin
- Masa aktif  240 Hari

⭐ *Order 10 bulan*
- Harga Rp. 90.000 
- Premium
- Premium all admin
- Diskon Rp. 10.000
- Masa aktif  300 Hari

🌟 *Order 12 bulan*
- Harga Rp. 100.000 
- Premium
- Premium all admin
- Diskon Rp. 20.000
- Masa aktif  360 Hari 

•·–––––––––––––––––––––––––·• 

👑 *Fitur Premium*
• Limit tanpa batas
• Klaim lebih banyak EXP Harian
• Hidetag, mentionAll member
• Bisa membuat/mengubah watermark stiker
• Dapat menggunakan bot secara private
• Dapat menggunakan bot tanpa prefix/(.)
• Dan masih banyak lagi

•·–––––––––––––––––––––––––·•

💳 *Pembayaran:*
• QRIS
• Dana
• Shopeepay
• Seabank

•·–––––––––––––––––––––––––·•

📮 *Note:* ↓
• Bot on 24 jam nonstop
• Bot off ketika terjadi error/perbaikan fitur
• Silakan hubungi owner untuk order bot
• Owner wa.me/${nomerOwner}

𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘉𝘺 𝘕𝘰𝘥𝘦𝘫𝘴`;
 // setReply(text) 
conn.sendMessage(m.chat,{contextInfo,text},{quoted:m})
}
handler.command = ["sewabot","sewa","orderbot","order"];

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}