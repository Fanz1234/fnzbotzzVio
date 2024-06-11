let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  try {
    if (!q) return m.reply("Maukan perintah nama/atau apalah");
    m.reply(wait)
    let url = `https://aemt.me/ai/text2img?text=${q}`;
    await conn.sendMessage(
      m.chat,
      { image: { url }, caption: "Nih..." },
      { quoted: m }
    );
  } catch (err) {
    throw `${err}`;
  }
};
handler.help = ["chatgpt"];
handler.tags = ["internet", "bard", "gpt"];
handler.command = ["texttoimg", "text2img"];

export default handler;
