import speed from "performance-now";
let handler = async (m, { conn, setReply }) => {
  const timestampp = speed();
  const latensi = speed() - timestampp;
  setReply(`Speed: ${latensi.toFixed(4)} Second`);
};
handler.help = ["speedtest"];
handler.tags = ["spesifikasi"];
handler.command = ["speed"];
export default handler;
