let handler = async (m, { conn, setReply }) => {
  let block = await conn.fetchBlocklist();
  setReply(
    "List Block:\n\n" +
      `Total: ${
        block == undefined ? "*0* Diblokir" : "*" + block.length + "* Diblokir"
      }\n` +
      block.map((v) => "⭔ @" + v.replace(/@.+/, "")).join`\n`
  );
};
handler.help = ["others"];
handler.tags = ["spesifikasi"];
handler.command = ["listblock"];
export default handler;
