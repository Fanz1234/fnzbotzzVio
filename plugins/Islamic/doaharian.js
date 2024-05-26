import fetch from "node-fetch"
let handler = async(m, { conn, q, command, text }) => {


let teks = `
penggunakan .doaharian 1

list doa harian:

1.Doa Sebelum Makan
2.Doa Sesudah Makan
3.Doa Sesudah  Minum
4.Doa Ketika Makan Lupa Membaca Doa
5.Doa Sebelum Tidur
6.Doa Ketika Mimpi Buruk
7.Doa Ketika Mendapat Mimpi Baik
8.Doa Bangun Tidur
9.Doa Masuk Kamar Mandi Atau Toilet
10.Doa Istinja
11.Doa Keluar Kamar Mandi Atau Toilet
12.Doa Menjelang Sholat Shubuh
13.Doa Menyambut Pagi hari
14.Doa Menyambut Sore Hari
15.Doa Ketika Bercermin
16.Doa Masuk Rumah
17.Doa Keluar Rumah / Doa Bepergian
18.Doa Memakai Pakaian
19.Doa Memakai Pakaian Baru
20.Doa Melepas Pakaian
21.Doa Memohon Ilmu Yang Bermanfaat
22.Doa Sebelum Belajar
23.Doa Sesudah Belajar
24.Doa Berpergian
25.Doa Naik Kendaraan
26.Doa Naik Kapal
27.Doa Ketika Sampai di Tempat Tujuan
28.Doa Ketika Menuju Masjid
29.Doa Masuk Masjid
30.Doa Keluar Masjid
31.Doa Akan Membaca Al-Qur'an
32.Doa Setelah Membaca Al-Qur'an
33.Doa Niat Wudhu
34.Doa Setelah Wudhu
35.Doa akan Mandi
`
if(!q) throw teks

	let res = await(await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/religion/doaharian.json')).json()
	let data = res.result.data[q] 
let toks = `
Title: ${data.title}
Arabic: ${data.arabic}
Latin: ${data.latin}
Arti: ${data.translation}

`



m.reply(toks)








 




}
handler.help = ['doaharian']
handler.tags = ['quran']
handler.command = /^(doaharian|doaharian-get)$/i
export default handler