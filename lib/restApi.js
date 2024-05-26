import fetch from 'node-fetch';

class miftah {
   baseUrl = 'https://api.miftahganzz.my.id/api/';
   apiKey = null;

   constructor(apiKey) {
      this.apiKey = apiKey || process.env.MIFTAH || global.apiMiftah;
   }
   
   bard = async (query) => {
      let json = await fetch(this.baseUrl + 'ai/gemini?q=' + query + '&apikey=' + this.apiKey);
      return await json.json();
   }

   instagram = async (url) => {
      let response = await fetch(this.baseUrl + 'download/instagram?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   facebook = async (url) => {
      let response = await fetch(this.baseUrl + 'download/facebook?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   soundcloud = async (url) => {
      let response = await fetch(this.baseUrl + 'download/soundcloud?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   spotify = async (url) => {
      let response = await fetch(this.baseUrl + 'download/spotify?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   twitter = async (url) => {
      let response = await fetch(this.baseUrl + 'download/twitter?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   githubUser = async (username) => {
      let response = await fetch(this.baseUrl + 'stalking/githubuser?username=' + username + '&apikey=' + this.apiKey);
      return await response.json();
   }

   instagramUser = async (username) => {
      let response = await fetch(this.baseUrl + 'stalking/instagram?username=' + username + '&apikey=' + this.apiKey);
      return await response.json();
   }

   gptPic = async (query) => {
      let response = await fetch(this.baseUrl + 'ai/gpt-pic?q=' + query + '&apikey=' + this.apiKey);
      return await response.json();
   }

   geminiImg = async (query, url) => {
      let response = await fetch(this.baseUrl + 'ai/gemini-img?q=' + encodeURIComponent(query) + '&url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   bardImg = async (query, url) => {
      let response = await fetch(this.baseUrl + 'ai/bard-img?q=' + encodeURIComponent(query) + '&url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   ocr = async (imageUrl) => {
      let response = await fetch(this.baseUrl + 'tools/ocr?url=' + encodeURIComponent(imageUrl) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   shortener = async (url) => {
      let response = await fetch(this.baseUrl + 'tools/shortener?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   styleText = async (text) => {
      let response = await fetch(this.baseUrl + 'tools/styletext?text=' + encodeURIComponent(text) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   instagramUser = async (username) => {
      let response = await fetch(this.baseUrl + 'stalking/instagram?username=' + username + '&apikey=' + this.apiKey);
      return await response.json();
   }

   imgbbUploader = async (imageUrl) => {
      let response = await fetch('https://api.miftahganzz.my.id/uploader/imgbb?url=' + encodeURIComponent(imageUrl));
      return await response.json();
   }

   tiktok = async (url) => {
         let json = await fetch(this.baseUrl + `download/tiktok?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
         return await json.json();
   }

   tiktokV2 = async (url) => {
         let json = await fetch(this.baseUrl + `download/tiktokv2?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
         return await json.json();
   }

   tiktokV3 = async (url) => {
         let json = await fetch(this.baseUrl + `download/tiktokv3?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
         return await json.json();
   }

   mediafire = async (url) => {
         let json = await fetch(this.baseUrl + `download/mediafire?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
         return await json.json();
   }
}












 

class nazmy {
   baseUrl = 'http://15.235.142.199/api/';
   apiKey = null;

   constructor(apiKey) {
      this.apiKey = apiKey || process.env.NAZMY || global.apiNazmy;
   }
   
   alibabaAi = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/alibabaAi?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   bingAi = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/bingAi?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   blackbox = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/blackbox?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   blackboxImage = async (prompt, imageUrl) => {
      let json = await fetch(this.baseUrl + `ai/blackboxImage?prompt=${encodeURIComponent(prompt)}&imageUrl=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
      return json.json();
   }

   claudeAi = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/claudeAi?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   chatGPT = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/chatgpt?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   chatGPT4 = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/chatgpt4?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   geminiAI = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/geminiAI?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   geminiImage = async () => {
      let json = await fetch(this.baseUrl + 'ai/geminiImage');
      return json.json();
   }

   img2zombie = async (imageUrl) => {
      let json = await fetch(this.baseUrl + `ai/img2zombie?imageUrl=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
      return json.json();
   }

   remini = async (imageUrl) => {
      let json = await fetch(this.baseUrl + `ai/remini?imageUrl=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
      return json.json();
   }

   reminiV2 = async (imageUrl) => {
      let json = await fetch(this.baseUrl + `ai/remini_v2?imageUrl=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
      return json.json();
   }

   toAnime = async (image) => {
      let json = await fetch(this.baseUrl + `ai/toAnime2D?image=${encodeURIComponent(image)}&apikey=${this.apiKey}`);
      return json.json();
   }

   simi = async (chat) => {
      let json = await fetch(this.baseUrl + `ai/simi?chat=${encodeURIComponent(chat)}&apikey=${this.apiKey}`);
      return json.json();
   }

   voiceAnime = async (text) => {
      let json = await fetch(this.baseUrl + `ai/voiceAnime?text=${encodeURIComponent(text)}&apikey=${this.apiKey}`);
      return json.json();
   }

   youchat = async (prompt) => {
      let json = await fetch(this.baseUrl + `ai/youchat?prompt=${encodeURIComponent(prompt)}&apikey=${this.apiKey}`);
      return json.json();
   }

   removeBg = async (imageUrl) => {
      let json = await fetch(this.baseUrl + `ai/removeBg?imageUrl=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
      return json.json();
   }

   carbon = async (code) => {
      let json = await fetch(this.baseUrl + `maker/carbon?code=${encodeURIComponent(code)}&apikey=${this.apiKey}`);
      return json.json();
   }

   fb = async (url) => {
      let json = await fetch(this.baseUrl + `download/facebook?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
      return json.json();
   }

   ig = async (url) => {
      let json = await fetch(this.baseUrl + `download/instagram?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
      return json.json();
   }

   tiktok = async (url) => {
      let json = await fetch(this.baseUrl + `download/tiktok?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
      return json.json();
   }

   twitter = async (url) => {
      let json = await fetch(this.baseUrl + `download/twitter?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
      return json.json();
   }

}

 



class nekohime {
   baseUrl = 'https://nekohime.xyz/api/';
   apiKey = null;

   constructor(apiKey) {
       this.apiKey = apiKey || process.env.NEKOHIME || global.apiNekohime
   }

   fbDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/fbdown?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   gdriveDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/gdrive?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   doodDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/dood?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   teraboxDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/terabox?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   
   twitterDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/twitter?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   tiktokDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/tiktok?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   capcutDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/capcut?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   instagram = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/igdownloader?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   ytDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/yt?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }
   soundcloudDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/soundcloud?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   };

   mediafireDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/mediafire?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   };

   sfilemobiDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/sfilemobi?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   };

   
   xnxxDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/xnxx?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   pornhubDownloader = async (url) => {
       let json = await fetch(this.baseUrl + `downloader/pornhub?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   nhentaiDownloader = async (text) => {
       let json = await fetch(this.baseUrl + `downloader/nhentai?text=${text}&apikey=${this.apiKey}`);
       return json.json();
   }

   circleMaker = async (url) => {
       let json = await fetch(this.baseUrl + `maker/circle?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   beautifulMaker = async (url) => {
       let json = await fetch(this.baseUrl + `maker/beautiful?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   blurMaker = async (url) => {
       let json = await fetch(this.baseUrl + `maker/blur?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json.json();
   }

   makeDarkness = async (imageUrl, no = 50) => {
       let json = await fetch(this.baseUrl + `maker/darkness?url=${encodeURIComponent(imageUrl)}&no=${no}&apikey=${this.apiKey}`);
       return json.json();
   }

   makeFacepalm = async (imageUrl) => {
       let json = await fetch(this.baseUrl + `maker/facepalm?url=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
       return json.json();
   }

   makeInvert = async (imageUrl) => {
       let json = await fetch(this.baseUrl + `maker/invert?url=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
       return json.json();
   }

   pixelateImage = async (url, no) => {
       let json = await fetch(this.baseUrl + `maker/pixelate?url=${encodeURIComponent(url)}&no=${no}&apikey=${this.apiKey}`);
       return json
   }

   rainbowImage = async (url) => {
       let json = await fetch(this.baseUrl + `maker/rainbow?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json
   }

   triggerImage = async (url) => {
       let json = await fetch(this.baseUrl + `maker/trigger?url=${encodeURIComponent(url)}&apikey=${this.apiKey}`);
       return json
   }

   
   wantedMaker = async (imageUrl) => {
       let json = await fetch(this.baseUrl + `maker/wanted?url=${encodeURIComponent(imageUrl)}&apikey=${this.apiKey}`);
       return json
   }

   welcomeMaker = async (name, groupName, memberCount, profilePictureUrl, backgroundImageUrl) => {
       let json = await fetch(this.baseUrl + `maker/welcome1?name=${encodeURIComponent(name)}&gpname=${encodeURIComponent(groupName)}&member=${memberCount}&pp=${encodeURIComponent(profilePictureUrl)}&bg=${encodeURIComponent(backgroundImageUrl)}&apikey=${this.apiKey}`);
       return json
   }

   goodbyeMaker = async (name, groupName, memberCount, profilePictureUrl, backgroundImageUrl) => {
       let json = await fetch(this.baseUrl + `maker/goodbye1?name=${encodeURIComponent(name)}&gpname=${encodeURIComponent(groupName)}&member=${memberCount}&pp=${encodeURIComponent(profilePictureUrl)}&bg=${encodeURIComponent(backgroundImageUrl)}&apikey=${this.apiKey}`);
       return json
   }

   aiDiffusion = async (text) => {
      let json = await fetch(this.baseUrl + `ai/diffusion?text=${encodeURIComponent(text)}&apikey=${this.apiKey}`);
      return json.json();
  }

  attpMaker = async (text) => {
      let json = await fetch(this.baseUrl + `maker/attp?text=${encodeURIComponent(text)}&apikey=${this.apiKey}`);
      return json.json();
  }

  ttpMaker = async (text) => {
      let json = await fetch(this.baseUrl + `maker/ttp?text=${encodeURIComponent(text)}&apikey=${this.apiKey}`);
      return json.json();
  }

  rollDice = async () => {
      let json = await fetch(this.baseUrl + `fun/dadu?apikey=${this.apiKey}`);
      return json.json();
  }

  openAi = async (text) => {
   let response = await fetch(`${this.baseUrl}ai/openai?text=${text}&apikey=${this.apiKey}`);
   return response.json();
}

}















export { miftah,nazmy,nekohime };
