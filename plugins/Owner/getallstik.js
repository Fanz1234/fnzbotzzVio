let handler = async (m, { conn, q, args, setReply }) => {
  let stiker1 = Object.keys(db.data.sticker);
  for (let jid of stiker1) {
    await conn.sendMessage(m.chat, {
      sticker: { url: db.data.sticker[jid].link },
    });
    await sleep(1000);
  }
}

handler.tags = ["info"];
handler.command = ["getallstik"];
handler.owner = true

export default handler;
