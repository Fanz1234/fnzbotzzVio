let handler = async (m, { conn, q, setReply, prefix, command }) => {
  if (!q.includes("|"))
    return setReply(`Contoh ${prefix}${command}githubdl username|repository`);
  let url = `https://github.com/${q.split("|")[0]}/${
    q.split("|")[1]
  }/archive/refs/heads/master.zip`;
  //ByRizkyAdi
  console.log("Done");
  setReply(`Waiting for compress to zip`);
  await conn.sendMedia(m.chat, url, m, { fileName: q.split("|")[1] });
};
handler.help = ["githubdl"];
handler.tags = ["downloader"];
handler.command = ["githubdl"];
export default handler;
