import moment from "moment-timezone";
import { getBuffer } from "../../lib/myfunc.js";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
  if (!m.isGroup) return setReply("Hanya bisa di dalam group");
  let _meta = await conn.groupMetadata(m.chat);
  let _img = await conn.profilePictureUrl(_meta.id, "image");
  let caption =
    `${_meta.subject} - Created on ${moment(_meta.creation * 1000).format(
      "ll"
    )}\n\n` +
    `*${_meta.participants.length}* Total Members\n*${
      _meta.participants.filter((x) => x.admin === "admin").length
    }* Admin\n*${
      _meta.participants.filter((x) => x.admin === null).length
    }* Not Admin\n\n` +
    `Group ID : ${_meta.id}`;
  await conn.sendMessage(
    m.chat,
    {
      caption,
      image: await getBuffer(_img),
    },
    { quoted: m }
  );
};

handler.tags = ["admin"];
handler.command = ["infogc"];
handler.group = true;
export default handler;
