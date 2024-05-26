let handler = m => m

handler.before = async function () {
try{
    const data = db.data.users
    // Fungsi untuk memeriksa waktu kedaluwarsa dan mengirim pesan ke console jika waktu sudah berakhir
   async function checkExpiration() {
        const currentTime = Date.now();
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const item = data[key];

                const timeLeft = item.premiumTime - currentTime;
                if (item.premiumTime !== 0 && item.premiumTime < currentTime) {
                    console.log(`Premium '${key}' telah berakhir!`);
                    let text ="Premium kamu telah berakhir, untuk berlangganan kembali silakan chat owner";
await sleep(2000)
                       //conn.sendMessage(key, { text });
                    item.premiumTime = 0
                    item.premium = false
                }
            }
        }

        // Memanggil kembali fungsi checkExpiration setelah 1 detik
        setTimeout(checkExpiration, 2000);
    }

    // Memulai pemanggilan pertama untuk memulai loop
    checkExpiration();
} catch (err){
    console.log(err)
} 
    }

export default handler


  