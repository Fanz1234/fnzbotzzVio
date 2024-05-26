let handler = async(m, { conn }) => {
  await conn.sendMessage(m.chat, {video: {url: pickRandom(asupan)}}, {quoted:m})
}
handler.help = ['asupan']
handler.tags = ['random']
handler.command = ['asupan']

handler.premium = true
handler.fail = null
 

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const asupan = [
  'https://telegra.ph/file/2117ab2b136cb5b0c9c2a.mp4',
  'https://telegra.ph/file/52195087115cc418b1e65.mp4',
  'https://telegra.ph/file/e2950aebce70dd76c4357.mp4',
  'https://telegra.ph/file/a215e557c7e9f0b9e16f1.mp4',
  'https://telegra.ph/file/a8c74be1637b0d10a7ea6.mp4',
  'https://telegra.ph/file/9efeca66752911fae512f.mp4',
  'https://telegra.ph/file/63dec0b667fec121fce74.mp4',
  'https://telegra.ph/file/40549b5201f0c8a8a623f.mp4',
  'https://telegra.ph/file/88ab17c42270fa90fe25b.mp4',
  'https://telegra.ph/file/3f6c4c53de25973bbc2f8.mp4',
  'https://telegra.ph/file/546cc11316284ac7ea1a1.mp4',
  'https://telegra.ph/file/6f5ab237ea6454f7222e2.mp4',
  'https://telegra.ph/file/7bc055f783ff65b027058.mp4',
  'https://telegra.ph/file/acd35d9e92b9722041ad3.mp4',

]
