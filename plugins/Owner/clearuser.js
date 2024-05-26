let handler = async (m, { conn, isOwner, isPremium, setReply }) => {
  if (!isOwner) return setReply(mess.only.owner);
  await sleep(2000);
  setReply("Membersihkan user yang tidak mendaftar");
  Object.keys(db.data.users).forEach((i) => {
    if (
      db.data.users[i].registered === false &&
      db.data.users[i].premiumTime == 0
    ) {
      delete db.data.users[i];
    }
  });
  setReply("Sukses");
};
handler.help = ["clearusers"];
handler.tags = ["owner"];
handler.command = /^(clearusers|clearuser)$/i;
handler.owner = true;

export default handler;
