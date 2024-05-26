import fs from 'fs-extra'
let handler = (m) => m;
handler.before = async function (m, { conn }) {
  let id = m.chat;
  let reward = 9999;
  let body = typeof m.text == "string" ? m.text : false;
  let user = db.data.users[m.sender];
  conn.tebakbom = conn.tebakbom ? conn.tebakbom : {};
  if (!(id in conn.tebakbom) && m.quoted && /❏  *B O M B*/i.test(m.quoted.text))
    return conn.reply(
      m.chat,
      `Sesi telah berakhir, silahkan kirim .tebakbom untuk membuat sesi baru.`,
      m
    );
  if (id in conn.tebakbom && !isNaN(body)) {
    let timeout = 180000;
    let json = conn.tebakbom[id][1].find((v) => v.position == body);
    if (!json)
      return conn.reply(m.chat, `Untuk membuka kotak kirim angka 1 - 9`, m);
    if (json.emot == "💥") {
      json.state = true;
      let bomb = conn.tebakbom[id][1];
      let teks = `❏  *B O M B*\n\n`;
      teks += `Duaarrr bom meledak!\n\n`;
      teks +=
        bomb
          .slice(0, 3)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n";
      teks +=
        bomb
          .slice(3, 6)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n";
      teks +=
        bomb
          .slice(6)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n\n";
      teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
      teks += `*Permainan selesai!*, kotak berisi bom terbuka.`;
      conn.sendFile(
        m.chat,
        "https://telegra.ph/file/287cbe90fe5263682121d.jpg",
        "",
        teks,
        m
      );
      clearTimeout(conn.tebakbom[id][2]);
      delete conn.tebakbom[id];
    } else if (json.state) {
      return conn.reply(
        m.chat,
        `Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`,
        m
      );
    } else {
      json.state = true;
      let changes = conn.tebakbom[id][1];
      let open = changes.filter((v) => v.state && v.emot != "💥").length;
      if (open >= 8) {
        let teks = `❏  *B O M B*\n\n`;
        teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
        teks +=
          changes
            .slice(0, 3)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(3, 6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n\n";
        teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
        teks += `*Permainan selesai!* kotak berisi bom tidak terbuka : (+ *${reward}* Exp )`;
        conn.sendFile(
          m.chat,
          "https://telegra.ph/file/f6ebfea2758b947e1e49d.jpg",
          "",
          teks,
          m
        );
        db.data.users[m.sender].exp += reward;
        clearTimeout(conn.tebakbom[id][2]);
        delete conn.tebakbom[id];
      } else {
        let teks = `❏  *B O M B*\n\n`;
        teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
        teks +=
          changes
            .slice(0, 3)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(3, 6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n\n";
        teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
        teks += `Kotak berisi bom tidak terbuka.`;
        conn.reply(m.chat, teks, m).then(() => {
          if (user) db.data.users[m.sender].exp += reward;
        });
      }
    }
  }
};

export default handler;

async function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
