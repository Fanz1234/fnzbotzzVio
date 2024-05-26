export default async function (prefix, setReply, m, conn) {

global.wait = "Tunggu sebentar ya kak";
global.mess = {
wait: "Tunggu sebentar ya kak",
query: "Masukan query",
search: "Searching...",
scrap: "*Scrapping...*",
success: "Berhasil!",
limit: `[❕] Limit kamu sudah habis silahkan kirim .limit untuk mengecek limit`,
claimOn: `Kamu sudah melakukan claim sebelumnya, Harap claim lagi pada jam `,
wrongFormat: "Format salah, coba liat lagi di menu",

error: {
stick: "bukan sticker itu:v",
api: "Error api atau linkya mungkin",
Iv: "Linknya error:v",
link: "Link error!",
},

block: {
Bowner: `Maaf kak command tersebut telah di block oleh owner`,
Bsystem: `Command tersebut telah di block oleh system karena terjadi error`,
},

only: {
prem: "Fitur khusus user premium, hubungi owner untuk membeli premium",
group: "Fitur ini dapat digunakan di Dalam Group!",
ownerB: "Fitur Khusus Owner Bot!",
owner: "Fitur Khusus Owner Bot!",
admin: "Fitur dapat Digunakan oleh Admin Group!",
Badmin: "Fitur dapat Digunakan Setelah Bot menjadi ADMIN!",
},
};


global.dfail = (type) => {
let msg = {
    
rowner: "*Owner Only* - Command ini hanya untuk owner bot!",
owner: "*Owner Only* - Command ini hanya untuk owner bot!",
mods: "*Owner Only* - Command ini hanya untuk owner bot!",
premium: "*Premium Only* - Command ini hanya untuk member premium!",
group: "*Group Only* - Command ini hanya dapat digunakan di grup!",
private: "*Private Only* - Command ini hanya dapat digunakan di chat pribadi!",
admin: "*Admin Only* - Command ini hanya untuk admin grup!",
botAdmin: "Jadikan bot sebagai admin untuk menggunakan command ini",
onlyprem: "Hanya user *premium* yang dapat menggunakan fitur ini di *private chat*!!",
nsfw: "Admin menonaktifkan fitur *NSFW* di grup ini!",
rpg: "Admin menonaktifkan fitur *RPG Game* di grup ini!",
game: "Admin menonaktifkan fitur *Game* di grup ini!",
limitExp: "Limit kamu habis! Beberapa command tidak dapat diakses!\n\nKamu bisa beli limit caranya dengan mengetik *.buy limit 5*",
restrict: "Fitur ini tidak dapat digunakan!!",
unreg: "Silahkan daftar ke *database* bot terlebih dahulu jika ingin menggunakan fitur ini!\n\nketik:\n#daftar namamu.umurmu\nContoh: #daftar Teguh.15\n",

}[type];

if (msg)
return setReply(msg)
};


}
