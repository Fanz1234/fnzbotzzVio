let handler = async(m) => {
let motivasii = pickRandom(motivasi)
    m.reply(`"${motivasii}"`)
}
handler.help = ['motivasi']
handler.tags = ['quotes']
handler.command = /^(motivasi)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const motivasi = [
  "Jangan bicara, bertindak saja. Jangan katakan, tunjukkan saja. Jangan janji, buktikan saja.",
  "Jangan pernah berhenti melakukan yang terbaik hanya karena seseorang tidak memberi Anda penghargaan.",
  "Bekerja saat mereka tidur. Belajar saat mereka bersantai. Hemat sementara mereka menghabiskan. Hiduplah seperti mimpi mereka.",
  "Kunci sukses adalah memusatkan pikiran sadar kita pada hal-hal yang kita inginkan, bukan hal-hal yang kita takuti.",
  "Jangan takut gagal. Ketakutan berada di tempat yang sama tahun depan seperti Anda saat ini.",
  "Jika kita terus melakukan apa yang kita lakukan, kita akan terus mendapatkan apa yang kita dapatkan.",
  "Jika Anda tidak dapat mengatasi stres, Anda tidak akan mengejar kesuksesan.",
  "Bersikap keras kepala tentang tujuan Anda dan fleksibel tentang metode Anda.",
  "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.",
  "Ingatlah bahwa pembelajaran terbesar dalam hidup biasanya dipelajari dari saat-saat terburuk dan dari kesalahan terburuk.",
  "Hidup bukan tentang menunggu badai berlalu, tetapi belajar menari di tengah hujan.",
  "Jika rencananya tidak berhasil, ubah rencananya bukan tujuannya.",
  "Jangan takut jika hidupmu akan berakhir; takutlah jika hidupmu tidak pernah dimulai.",
  "Orang yang benar-benar hebat adalah orang yang membuat setiap orang merasa hebat.",
  "Pengalaman adalah guru yang berat karena dia memberikan tes terlebih dahulu, kemudian pelajaran.",
  "Mengetahui seberapa banyak yang perlu diketahui adalah awal dari belajar untuk hidup.",
  "Sukses bukanlah akhir, kegagalan tidak fatal. Yang terpenting adalah keberanian untuk melanjutkan.",
  "Lebih baik gagal dalam originalitas daripada berhasil meniru.",
  "Berani bermimpi, tapi yang lebih penting, berani melakukannya tidak peduli di balik impianmu.",
  " Tetapkan tujuan Anda dan tinggalkan, dan jangan berhenti sampai Anda mencapainya.",
  "Kembangkan kesuksesan dari kegagalan. Keputusasaan dan kegagalan adalah dua batu loncatan paling pasti menuju sukses.",
  "Jalannya menuju sukses dan jalannya menuju kegagalan hampir sama.",
  "Sukses biasanya datang kepada mereka yang terlalu sibuk mencarinya.",
  "Jangan tunda pekerjaanmu sampai besok, sementara kamu bisa menyelesaikannya hari ini.",
  "Dua puluh tahun dari sekarang, kamu akan lebih kecewa oleh hal-hal yang tidak kamu lakukan daripada hal-hal yang kamu lakukan.",
  "Kesempatan itu mirip seperti matahari terbit. Jika kamu menunggu terlalu lama, kamu akan melewatkan.",
  "Hidup ini terdiri dari 10 persen apa yang terjadi pada kita dan 90 persen bagaimana kita menanganinya.",
  "Ada tiga cara untuk menemukan kebahagiaan yang sejati: cara pertama adalah bersikap baik. Cara kedua adalah bersikap baik. Cara ketiga adalah menjadi baik.",
  "Alasan nomor satu orang gagal dalam hidup adalah karena mereka mendengarkan teman, keluarga, dan tetangga mereka.",
  "Waktu lebih berharga daripada uang. Kamu bisa mendapatkan lebih banyak uang, tapi kamu tidak bisa mendapatkan lebih banyak waktu.",
  "Penetapan tujuan adalah rahasia masa depan yang menarik.",
  "Saat kita berusaha untuk menjadi lebih baik dari kita, sekaligus sesuatu di sekitar kita juga menjadi lebih baik.",
  "Pertumbuhan dimulai ketika kita mulai menerima tantangan dan keraguan...",
  ];
  