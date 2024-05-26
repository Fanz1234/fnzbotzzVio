let handler = async (m, { conn, q, args, setReply, isOwner, command }) => {
  let teks = "\n\n––––––『 *TOTAL PLUGINS* 』––––––\n\n";
  for (let awokwkwk of Object.keys(plugins)) {
    teks += `• ${awokwkwk.replace(".js", "")}\n`;
  }
  teks += `\n*Total ada : ${Object.keys(plugins).length}*`;
  setReply(teks);
};
handler.help = ["owner"];
handler.tags = ["owner"];
handler.command = ["listplugin", "listplugins"];
handler.owner = true;

export default handler;
