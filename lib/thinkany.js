/*
//BY KyuuTense


_Put it in ./lib/thinkany.js_

*/

import fetch from "node-fetch";
import fs from 'fs-extra'
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://thinkany.ai/api',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://thinkany.ai/'
  }
});

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function thinkany(content) {
  try {
    const newConversationData = { content, locale: "en", mode: "search", model: "claude-3-haiku", source: "all" };
    const { data } = await api.post('/new-conversation', newConversationData);

    const chatData = {
      role: "user",
      content: data.data.content,
      conv_uuid: data.data.uuid,
      mode: data.data.mode,
      is_new: true,
      model: data.data.llm_model
    };

    const chatResponse = await api.post('/chat', chatData);
    return chatResponse.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {
  thinkany
};

import { fileURLToPath, URL } from "url";
const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;
let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.bgGreen(chalk.black("[  UPDATE ]")),
    chalk.white(`${__filename}`)
  );
  import(`${file}?update=${Date.now()}`);
});