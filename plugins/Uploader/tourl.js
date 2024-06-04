import { unlinkSync } from "fs";
const { FileIo, FileUgu, TelegraPh, AnonFiles, FileDitch, PomF2, Top4top } =
  await import(`../../lib/uploader.js?v=${Date.now()}`).catch((err) =>
    console.log(err)
  );

import axios from "axios";
import FormData from "form-data";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn, command, __dirname }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime || mime == "conversation") throw "apa yang mau di upload ?";
  let out,
    img = await q.download?.();
  let tmp = true;
  try {
    out = await tmpFile(img);
    if (!out) throw Error();
    tmp = true;
  } catch {
    out = await TelegraPh(img);
    tmp = false;
  }

  if (!tmp) return m.reply(out);

  if (!out) return m.reply("error uploading file");
  if (typeof out === "string" || out instanceof String)
    m.reply(`[ LINK ]\n${out}`);
  else {
    out = out.data.file;
    let meta = out.metadata;
    let txt =
      `*[ File Uploaded ]*\n` +
      `\n*id :* ${meta.id}` +
      `\n*name :* ${meta.name}` +
      `\n*size :* ${meta.size.readable}` +
      `\n*url_short :* _${out.url.short}_` +
      `\n*url_full :* _${out.url.full}_`;
    m.reply(txt);
  }
};

handler.help = ["telegraph"];
handler.tags = ["uploader"];
handler.command = ["tourl"];
export default handler;

const tmpFile = (buffer) => {
  return new Promise(async (resolve, reject) => {
    const { ext, mime } = await fileTypeFromBuffer(buffer);
    const form = new FormData();
    form.append("file", buffer, {
      filename: new Date() * 1 + "." + ext,
      contentType: mime,
    });

    const { data } = await axios
      .post("https://tmpfiles.org/api/v1/upload", form, {
        headers: {
          ...form.getHeaders(),
        },
      })
      .catch((e) => resolve(e?.response));
    const url = new URL(data.data.url);
    resolve("https://tmpfiles.org/dl" + url.pathname);
  });
};
