let handler = (m) => m;

handler.before = async function () {
};

export default handler;
 

setInterval(async () => {
  try {
    const settings = global.db.data.settings["settingbot"];

    //AUTO BIO BOT
    if (settings) {
      if (!isNumber(settings.totalOrder)) settings.totalOrder = 0;
    } else global.db.data.settings["settingbot"] = { totalOrder: 0 };

    let sewa = Object.values(db.data.chats).filter((i) => i.expired !== 0);
    if (settings && settings.autoBio && sewa.length !== settings.totalOrder) {
      Log("Update autobio")
      let bio = `📊 Total order: ${sewa.length} group`;
      await conn.updateProfileStatus(bio).catch((_) => _);
      settings.totalOrder = sewa.length;
    }
  } catch (err) {
    Log(err);
  }
}, 3000)