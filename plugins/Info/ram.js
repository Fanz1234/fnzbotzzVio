import { FileSize} from "../../lib/myfunc.js"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const { barLevel } = await import("../../lib/user.js");
  let pidusage = require("pidusage");
  const totalMemory = process.env.WEB_MEMORY || 512;
  const memoryUsage = process.memoryUsage();
  const usedMemoryMB = memoryUsage.heapUsed / (1024 * 1024);
  const usedMemoryPercentage = (usedMemoryMB / totalMemory) * 100;
  let stats = await pidusage(process.pid);
  let cpuPersen = stats.cpu.toFixed(0);
  let persen = usedMemoryPercentage.toFixed(0); // ((stats.memory / 2000000000 ) * 100).toFixed(0)
  let storage = conn.getDirSize(process.cwd());
  let totalMem = 1000;
  let memory = (
    (parseInt(FileSize(storage).split(" ")[0]) / totalMem) *
    100
  ).toFixed(0);

m.reply(`
CPU
${barLevel(cpuPersen)} ${cpuPersen} %
RAM 
${barLevel(persen)} ${persen} %
STORAGE
${barLevel(memory)} ${memory} %`);
};

handler.tags = ["info"];
handler.command = ["ram"];
export default handler;
