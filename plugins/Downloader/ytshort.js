
import ytdl from 'ytdl-core'

let handler = async (m, {q,conn,args,usedPrefix,setReply,command}) => {


if(!q) return setReply(mess.query)
//if(!q.includes("shorts")) return setReply("masukin link yt short")
ytdl.getInfo(q).then( info => {
const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
if (formats.length < 1) {
return setReply('no formats retrieved');
//observer.error('Video formats not available');
} else {
conn.sendMessage(m.chat,{video:{url: formats[0].url}},{quoted:m})
}

const downloadOptions = {
quality: 'highest',
format: formats[0]
};
const stream = ytdl.downloadFromInfo(info, downloadOptions);
})





}
handler.help = ["downloader"]
handler.tags = ["internet"];
handler.command = ['ytshort']

export default handler


























