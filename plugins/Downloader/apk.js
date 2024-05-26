import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from 'fs-extra'

let handler = async (m, { conn,q, args, usedPrefix, command }) => {
  const { apkdl, apkcombo, aptoide } = await import("../../lib/scraper-apk.js");
  let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
  if (q.startsWith("http")) {
    let res = await apkdl.download(q);
    Log(res);
    conn.sendMessage(
      m.chat,
      {
        document: { url: res.link },
        mimetype: "application/vnd.android.package-archive",
        fileName: res.appname,
      },
      { quoted: m }
    );
    return;
  }

  let nana = await aptoide.search(q);

  let teks = "Hasil\n\n";
  let ah = await aptoide.download(nana[0].id);
  Log(ah);

  let contextInfo = {
    forwardingScore: 50,
    isForwarded: true,
    externalAdReply: {
      showAdAttribution: false,
      title: `${baileysVersion}`,
      body: `Runtime ${runTime} `,
      previewType: "PHOTO",
      thumbnailUrl: ah.img,
      sourceUrl: ah.link,
    },
  };

  let caption = Object.entries(ah)
    .map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`)
    .join("\n");
  await conn.sendMessage(
    m.chat,
    {
      contextInfo,
      caption,
      document: { url: ah.link },
      jpegThumbnail,
      mimetype: "application/vnd.android.package-archive",
      fileName: ah.appname,
    },
    { quoted: m }
  );
};

handler.help = handler.alias = ["apk"];
handler.tags = ["downloader"];
handler.command = /^(apk)$/i;

export default handler;

async function appDl(url) {
  let res = await fetch("https://apk.support/gapi/index.php", {
    method: "post",
    body: new URLSearchParams(
      Object.entries({
        x: "downapk",
        t: 1,
        google_id: url,
        device_id: "",
        language: "en-US",
        dpi: 480,
        gl: "SUQ=",
        model: "",
        hl: "en",
        de_av: "",
        aav: "",
        android_ver: 5.1,
        tbi: "arm64-v8a",
        country: 0,
        gc: undefined,
      })
    ),
  });
  let $ = cheerio.load(await res.text());
  let fileName = $("div.browser > div.dvContents > ul > li > a")
    .text()
    .trim()
    .split(" ")[0];
  let download = $("div.browser > div.dvContents > ul > li > a").attr("href");
  if (!download) throw "Can't download the apk!";
  let mimetype = (await fetch(download, { method: "head" })).headers.get(
    "content-type"
  );
  return { fileName, mimetype, download };
}
