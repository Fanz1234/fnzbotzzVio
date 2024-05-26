import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { mongoDB,redisDB } from '../lib/mongoDB.js';


export default async function () {
  const isNumber = (x) => typeof x === "number" && !isNaN(x);

global.isNumber = isNumber;

 global.db = new Low(
   global.mongodb !== ''?  new mongoDB(mongodb,dbName):
    new JSONFile(`database/database.json`), {}
)


  //global.DATABASE = global.db; // Backwards Compatibility
  global.loadDatabase = async function loadDatabase() {
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data = {
      allcommand: [],
      anonymous: [],
      blockcmd: [],
      banned: [],
      claim: [],
      data: [],
      lowfeature: [],
      antispam: [],
      dashboard: [],
      listerror: [],
      sticker: {},
      stickerBot: {},
      audio: {},
      hittoday: [],
      users: {},
      chats: {},
      settings: {},
      kickon: {},
      others: {},
      respon: {},
      contacts: {},
        menfess:{},
      ...(global.db.data || {}),
    };
  };
  await loadDatabase();

  const settings = global.db.data.settings["settingbot"];
  if (settings) {
    //Auto set
    if (!isNumber(settings.status)) setting.status = new Date() * 1;
    if (!("setmenu" in settings)) settings.setmenu = "document";
    if (!("docType" in settings)) settings.docType = "docx";
    if (!("Qoted" in settings)) settings.Qoted = "ftoko";
    if (!("autoBio" in settings)) settings.autoBio = false;
    if (!("multi" in settings)) settings.multi = true;
    if (!("prefix" in settings)) settings.prefix = "!";
    if (!("fake" in settings)) settings.fake = botName;
    if (!("autoblockcmd" in settings)) settings.autoblockcmd = false;
    if (!("fake1" in settings)) settings.fake1 = "Extream";
    if (!("replyType" in settings)) settings.replyType = "web";
    if (!("setwelcome" in settings)) settings.setwelcome = "type11";
    if (!("autoReport" in settings)) settings.autoReport = true;
    if (!("autoLevel" in settings)) settings.autoLevel = true;
    if (!("autoSticker" in settings)) settings.autoSticker = false;
    if (!("publik" in settings)) settings.publik = true;
    if (!("autoDelSessi" in settings)) settings.autoDelSessi = false;
    if (!("autoDelTmp" in settings)) settings.autoDelTmp = false;
    if (!("gcOnly" in settings)) settings.gcOnly = false;
    if (!isNumber(settings.delay)) settings.delay = 0;
  } else {
    global.db.data.settings["settingbot"] = {
      status: new Date() * 1,
      setmenu: "document",
      docType: "docx",
      Qoted: "ftoko",
      autoBio: false,
      multi: true,
      prefix: "!",
      fake: botName,
      autoblockcmd: false,
      fake1: "Extream",
      replyType: "web",
      setwelcome: "type11",
      autoReport: true,
      autoLevel: true,
      autoSticker: false,
      publik: true,
      autoDelSessi: false,
      autoDelTmp: false,
      gcOnly : false,
      delay:0,
    };
  }

  if (global.db.data) global.db.write();
} //akhir dari export default
