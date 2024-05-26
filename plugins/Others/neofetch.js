import { exec, spawn } from "child_process";
const os = require("os");
const util = require("util");

let handler = async (m, { conn, setReply, args }) => {
  try {
    exec(`neofetch --json`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        setReply(neo());
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      if (stdout) {
        //let output = Object.entries(stdout).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n')
        // Log(output)
        setReply(stdout);
      }
    });
  } catch {}
};

handler.help = ["sysinfo"];
handler.tags = ["info"];
handler.command = ["neo", "info"];
handler.limit = true;

export default handler;

function neo() {
  const systemInfo = {
    cpu: `${os.cpus().length} cores, ${os.cpus()[0].model}`,
    platform: os.platform(),
    os: os.release(),
    arch: os.arch(),
    uptime: `${Math.floor(os.uptime() / 60)} minutes`,
    memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  };

  // Get CPU and RAM usage per process
  const processes = os.cpus().map((cpu) => {
    return {
      cpu: cpu.times.user + cpu.times.sys,
      memory: process.memoryUsage().rss / 1024 / 1024,
    };
  });

  // Get disk usage information
  const diskInfo = os.freemem();

  // Get network information
  const networkInterfaces = os.networkInterfaces();

  // Convert networkInterfaces object to string with pretty formatting
  const networkInterfacesString = JSON.stringify(
    networkInterfaces,
    (key, value) => {
      // Exclude these keys from the stringified output
      if (key === "address" || key === "netmask" || key === "mac") {
        return undefined;
      }
      return value;
    },
    2
  );

  // Format output with `util.format` or your preferred method
  const formattedOutput = util.format({
    systemInfo,
    processes,
    diskInfo,
    networkInterfaces: networkInterfacesString,
  });

  // Send formatted output to user
  return formattedOutput;
}
