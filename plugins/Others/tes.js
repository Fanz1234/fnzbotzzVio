import { generateWAMessageFromContent } from "baileys";
import fs from 'fs-extra'
let handler = async (m, { conn }) => {

  const contextInfo = {
    forwardingScore: 1,
    isForwarded: true,
    containsAutoReply: true,
    mentionedJid: [m.sender],
    forwardedNewsletterMessageInfo: {
    newsletterJid,
    serverMessageId: 100,
    newsletterName,
    },
    businessMessageForwardInfo: {
    businessOwnerJid: m.botNumber,
    },
    externalAdReply: {
    title: `${transformText('Bot WhatsApp Multi Device')}
    ${transformText(baileysVersion)}`,
    body:`Runtime ${transformText(runTime)} `,
    mediaType: 1,
    renderLargerThumbnail: true,
    //thumbnailUrl: links.getRandom(),
    //jpegThumbnail: fs.readFileSync('./media/thumb2.jpg'),
    thumbnail: fs.readFileSync('./media/thumb.jpg'),
    sourceUrl: 'https://whatsapp.com/channel/0029VaROGogGufIzmrgEdo3W', //global.myUrl,
    mediaUrl: global.myUrl,
    },
    };










let msg = generateWAMessageFromContent(m.chat, {
  contextInfo,
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: {
        jpegThumbnail: fs.readFileSync('./media/thumb.jpg'),
        thumbnail: fs.readFileSync('./media/thumb.jpg'),
        body: {
          text: "test"
        },
        footer: {
          text: "test"
        },
        header: {
          title: "test",
          subtitle: "test",
          hasMediaAttachment: true,
          imageMessage: fs.readFileSync('./media/thumb.jpg'),
          jpegThumbnail: fs.readFileSync('./media/thumb.jpg'),
          thumbnail: fs.readFileSync('./media/thumb.jpg'),
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: "{\"title\":\"title\",\"sections\":[{\"title\":\"title\",\"highlight_label\":\"label\",\"rows\":[{\"header\":\"header\",\"title\":\"menu nya\",\"description\":\"description\",\"id\":\"menu\"},{\"header\":\"header\",\"title\":\"speed\",\"description\":\"description\",\"id\":\"speed\"}]}]}"
            },
            {
              name: "quick_reply",
              buttonParamsJson: "{\"display_text\":\"dashboard\",\"id\":\"dashboard\"}"
            }
          ]
        }
      }
    }
  }
}, {});

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
});


}

handler.command =['tes']
export default handler;