import _blockcmd from "../../lib/blockcmd.js";
let handler = async (m, { conn, q, setReply, isOwner, prefix }) => {
    const listcmdblock = db.data.blockcmd;
        let wo = `*「 LIST BLOCK CMD 」*`
        let soso = [];
        for (let i of listcmdblock) {
        soso.push(i.cmd)
        wo += `\n\n•> Command : ${i.cmd}`
        }
        setReply(wo)
      
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["listcmdblock",'listblockcmd'];
handler.owner = true;

export default handler;
