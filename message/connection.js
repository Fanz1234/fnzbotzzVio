"use strict";
const {
  default: makeWASocket,
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = (await import("baileys")).default;
import chalk from "chalk";
import { Boom } from "@hapi/boom";
import spin from "spinnies";
//import CFonts from "cfonts";
//import chalkAnimation from "chalk-animation";
import { spawn } from "child_process";
import { sleep } from "../lib/myfunc.js";
const spinner = {
  interval: 120,
  frames: [
    "✖ [░░░░░░░░░░░░░░░]",
    "✖ [■░░░░░░░░░░░░░░]",
    "✖ [■■░░░░░░░░░░░░░]",
    "✖ [■■■░░░░░░░░░░░░]",
    "✖ [■■■■░░░░░░░░░░░]",
    "✖ [■■■■■░░░░░░░░░░]",
    "✖ [■■■■■■░░░░░░░░░]",
    "✖ [■■■■■■■░░░░░░░░]",
    "✖ [■■■■■■■■░░░░░░░]",
    "✖ [■■■■■■■■■░░░░░░]",
    "✖ [■■■■■■■■■■░░░░░]",
    "✖ [■■■■■■■■■■■░░░░]",
    "✖ [■■■■■■■■■■■■░░░]",
    "✖ [■■■■■■■■■■■■■░░]",
    "✖ [■■■■■■■■■■■■■■░]",
    "✖ [■■■■■■■■■■■■■■■]",
  ],
};
let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
  if (!globalSpinner)
    globalSpinner = new spin({
      color: "blue",
      succeedColor: "green",
      spinner,
      disableSpins,
    });
  return globalSpinner;
};
let spins = getGlobalSpinner(false);

const start = (id, text) => {
  spins.add(id, { text: text });
};
const success = (id, text) => {
  spins.succeed(id, { text: text });
};

export const connectionUpdate = async (connectToWhatsApp, conn, update) => {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const {
    connection,
    lastDisconnect,
    receivedPendingNotifications,
    isNewLogin,
    qr,
  } = update;



  const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
  if (connection === "close") {
    console.log(chalk.red(lastDisconnect.error));

    if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
      process.send("reset");
    } else if (reason === DisconnectReason.badSession) {
      console.log(`Bad Session File, Please Delete Session and Scan Again`);
      process.send("reset");
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log("[SYSTEM]", chalk.red("Connection closed, reconnecting..."));
      process.send("reset");
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(
        chalk.red("[SYSTEM]", "white"),
        chalk.green("Connection lost, trying to reconnect")
      );
      process.send("reset");
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(
        chalk.red(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        )
      );
      conn.logout();
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red(`Device Logged Out, Please Scan Again And Run.`));
      conn.logout();
    } else if (reason === DisconnectReason.restartRequired) {
      console.log("Restart Required, Restarting...");
      connectToWhatsApp();
      process.send("reset");
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.red("Connection TimedOut, Reconnecting..."));
      connectToWhatsApp();
    }
  } else if (connection === "connecting") {
    //console.log(`${chalk.white(`[`)+chalk.red(`1`)+chalk.white(`]`)}`,`WA v${version.join('.')}`)
    //await sleep(400)
    //console.log(`${chalk.white(`[`)+chalk.red(`2`)+chalk.white(`]`)}`,`${calender}`)
    //await sleep(400)

    //await sleep(400)
    //console.log(`${chalk.white(`[`)+chalk.red(`2`)+chalk.white(`]`)}`,`data 5`)
    //await sleep(400)
    
    console.log(
      chalk.magenta(`]─`),
      `「`,
      chalk.red(`FEARLESS`),
      `」`,
      chalk.magenta(`─[`)
    );
    
    //await sleep(400)
    if(!global.pairingCode) start(`1`, `Connecting...`);
  } else if (connection === "open") {
    success(`1`, `[■■■■■■■■■■■■■■■] Connected`);
    const bot = db.data.others["restart"];
    if (bot) {
      const m = bot.m;
      const from = bot.from;
      let text = "Bot is connected";
      await conn.sendMessage(from, { text }, { quoted: m });
      delete db.data.others["restart"];
    }

    // Quick Test
    async function _quickTest() {
      let test = await Promise.all(
        [
          spawn("ffmpeg"),
          spawn("ffprobe"),
          spawn("ffmpeg", [
            "-hide_banner",
            "-loglevel",
            "error",
            "-filter_complex",
            "color",
            "-frames:v",
            "1",
            "-f",
            "webp",
            "-",
          ]),
          spawn("convert"),
          spawn("magick"),
          spawn("gm"),
          spawn("find", ["--version"]),
        ].map((p) => {
          return Promise.race([
            new Promise((resolve) => {
              p.on("close", (code) => {
                resolve(code !== 127);
              });
            }),
            new Promise((resolve) => {
              p.on("error", (_) => resolve(false));
            }),
          ]);
        })
      );
      let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
      //console.log(test)
      let s = (global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find,
      });
      // require('./lib/sticker').support = s
      Object.freeze(global.support);

      if (!s.ffmpeg)
        conn.logger.warn(
          "Please install ffmpeg for sending videos (pkg install ffmpeg)"
        );
      if (s.ffmpeg && !s.ffmpegWebp)
        conn.logger.warn(
          "Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)"
        );
      if (!s.convert && !s.magick && !s.gm)
        conn.logger.warn(
          "Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)"
        );
    }

    _quickTest()
      .then(() => conn.logger.info("☑️ Quick Test Done"))
      .catch(console.error);
  }
}; //akhir connection
