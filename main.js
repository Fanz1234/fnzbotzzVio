//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import "./settings.js";
const {
  makeInMemoryStore,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  PHONENUMBER_MCC,
  getAggregateVotesInPollMessage
} = (await import("baileys")).default;
import fs, { readdirSync, existsSync, readFileSync, watch, statSync } from "fs";
import logg from "pino";
import { Socket, smsg, protoType } from "./lib/simple.js";
import CFonts from "cfonts";
import path, { join, dirname, basename } from "path";
import { memberUpdate, groupsUpdate } from "./message/group.js";
import { antiCall } from "./message/anticall.js";
import { connectionUpdate } from "./message/connection.js";
import { Function } from "./message/function.js";
const PhoneNumber = require('awesome-phonenumber')
const readline = require('readline');
const PORT = process.env.PORT || 3000   
import NodeCache from "node-cache";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import syntaxerror from "syntax-error";
import { format } from "util";
import chokidar from "chokidar";
import chalk from "chalk";
import util from "util";
const { proto, generateWAMessage,  areJidsSameUser } = require('baileys')


const __dirname = dirname(fileURLToPath(import.meta.url));
global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32"
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
/*
global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true))
};
*/
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

protoType();

let phoneNumber = "916909137213";

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const pairingCode = true; // process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const msgRetryCounterCache = new NodeCache();
const msgRetryCounterMap = (MessageRetryMap) => {};

CFonts.say("fearless", {
  font: "chrome",
  align: "left",
  gradient: ["red", "magenta"],
});

//Connect to WhatsApp
const connectToWhatsApp = async () => {
  await (await import("./message/database.js")).default();

  //const { state } = useSingleFileAuthState('./session.json')
  const { state, saveCreds } = await useMultiFileAuthState(session);
  const store = makeInMemoryStore({
    logger: logg().child({ level: "fatal", stream: "store" }),
  });

  const { version, isLatest } = await fetchLatestBaileysVersion();

  //Funtion agar pesan bot tidak pending
  const getMessage = async (key) => {
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
      return msg?.message || undefined;
    }
    // only if store is present
    return proto.Message.fromObject({});
  };

  //Untuk menyimpan session
  const auth = {
    creds: state.creds,
    /** caching makes the store faster to send/recv messages */
    keys: makeCacheableSignalKeyStore(
      state.keys,
      logg().child({ level: "fatal", stream: "store" })
    ),
  };

  //Funtion agar bisa pake button di bailey terbaru
  const patchMessageBeforeSending = (message) => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.listMessage ||
      message.templateMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }
    return message;
  };

  //Koneksi nih silakan di isi
const connectionOptions = {
version,
printQRInTerminal: !global.usePairingCode,
logger: logg({ level: 'fatal' }),
auth,
patchMessageBeforeSending,
getMessage,
MessageRetryMap,
//agent? :new HttpProxyAgent(proxy),
//browser: ['IOS','IOS','2.1.0'],
//browser: ['Chrome (Linux)'],
//browser: ['Chrome (Linux)', '', ''],
//browser: Browsers.macOS('Desktop'),
//browser: ["IOS","Safari"],
//browser: ["Linux","Safari"],
//browser: ["Ubuntu","Firefox"],
//browser: ["Linux","Firefox"],
//Jika ubuntu mengalami gangguan, ganti browser di atas
browser: ["Ubuntu","Chrome"],
keepAliveIntervalMs: 20000,
defaultQueryTimeoutMs: 20000,
connectTimeoutMs: 30000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
}
 
global.conn = Socket(connectionOptions)
connect(conn, PORT)
store.bind(conn.ev)
//conn.waVersion = version



if (global.usePairingCode && !conn.authState.creds.registered) {
if (useMobile) throw new Error('Cannot use pairing code with mobile api')

let phoneNumber
if (!!global.pairingNumber) {
phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '')

if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
process.exit(0)
}
} else {
phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

// Ask again when entering the wrong number
if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()
}
}

setTimeout(async () => {
let code = await conn.requestPairingCode(phoneNumber)
code = code?.match(/.{1,4}/g)?.join("-") || code
console.log(`Your Pairing Code : ${code}`)
}, 3000)
}

    

  conn.ev.process(async (events) => {
    //Cnnection Update
    if (events["connection.update"]) {
      if (db.data == null) await loadDatabase();
      const update = events["connection.update"];
      await connectionUpdate(connectToWhatsApp, conn, update);
    }

    // credentials updated -- save them
    if (events["creds.update"]) {
      await saveCreds();
    }

    
    // received a new message
    if (events["messages.upsert"]) {
      try{

      //if (global.db.data) global.db.write();
      const chatUpdate = events["messages.upsert"];
      if (!chatUpdate.messages) return //console.log('!chatUpdate.messages')
      let m = chatUpdate.messages[0];
    //console.log(m)
      //console.log('!chatUpdate.messages')
      //chatUpdate.messages[chatUpdate.messages.length - 1] // ||
      
   


      if (m.key && m.key.remoteJid === 'status@broadcast') {}
      if (!m.message) return  
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return  
      const { register } = await import(`./message/register.js?v=${Date.now()}`).catch((err) => console.log(err));
      m = await smsg(conn, m);
      const { handler } = await import(`./handler.js?v=${Date.now()}`).catch(
        (err) => console.log(err)
      );
      
      await register(m);
      if (global.db.data)  global.db.write();
      handler(conn, m, chatUpdate, store);
      } catch(err){
        log(err)
        let e = util.format(err)
         conn.sendMessage(ownerBot, {text:e})
      }
    }

    //Anti Call
    if (events.call) {
      const node = events.call;
      antiCall(db, node, conn);
    }

    //Member Update
    if (events["group-participants.update"]) {
      const anu = events["group-participants.update"];
      if (global.db.data == null) await loadDatabase();
      memberUpdate(conn, anu);
    }

    //------------------------------------[BATAS]--------------------------------\\
  });

  global.reloadHandler = async function (restatConn) {};

  const pluginFolder = path.join(__dirname, "./plugins");
  const pluginFilter = (filename) => /\.js$/.test(filename);
  global.plugins = {};

  async function filesInit(folderPath) {
    const files = readdirSync(folderPath);

    for (let file of files) {
      const filePath = join(folderPath, file);
      const fileStat = statSync(filePath);

      if (fileStat.isDirectory()) {
        // Jika file adalah sebuah direktori, panggil kembali fungsi filesInit dengan folder baru sebagai parameter
        await filesInit(filePath);
      } else if (pluginFilter(file)) {
        // Jika file adalah file JavaScript, lakukan inisialisasi
        try {
          const module = await import("file://" + filePath);
          global.plugins[file] = module.default || module;
        } catch (e) {
          conn.logger.error(e);
          delete global.plugins[file];
        }
      }
    }
  }

  filesInit(pluginFolder);

  global.reload = async (_ev, filename) => {
    //console.log(filename)
    if (pluginFilter(filename)) {
      let dir = global.__filename(join(filename), true); //pluginFolder,
      if (filename in global.plugins) {
        if (existsSync(dir))
          console.log(
            chalk.bgGreen(chalk.black("[ UPDATE ]")),
            chalk.white(`${filename}`)
          );
        // conn.logger.info(`re - require plugin '${filename}'`);
        else {
          conn.logger.warn(`deleted plugin '${filename}'`);
          return delete global.plugins[filename];
        }
      } else
        console.log(
          chalk.bgGreen(chalk.black("[ UPDATE ]")),
          chalk.white(`${filename}`)
        ); //;conn.logger.info(`requiring new plugin '${filename}'`);
      //console.log(dir)
      let err = syntaxerror(readFileSync(dir), filename, {
        sourceType: "module",
        allowAwaitOutsideFunction: true,
      });
      if (err)
        conn.logger.error(
          `syntax error while loading '${filename}'\n${format(err)}`
        );
      else
        try {
          const module = await import(
            `${global.__filename(dir)}?update=${Date.now()}`
          );
          global.plugins[filename] = module.default || module;
        } catch (e) {
          conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
        } finally {
          global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) =>
              a.localeCompare(b)
            )
          );
        }
    }
  };

  // Buat instance Chokidar watcher
  const watcher = chokidar.watch(pluginFolder, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 99, // Tentukan kedalaman rekursi
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });

  // Tambahkan event listener untuk memantau perubahan
  watcher.on("all", (event, path) => {
    // Panggil fungsi reload jika file yang berubah adalah file JavaScript
    if (event === "change" && path.endsWith(".js")) {
      const filename = path.split("/").pop(); // Dapatkan nama file dari path
      global.reload(null, filename); // Panggil fungsi reload dengan null untuk _ev dan nama file
    }
  });

  Object.freeze(global.reload);
  watch(pluginFolder, global.reload);
  //await global.reloadHandler()

  Function(conn);
  return conn;
};

connectToWhatsApp();

process.on("uncaughtException", function (err) {
  let e = String(err);
  if (e.includes("Socket connection timeout")) return;
  if (e.includes("rate-overlimit")) return;
  if (e.includes("Connection Closed")) return;
  if (e.includes("Timed Out")) return;
  if (e.includes("Value not found")) return;
  console.log("Caught exception: ", err);
});

process.on("warning", (warning) => {
  console.warn(warning.name); // Cetak nama peringatan
  console.warn(warning.message); // Cetak pesan peringatan
  console.warn(warning.stack); // Cetak stack trace
});
