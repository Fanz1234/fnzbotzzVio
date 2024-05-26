let handler = async (m, { q, isOwner, setReply, command }) => {
  if (!isOwner) return setReply(mess.only.owner);
  if (!q) return setReply(`Example:\n${prefix + command} menu.js`);
  let path = q.endsWith(".js") ? q : q + ".js";
  await require("fs").unlinkSync("plugins/" + path);
  setReply(`Plugin ${path} telah di hapus!`);
};
handler.command = ["delplugin", "delplpugions", "dp"];
handler.owner = true;
export default handler;
