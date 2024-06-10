import { youtube } from "@xct007/frieren-scraper";
//import { generateWAMessageFromContent, prepareWAMessageMedia } from "@adiwajshing/baileys";
let {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("baileys");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukkan query! \n\nContoh: \n${usedPrefix + command} Alan walker faded`);
    //global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false;
    m.reply(wait)
    if (!m.isGroup) {
        let result = await youtube.search(text);
        result = result.slice(0, 5); // Batasi hasil hanya menjadi lima
        let caption = result.map(async (v, i) => {
            return {
                header: {
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia(
                        {
                            image: {
                                url: v.thumbnail,
                            },
                        },
                        { upload: conn.waUploadToServer },
                    )),
                },
                body: { text: `🌐 Title: ${v.title}
⏱ Duration : ${v.duration}
📤 Upload : ${v.uploaded}
👁 Views : ${v.views}
🔗 Link : ${v.url}` },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "quick_reply",
                            buttonParamsJson: `{"display_text":"${v.title}","title":"Video?","id":".ytmp4 ${v.url}"}`,
                        },
                        {
                            name: "quick_reply",
                            buttonParamsJson: `{"display_text":"${v.title}","title":"Audio?","id":".ytmp3 ${v.url}"}`,
                        },
                    ],
                },
            };
        });
        caption = await Promise.all(caption); // Tunggu semua operasi di pemetaan selesai
        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: {
                                text: "youtube search",
                            },
                            carouselMessage: {
                                cards: caption, // Diganti caption dari hasil pencarian
                                messageVersion: 1,
                            },
                        },
                    },
                },
            },
            { quoted: m },
            {},
        );

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });
    } else {
        let result = await youtube.search(text);
        let caption = result.map((v, i) => {
            return {
                title: v.title,
                highlight_label: "Popular",
                rows: [
                    {
                        header: 'Audio',
                        title: v.title,
                        description: `Link: ${v.url}`,
                        id: '.ytmp3 ' + v.url
                    },
                    {
                        header: 'Video',
                        title: v.title,
                        description: `Link: ${v.url}`,
                        id: '.ytmp4 ' + v.url
                    }
                ]
            }
        })
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: {
                        body: {
                            text: `Silahkan pilih di bawah ini`,
                        },
                        footer: {
                            text: global.fake1
                        },
                        header: {
                            title: "YouTube search",
                            subtitle: "",
                            hasMediaAttachment: false,
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "List Youtube Search",
                                        sections: [
                                            ...caption
                                        ]
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }, { quoted: m }, {});
        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    }
}

handler.help = ['ytsearch'];
handler.tags = ['search'];
handler.command = ['yts','ytsearch']
handler.limit = true;

export default handler;