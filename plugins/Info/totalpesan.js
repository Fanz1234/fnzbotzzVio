let handler = async (m, { conn, setReply,store }) => {
    if(!m.isGroup) throw mess.only.group
  const totalPesan = {};
  const messages = store.messages[m.chat].array;

  if (!totalPesan[m.chat]) {
    totalPesan[m.chat] = { total: {} };
  }

  const participantCounts = totalPesan[m.chat].total;

  Object.values(messages).forEach(
    ({ key }) =>
      (participantCounts[key.participant] =
        (participantCounts[key.participant] || 0) + 1)
  );

  const sortedData = Object.entries(participantCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
  const totalPeople = sortedData.length;

  const pesan = sortedData.map(([jid, total], index) => 
  `*${index + 1}.* ${jid.replace(/(\d+)@.+/,"$1")}: *${total}* pesan`
  ).join("\n");

  m.reply(`*Total Pesan Terakhir*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`,
    {
      contextInfo: {
        mentionedJid: sortedData.map(([jid]) => jid),
      },
    }
  );
};

handler.tags = ["info"];
handler.command = ["totalpesan","tp"];
export default handler;
