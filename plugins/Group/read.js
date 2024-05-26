let handler = async (m, { q, conn, isOwner, setReply }) => {

const isQuotedViewOnce = m.type === "extendedTextMessage" && m.content.includes("viewOnceMessage");
const { downloadContentFromMessage } = (await import("baileys")).default;

if (!isQuotedViewOnce) return setReply("Reply viewonce nya");
let view = m.quoted.message;
let Type = Object.keys(view)[0];

let media = await downloadContentFromMessage(
view[Type],
Type == "imageMessage" ? "image" : "audioMessage" ? "audio" : "video"
);



let buffer = Buffer.from([]);
  
for await (const chunk of media) {
  log(chunk)
buffer = Buffer.concat([buffer, chunk]);
}
  
if (/video/.test(Type)) {
    conn.sendFile(m.chat, buffer, "media.mp4", view[Type].caption || "", m);
  } else if (/audio/.test(Type)) {
    conn.sendMessage(m.chat, {audio:buffer},{quoted:m})
  } else if (/image/.test(Type)) {
    if(!m.isGroup){
      conn.sendFile(m.botNumber, buffer, "media.jpg", view[Type].caption || "", m);
    } else conn.sendFile(m.chat, buffer, "media.jpg", view[Type].caption || "", m);
  }
};
handler.help = ["reply viewonce"];
handler.tags = ["admin"];
handler.command = ["read","aaaa"];
//handler.group = true;
//handler.admiin = true;
export default handler;
