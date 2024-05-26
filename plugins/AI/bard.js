
import { miftah } from '../../lib/restApi.js'
let handler = async (m, {q,conn,args,usedPrefix,command}) => {
    if(!q) return m.reply("Mau ngomong apa?")
const data = new miftah()
let nana = await data.bard(q)
conn.sendMessage(m.chat,{text:nana.result},{quoted:m})

    
}
handler.help = ["chatgpt"]
handler.tags = ["internet", "bard", "gpt"];
handler.command = ['bard','gemini']

export default handler



