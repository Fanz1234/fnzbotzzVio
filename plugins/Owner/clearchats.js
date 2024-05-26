
let handler = async (m, { conn }) => {
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
            m.reply("sukses")
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occur during the process
        }

}
handler.help = ['clearchats']
handler.tags = ['owner']
handler.command = /^(clearchats)$/i
handler.owner = true
handler.group = false

export default handler