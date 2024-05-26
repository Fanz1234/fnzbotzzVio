import fs from 'fs-extra'
import toMs from "ms";
import ms from "parse-ms"
import moment from "moment-timezone"

let handler = async (m, { conn,q, args,setReply, usedPrefix, command }) => {
try{
if(!m.isGroup && !q) return setReply('Masukan id gc/nomer creator group')   
let idGc = m.isGroup ? m.chat : q
let sewa = Object.values(db.data.chats).filter((i) => i.expired !== 0);

if(!m.isGroup && q.startsWith('https://wa.me/')){
    let anu =  q.split('https://wa.me/')[1] 
  
    let order = sewa.filter((i) => i.creator.split('wa.me/')[1] == anu)
    Log(order)
    if(order) delete db.data.chats[order[0].id]
    return setReply('Berhasil menghapus data sewa')
} else {
    delete db.data.chats[idGc]
    return setReply('Berhasil menghapus data order')
    
}


} catch(err){
    Log(err)
}
}
handler.help = ['delorder <idgc>']
handler.tags = ['owner']
handler.command = /^(delorder|delsewa)$/i
handler.owner = true
handler.group = false

export default handler