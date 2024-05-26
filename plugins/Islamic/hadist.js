import fetch from "node-fetch";
let handler = async (m, { conn, q,setReply }) => {
    let teks = `Silakan masukan nama hadist .hadist muslim 1
    1. abu-daud (1 - 4419)
    2. ahmad (1 - 4305)
    3. bukhari (1 - 6638)
    4. darimi (1 - 2949)
    5. ibnu-majah (1 - 4285)
    6. malik (1 - 1587)
    7. muslim (1 - 4930)
    8. nasai (1 - 5364)
    9. tirmidzi (1 - 3625)     
      `
if(!q) throw teks
let hadist = q.split(' ')[0]
let nomer = q.split(' ')[1]
  let json = await fetch(`https://api.hadith.gading.dev/books/${hadist}/${nomer}`);
  let result = await json.json();
  log(result)
 // log(result.data.filter(v => v.id == 'ahmad'))
let mess =`
Hadist : ${result.data.id}
Nomer : ${result.data.contents.number}

${result.data.contents.arab}

${result.data.contents.id}

`
m.reply(mess)

};
handler.help = ["murothal"];
handler.tags = ["quotes"];
handler.command = ["hadist"];

export default handler;
