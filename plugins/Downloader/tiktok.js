import fetch from "node-fetch";
import { miftah } from "../../lib/restApi.js";
let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  if (!q) return m.reply("Masukan link tiktok");
  if (!q.startsWith("http")) return m.reply("Masukan link tiktok");
  m.reply(wait);

  try {


    const { tikdown  } = require("nayan-media-downloader")
    let res = await tikdown (q)
    //log(res)
    //let url = res.data[0].url
    //conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
   
    let {view,comment,play,share,duration,title,video,audio } = res.data

    conn.sendMessage(m.chat, { video: { url:video }, caption: title }, { quoted: m });

  } catch(err) {


    const data = new miftah();
    let res = await data.tiktokV2(q);
    //log(res)
    if (res.data.status !== undefined && res.data.status == "404")
      throw "Video not found!";
    let url = res.data.nowm
    conn.sendMessage(m.chat, { video: { url },caption: res.data.title }, { quoted: m });

  }
};
handler.help = ["downloader"];
handler.tags = ["internet"];
handler.command = ["tt", "tiktok"];

export default handler;
