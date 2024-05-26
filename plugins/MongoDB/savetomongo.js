import fs from "fs";
import mongoose from "mongoose";
let handler = async (m, { text, q, conn, setReply }) => {
  // Definisikan model MongoDB dengan skema yang sesuai
  const DataModel = mongoose.model(
    "Data",
    new mongoose.Schema({
      data: {
        type: Object,
        required: true,
        default: {},
      },
    })
  );

  try {
    // Membaca isi file database.json
    const fileContent = fs.readFileSync("./database/database.json", "utf8");
    const jsonData = JSON.parse(fileContent);

    // Membuat koneksi MongoDB dengan Mongoose
    await mongoose.connect(mongodb, { dbName });
    console.log("Connected to MongoDB");

    // Memasukkan data dari file JSON ke dalam database MongoDB
    await DataModel.create({ data: jsonData });

    console.log("Data from database.json successfully saved to MongoDB");
    m.reply("File database.json berhasil disimpan di MongoDB");
    // Menutup koneksi MongoDB setelah selesai
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
    throw error
  }
};

handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = ["savedatabase", "savedata",'savetomongo'];
handler.owner = true;
export default handler;
