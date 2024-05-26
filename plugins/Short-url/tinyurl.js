import fetch from "node-fetch";
let handler = async (m, { conn, q, args, setReply }) => {
  if (args.length < 1) return setReply(`Masukkan link`);
  if (!q || !q.startsWith("http")) return setReply(`Masukkan link`);
  const fetchText = (url, optiono) => {
    return new Promise((resolve, reject) => {
      return fetch(url, optiono)
        .then((response) => response.text())
        .then((text) => resolve(text))
        .catch((err) => {
          console.log(color(err, "red"));
          reject(err);
        });
    });
  };
  let okok = await fetchText(`https://tinyurl.com/api-create.php?url=${q}`);
  let shorti = `*Result : ${okok}*`;
  setReply(shorti);
};

handler.help = ["tinyurl"];
handler.tags = ["uploader"];
handler.command = ["tinyurl"];
export default handler;
