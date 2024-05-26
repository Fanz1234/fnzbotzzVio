

let handler = async (m, { conn, setReply }) => {
  const speedTest = require('speedtest-net')
  await setReply("_Testing Speed..._");
  
  speedTest().on('data', data => {
    setReply(data.speeds.download + ' Mbps (Download)\n' + data.speeds.upload + ' Mbps (Upload)');
  }).on('error', err => {
    setReply(err.message);
  });
};

handler.help = ["speedtest"];
handler.tags = ["spesifikasi"];
handler.command = /^(speedtest|sptest)$/i;

export default handler;
