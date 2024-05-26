import _spam from "../../lib/antispam.js";

let handler = (m) => m;
handler.before = async function (m, { conn }) {
  const AntiSpam = db.data.antispam;

  //Respon listStore
  let store = m.isGroup ? global.db.data.chats[m.chat].store : false;
  if (store) {
    let listStore = global.db.data.chats[m.chat].store[m.body.toLowerCase()];
    if (listStore) {
      if (_spam.check("NotCase", m.senderNumber, AntiSpam)) return;
      _spam.add("NotCase", m.senderNumber, "10s", AntiSpam);
      m.reply(listStore.text);
    }
  }
};
export default handler;
