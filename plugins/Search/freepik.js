import axios from "axios";
const cheerio = require('cheerio');
let handler = async (m, { conn, text }) => {
  if (!text) throw "input text";
  try {
    await m.reply(wait);
    let res = await FreePik(text);
    log(res)
    let rdm = res[Math.floor(Math.random() * res.length)];
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: rdm,
        },
        caption: "[ RESULT ]",
      },
      {
        quoted: m,
      }
    );
  } catch (e) {
    throw e;
  }
};
handler.help = ["freepik"];
handler.tags = ["internet"];
handler.command = /^freepik$/i;

export default handler;

async function FreePik(query) {
  try {
    const response = await axios.get(`https://www.freepik.com/search?format=search&query=${query}&type=psd`);
    const $ = cheerio.load(response.data);
    const imgUrls = [];

    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc && imgSrc.startsWith('https://img.freepik.com')) {
        imgUrls.push(imgSrc);
      }
    });

    return imgUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
/*
import {JSDOM} from "jsdom"


async function FreePik(query) {
let res = await fetch('https://www.freepik.com/search?format=search&query=' +query+ '&type=psd')
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.getElementsByTagName('img');
    let img = []
for (var i = 0; i < collection.length; i++) {
	if (collection[i].getAttribute('src').startsWith('https://img.freepik.com')) {
	img.push(collection[i].getAttribute('src'))
	}
}
let newArr = img.filter(el => el != null);
return newArr
}
*/
