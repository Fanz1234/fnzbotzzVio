
let handler = async (m, { q, conn, isOwner, setReply, command }) => {
        if (!m.isGroup) return
        if (!isOwner && !m.isAdmin) return setReply('Hanya admin dan owner')
        await conn.groupLeave(m.chat)     
};

handler.tags = ["owner"];
handler.command = ["getout",'outgc','leavegc'];
handler.owner = true;
export default handler;
