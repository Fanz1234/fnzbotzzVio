let handler = (m) => m;

handler.before = async function () {
  try {
    const cron = require("node-cron");

    // Fungsi untuk menghapus objek dengan properti "registered" yang bernilai false
    async function removeUnregisteredChats() {
        try {
            let getGroups = await conn.groupFetchAllParticipating();
            let groupss = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
            let data1 = groupss.map((v) => v.id);
            let data2 = Object.keys(db.data.chats)
    
            async function arraysAreEqual(arr1, arr2) {
                for (let i of arr2) {
                    if (!arr1.includes(i)) {
                        delete db.data.chats[i];
                        console.log("Menghapus data chats yang tidak tersedia");
                    }
                }
            }
    
            await arraysAreEqual(data1, data2)
           
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occur during the process
        }
    }

    // Jadwalkan penghapusan setiap satu hari sekali pada pukul 00:00
    cron.schedule("0 0 * * *", () => {
        removeUnregisteredChats();
      console.log("Unregistered chats removed.");
    });
  } catch (err) {
    Log(err);
  }
};

export default handler;
