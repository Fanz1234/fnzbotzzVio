let handler = async (m, { text,args, q, conn, setReply, isOwner }) => {
    
  const math = (teks) => {
    return Math.floor(teks);
  };
  let chat = db.data.chats[m.chat];
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[1] == "detik") {
    var timer = args[0] * `1000`;
  } else if (args[1] == "menit") {
    var timer = args[0] * `60000`;
  } else if (args[1] == "jam") {
    var timer = args[0] * `3600000`;
  } else if (args[1] == "hari") {
    var timer = args[0] * `86400000`;
  } else {
    return setReply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik");
  }
  setReply(`Open time ${q} dimulai dari sekarang`);
  let groupTime = db.data.others["groupTime"];
  if (!groupTime) db.data.others["groupTime"] = [];
  groupTime.push(m.chat);
  chat.open = Date.now() + math(timer)

};

handler.tags = ["group"];
handler.command = ["opentime"];

export default handler;
