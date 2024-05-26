import { miftah, nekohime } from "../../lib/restApi.js";
let handler = async (m, { command, q, conn, prefix, setReply }) => {
  if (!q || !q.startsWith("https"))
    return setReply(
      `Linknya?\nContoh: ${
        prefix + command
      } https://www.instagram.com/p/CKXZ1Z1JZK/`
    );
  setReply(mess.wait);
  try {

    const { ndown } = require("nayan-media-downloader")
    let res = await ndown(q)
   // log(res)
    //let url = res.data[0].url
    //conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
    let result = res.data

    
    for (let i of result ){

      if(i.url.startsWith('https://d.rapidcdn.app')){
        let url = i.url;
        await sleep(1000)
        conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
      } else if(i.url.startsWith('https://scontent.cdninstagram.com')){
        let url = i.url;
        await sleep(1000)
        conn.sendMessage(m.chat, { image: { url } }, { quoted: m });
    
      }
    
    }


  } catch (err) {
    log(err);
    const data = new nekohime();
    let res = await data.instagram(q);
    let result = res.result.data
    
for (let i of result ){

  if(i.type == 'video'){
    let url = i.url;
    await sleep(1000)
    conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
  } else if(i.type == 'image'){
    let url = i.url;
    await sleep(1000)
    conn.sendMessage(m.chat, { image: { url } }, { quoted: m });

  }

}

   
   
  }
};
handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
