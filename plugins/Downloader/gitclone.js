let handler = async (m, { conn, q, setReply, usedPrefix, command }) => {
  try {
    let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!q)
      return setReply(
        "link githubnya mana? contoh: https://github.com/saipulanuar/v18 "
      );
    if (!regex.test(q)) return setReply("link salah!");
    let [, user, repos] = q.match(regex) || [];
    let repo = repos.replace(/.git$/, "");
    let Url = `https://api.github.com/repos/${user}/${repos}/zipball`;
    let filename = (await fetch(Url, { method: "HEAD" })).headers
      .get("content-disposition")
      .match(/attachment; filename=(.*)/)[1];
    // 'attachment; filename=ilmanhdyt/ShiraoriBOT-Mdv2.5.1-251-g836cccd.zip'
    setReply(`*Mohon tunggu, sedang mengirim repository..*`);
    await conn.sendMedia(m.chat, Url, m, { fileName: filename });
  } catch (err) {
    setReply(mess.error.link);
  }
};
handler.help = ["gitclone"];
handler.tags = ["downloader"];
handler.command = ["gitclone"];
export default handler;
