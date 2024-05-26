import chalk from "chalk";

let handler = (m) => m;
handler.before = async function (m, { conn }) {
  //AUTO DEL VIRTEX
  if (m.virtex) {
    if (m.isGroup && m.isBotAdmin) conn.sendMessage(m.chat, { delete: m.key });
    if (!m.isGroup)
      conn.chatModify(
        {
          clear: {
            messages: [
              {
                id: m.id,
                fromMe: m.sender == m.botNumber ? true : false,
                timestamp: m.messageTimestamp,
              },
            ],
          },
        },
        m.sender,
        []
      );
    console.log(
      chalk.bgRedBright(chalk.black("[ VIRTEXT ]")),
      `Length: ${m.budy.length} from ${m.senderNumber} ${
        m.isGroup ? `Group ${m.groupName}` : ""
      }`
    );
  }
};
export default handler;
