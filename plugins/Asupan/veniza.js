/*
Credit by officialdittaz
*/
let handler = async(m, {q, conn }) => {
  if(!q){
    await conn.sendFile(m.chat, pickRandom(asupan), 'asupan.mp4', `_Nih Kak_`, m)
  } else if(q){
    let ven = asupan.length
    if (!isNumber(parseInt(q)) || parseInt(q) > ven ) throw `Pilih angka 1 sampai ${ven}, contoh .veniza 10`
    await conn.sendFile(m.chat, asupan[parseInt(q)], 'asupan.mp4', `Veniza ${q}`, m)
  }
  }
  handler.help = ['asupan']
  handler.tags = ['random']
  handler.command = ['veniza']
  
  handler.premium = true
 
  
  export default handler
  
  function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }
  
  const asupan = [
    'https://telegra.ph/file/249986b70db5db19c7c28.mp4',
    'https://telegra.ph/file/f1fc7d9ab76e05948f235.mp4',
    'https://telegra.ph/file/addad4353c1a001a46f1a.mp4',
    'https://telegra.ph/file/71d1691de5560e7d4503d.mp4',
    'https://telegra.ph/file/14c1b7f0bf47e352d7eab.mp4',
    'https://telegra.ph/file/946c7a6c0a1b9ba01aa33.mp4',
    'https://telegra.ph/file/2bbdb2db19041e00b3940.mp4',
    'https://telegra.ph/file/a5381e961a4ce1f241754.mp4',
    'https://telegra.ph/file/3654ba4560353536c9dd0.mp4',
    'https://telegra.ph/file/92cbea930cbc5ee7e0ca1.mp4',
    'https://telegra.ph/file/da6f531ecd4f4d40366c5.mp4',
    'https://telegra.ph/file/1b89b8dd35769209b4bd1.mp4',
    'https://telegra.ph/file/49339de9031d38dc486c2.mp4',
    'https://telegra.ph/file/46293f40b35c1cfde2586.mp4',
    'https://telegra.ph/file/238c990f88b97bd7b3cb0.mp4',
    'https://telegra.ph/file/414acce8e048fe69da3cd.mp4',
    'https://telegra.ph/file/2383ed97407a43e8d989f.mp4',
    'https://telegra.ph/file/8b5a60b3da01c52569faa.mp4',
    'https://telegra.ph/file/f98256a6d8ffa33f12034.mp4',
    'https://telegra.ph/file/6bb24576adf0d87a7f633.mp4',
    'https://telegra.ph/file/b8a0fffbcc36baa19994c.mp4',
    'https://telegra.ph/file/558dc0067d22e50089fe9.mp4',
    'https://telegra.ph/file/413b4d7c595749bea9d7b.mp4',
    'https://telegra.ph/file/7d978745ac23fa168317e.mp4',
    'https://telegra.ph/file/eb27d151a6a5bea4420bb.mp4',
    'https://telegra.ph/file/c9d0c7d36eecd290376f0.mp4',
    'https://telegra.ph/file/533c62d24ab090876c738.mp4',
    'https://telegra.ph/file/7f919be93903e8c464a47.mp4',
    'https://telegra.ph/file/34679f2be87c3a93c55fd.mp4',
    'https://telegra.ph/file/1523758805fa40337001d.mp4',
    'https://telegra.ph/file/83ef701b7510bfb308d39.mp4',
    'https://telegra.ph/file/78ba3a03f7866579ea028.mp4',
    'https://telegra.ph/file/bcb2246cc76ff906f1064.mp4',
    'https://telegra.ph/file/7c4abdb895db3e8c99c7b.mp4',
    'https://telegra.ph/file/062d171afb11c4990d74b.mp4',
    'https://telegra.ph/file/343d09a2e9ec9bea98849.mp4',
    'https://telegra.ph/file/b7eb17d48c54e1f68de93.mp4',
    'https://telegra.ph/file/4a14dd7f58f916571dd29.mp4',
    
]