const gis = require("g-i-s");
let {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("baileys");

let handler = async (m, { conn, q,args, command,setReply,prefix }) => {
  if (!q)
    return m.reply(
      `Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`
    );
  m.reply(mess.wait);
  var jumlah;
  if (q.includes("--")) jumlah = q.split("--")[1];
  pinterest(q.replace("--" +jumlah , "")).then(async (data) => {

let nextButton = !m.isGroup? {
  name: "quick_reply",
  buttonParamsJson: `{"display_text":"Next","title":"Next","id":"${prefix}pinterest ${q}"}`,
} : {}
    
let result = data.result.slice(0, 5)
      let caption = result.map(async (i) => {
        return {
          header: {
              hasMediaAttachment: true,
              ...(await prepareWAMessageMedia(
                  {
                      image: {
                          url: i,
                      },
                  },
                  { upload: conn.waUploadToServer },
              )),
          },
          body: { text: `${q}` },
          nativeFlowMessage: {
            buttons: [nextButton,
              {
                  name:  'cta_url',
                  buttonParamsJson: `{"display_text":"Url","url":"${i}","merchant_ur":"${i}"}`,
              }, //{ display_text: button.text, url: button.id, merchant_url: button.id }
              
            ]
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
                          text: "pinterest search",
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







        //conn.sendMessage(m.chat, { image: { url: data.result[i] } });
   
      });

     







  





};
handler.help = ["pinterest2"];
handler.tags = ["info"];
handler.command = /^(pinterest2)$/i;
export default handler;



async function pinterest(query) {
  return new Promise((resolve, reject) => {
    let err = { status: 404, message: "Terjadi kesalahan" };
    gis({ searchTerm: query + " site:id.pinterest.com" }, (er, res) => {
      if (er) return err;
      let hasil = {
        status: 200,
        creator: "chibot",
        result: [],
      };
      res.forEach((x) => hasil.result.push(x.url));
      resolve(hasil);
    });
  });
}



 


    
















  
