/*

_Place it in ./lib/aoyo.js_

*/

import fetch from "node-fetch";
import fs from 'fs-extra'
const axios = require('axios');
const qs = require('qs');

function generateRandomString(length) {
    const characters = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

function generateRandomNumberString(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function getSearchResults(query) {
    const url = 'https://aoyo.ai/Api/AISearch/Source';
    const requestData = {
        q: query,
        num: 20,
        hl: 'id-ID'
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/plain, */*'
    };

    try {
        const response = await axios.post(url, qs.stringify(requestData), { headers });
        return response.data.organic;
    } catch (error) {
        return [];
    }
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function postData(content) {
    const searchQuery = content;
    const searchResults = await getSearchResults(searchQuery);

    const engineContent = searchResults.map((result, index) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        sitelinks: result.sitelinks ? result.sitelinks.map(link => ({
            title: link.title,
            link: link.link
        })) : [],
        position: index + 1
    }));

    const url = 'https://aoyo.ai/Api/AISearch/AISearch';
    const requestData = {
        content: content,
        id: generateRandomString(32),
        language: 'id-ID',
        engineContent: JSON.stringify(engineContent),
        randomNumber: generateRandomNumberString(17)
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://aoyo.ai/search/?q=' + encodeURIComponent(content)
    };

    try {
        const response = await axios.post(url, qs.stringify(requestData), { headers });
        return response.data.replace(/\[START\][\s\S]*$/g, '').trim();

    } catch (error) {
        return { error: error.message };
    }
}

export {
  postData
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