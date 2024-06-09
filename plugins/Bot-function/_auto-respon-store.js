import _spam from "../../lib/antispam.js";

let handler = (m) => m;
handler.before = async function (m, { conn }) {
  const AntiSpam = db.data.antispam;

  //Respon listStore
  let store = m.isGroup ? global.db.data.chats[m.chat].store : false;
  if (store) {
    let listStore = global.db.data.chats[m.chat].store[m.body];
    if (listStore) {
      if (_spam.check("NotCase", m.senderNumber, AntiSpam)) return;
      _spam.add("NotCase", m.senderNumber, "10s", AntiSpam);

      if(listStore.hasOwnProperty('text')){
        m.reply(listStore.text);
      } else conn.sendFile(m.chat, listStore.media, m.body, listStore.caption, m, false, {})


      
    }
  }
};
export default handler;



