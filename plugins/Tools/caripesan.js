
let handler = async (m, {q,conn,args,usedPrefix,command}) => {
if(!q)return m.reply('pesannya apa bang?')
const stringSimilarity = require("string-similarity");
let s = Object.values(conn.chats[m.chat].messages)
let el = s.filter(v => v.message)
    Log(el)
let al = el.filter(v => v.message.conversation !== undefined )
    Log(al)
    let mem = []
  await al.map( i => mem.push(i.message.conversation) )
  let matches = await stringSimilarity.findBestMatch(q, mem) 
let ah = matches.ratings.filter(v => v.rating !== 0)

let mom = []
await ah.map( i => mom.push(i.target) )






    
   let lala = matches.bestMatch.target
   
    Log(lala)
  el.shift()



    
  try {
    //if(el[0].message.conversation == undefined) return
    m.reply(`Ditemukan ${mom.length} pesan`)
    await sleep(3000)
    for(let i of al) {
      Log(i)
   if(mom.includes(i.message.conversation)){
        await sleep(3000)
           await conn.sendMessage(m.chat,{text:'Nih pesannya'},{quoted:i})
    }
   
    }
    } catch(e){
      Log(e)
    m.reply('Pesan tidak ditemukan!')
    }



}
handler.help = ["tools"]
handler.tags = ["tools"];
handler.command = ['caripesan']

export default handler
