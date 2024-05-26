import _data from "../../lib/totalcmd.js"
let handler = async (m, {q,conn,isOwner,setReply,args,usedPrefix,command}) => {
    const DataId = db.data.data
    const Input = !m.isGroup? m.numberQuery : m.mentionByTag[0]? m.mentionByTag[0] : m.mentionByReply ? m.mentionByReply : q? m.numberQuery : false
        if (!isOwner) return setReply(mess.only.ownerB)
    if(!q) return setReply("Masukan nomer target")
        try {
        if(!_data.checkDataId("owner", Input, DataId)) return setReply(`User bukan owner`)
        _data.removeDataId ("owner", Input, DataId)
        setReply(`Berhasil menghapus ${Input.split("@")[0]} ke daftar owner`)
        } catch (err){
        console.log(err)
        setReply(`${err}`)
        }
       
    
}
handler.help = ["delowner reply nomer"]
handler.tags = ["owner"];
handler.command = ['delowner']
handler.owner = true
export default handler