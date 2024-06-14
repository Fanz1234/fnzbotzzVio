import fetch from "node-fetch";
let handler = async (
  m,
  { q, conn, isOwner, setReply, args, usedPrefix, command }
) => {
  if (!q)
    throw `uhm.. url nya mana?\n\ncontoh:\n${
      usedPrefix + command
    } https://t.me/addstickers/namapack`;
  if (!q.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `url salah`;
  let packName = args[0].replace("https://t.me/addstickers/", "");

  let gas = await fetch(
    `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(
      packName
    )}`,
    { method: "GET", headers: { "User-Agent": "GoogleBot" } }
  );
  log(gas);
  if (!gas.ok) throw `eror`;

  let json = await gas.json();
  m.reply(
    `*Total stiker:* ${json.result.stickers.length}
    Estimasi selesai: ${json.result.stickers.length * 1.5} detik`.trim()
  );

  for (let i = 0; i < json.result.stickers.length; i++) {
    let fileId = json.result.stickers[i].thumb.file_id;

    let gasIn = await fetch(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`
    );

    let jisin = await gasIn.json();

    // conn.sendMessage(m.chat, { url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path }, MessageType.sticker)
    let stiker =
      "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" +
      jisin.result.file_path;
    log(stiker);
    await conn.sendMessage(m.chat, { sticker: { url: stiker } });
    // conn.toSticker(m.chat,stiker,m)
    await sleep(1500);
  }
  m.reply("Selesai");
};

handler.command = ["stikertele", "stickertele"];
export default handler;
