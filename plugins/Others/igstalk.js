import { miftah } from '../../lib/restApi.js'

let handler = async (m, { q,conn, text }) => {
    try{
        m.reply('Proses...')
    const data = new miftah()
    let res = await data.instagramUser(q)
    log(res)
let caption =`
Profile: ${res.data.profile}
Fullname: ${res.data.fullname}
Username: ${res.data.username}
Post: ${res.data.post}
Followers: ${res.data.followers}
Following: ${res.data.following}
Bio: ${res.data.bio}
`
conn.sendMessage(m.chat,{image:{url:res.data.profile}, caption},{quoted:m})

    } catch(err){
        log(err)
        throw 'Gagal mencari user'
    }

}
handler.help = ['githubstalk']
handler.tags = ['internet']
handler.command = ['instagramstalk','igstalk']
handler.limit = true
export default handler
