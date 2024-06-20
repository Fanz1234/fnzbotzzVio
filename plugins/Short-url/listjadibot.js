async function handler(m, { usedPrefix }) {
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]
  m.reply(`💌 *Owner Botz*\n\nhttps://wa.me/6285812373011?text=Hallo+owner+Fanz\n\n🏅 *Bot Utama* \n\n➺ https://wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}menu (${global.conn.user.name}) \n\n *🍃 JadiBot* \n\n` + users.map(v => '❥ https://wa.me/' + v.jid.replace(/[^0-9]/g, '') + `?text=${usedPrefix}menu (${v.name})`).join('\n'))
}
handler.command = handler.help = ['listjadibot', 'listbot', 'ljb']
handler.tags = ['jadibot']

export default handler;
// Ubah
