let handler = (m) => m;

handler.before = async function () {
  try {
    const cron = require("node-cron");

    // Fungsi untuk menghapus objek dengan properti "registered" yang bernilai false
    function removeUnregisteredUsers() {
      let data = db.data.users;
      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          !data[key].registered &&
          data[key].premiumTime == 0
        ) {
          delete data[key];
        }
      }
    }

    // Jadwalkan penghapusan setiap satu hari sekali pada pukul 00:00
    cron.schedule("0 0 * * *", () => {
      removeUnregisteredUsers();
      console.log("Unregistered users removed.");
    });
  } catch (err) {
    Log(err);
  }
};

export default handler;
