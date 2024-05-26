import _data from "../../lib/totalcmd.js"
let handler = async (m, {q,conn,isOwner,setReply,args,usedPrefix,command}) => {
    const DataId = db.data.data
    const Input = !m.isGroup? m.numberQuery : m.mentionByTag[0]? m.mentionByTag[0] : m.mentionByReply ? m.mentionByReply : q? m.numberQuery : false
        if (!isOwner) return setReply(mess.only.ownerB)
        //if (!m.isGroup) return setReply(mess.only.group)
    if(!q) return setReply("Masukan nomer target")
        if(_data.checkDataId("owner", Input,  DataId)) return setReply("User sudah menjadi owner")
        if(!_data.checkDataName("owner", Input, DataId)) { await _data.createDataId("owner", DataId) }
        _data.addDataId(Input, "owner", DataId)
        setReply(`Berhasil menambahkan ${Input.split("@")[0]} ke daftar owner`)
       
    
}
handler.help = ["addowner reply nomer"]
handler.tags = ["owner"];
handler.command = ['addowner']
handler.owner = true
export default handler



