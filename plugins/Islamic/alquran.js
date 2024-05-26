import fetch from "node-fetch";
let handler = async (m, { conn, q, setReply, args, prefix, command }) => {
  if (!args[0])
    return setReply(
      `Contoh penggunaan:\n${
        prefix + command
      } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    );
  if (!args[1])
    return setReply(
      `Contoh penggunaan:\n${
        prefix + command
      } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    );

  let surah = q.split(" ")[0];
  let ayat = q.split(" ")[1];

  let json = await fetch(`https://api.quran.gading.dev/surah/${surah}/${ayat}`);
  let result = await json.json();
  let url = result.data.audio.primary;

  let text = `
*Al-Quran*

Quran : ${result.data.surah.name.short}
Teks latin : ${result.data.surah.name.translation.id}
Surat ke : ${result.data.surah.number}
Juz : ${result.data.meta.juz}
Total ayat : ${result.data.surah.numberOfVerses}
Ayat ke : ${result.data.number.inSurah}

Isi ayat : ${result.data.text.arab}

Latin: ${result.data.text.transliteration.en}

Arti dalam bahasa indonesia : ${result.data.translation.id}

Arti dalam bahasa inggris : ${result.data.translation.en}

Tafsir surah :  ${result.data.tafsir.id.long}

`;
  m.reply(text);
  await conn.sendMessage(
    m.chat,
    { mimetype: "audio/mp4", audio: { url } },
    { quoted: m }
  );
};
handler.help = ["murothal"];
handler.tags = ["quotes"];
handler.command = ["alquran",'quran'];

export default handler;
