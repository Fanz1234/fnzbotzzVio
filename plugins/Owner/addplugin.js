let handler = async (m, { q, isOwner, setReply, command }) => {
  if (!isOwner) return setReply(mess.only.owner);
  if (!q) return setReply(`Example:\n${prefix + command} menu.js`);
  if (m.quoted.text) {
    let path = q.endsWith(".js") ? q : q + ".js";
    await require("fs").writeFileSync("plugins/" + path, m.quoted.text);
    setReply(`Saved ${path} to file!`);
  } else setReply(`Reply code`);
};
handler.command = ["addplugin", "addplpugions", "ap"];
handler.owner = true;
export default handler;
