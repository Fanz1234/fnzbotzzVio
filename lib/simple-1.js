const {default: makeWASocket,
  makeWALegacySocket,
  extractMessageContent,
  makeInMemoryStore,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  downloadMediaMessage, 
  getBinaryNodeChild,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  getContentType,
  relayMessage,
  WA_DEFAULT_EPHEMERAL
  } = (await import('baileys')).default
  import chalk from 'chalk'
  import fetch from 'node-fetch'
  import jimp from 'jimp'
  import {fileTypeFromBuffer as fromBuffer} from 'file-type'
  import PhoneNumber from 'awesome-phonenumber'
  import { exec, spawn } from "child_process"
  import fs from 'fs-extra'
  import path from'path'
  import moment from "moment-timezone"
  import {  getBuffer} from "./myfunc.js"
  import { join, dirname } from 'path'
  import { fileURLToPath, URL } from 'url'
  import { format } from 'util'
  import {fileTypeFromFile,fileTypeFromStream,fileTypeFromBuffer} from 'file-type';
  import got from 'got';
  import webp from "node-webpmux"
  import ffmpeg from "fluent-ffmpeg";
  import pino from 'pino';
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  
  export const Socket = (connectionOptions, options = {}) => {
  const conn = makeWASocket(connectionOptions)
  
  //Funtion to get file buffer
  const buffer = (path) => {
  let result = /^https?:\/\//.test(path) ? {url: path} : path //Buffer.isBuffer(path) ? path : path //  /^data:.*?\/.*?;base64,/i.test(path) ? 'tidak ada' : 'ada'
  // Buffer.isBuffer(path) ? path : /^data:.*? :  Buffer.from(path.split`,`[1], 'base64')
  ///^https?:\/\//.test(path) ? {url: path} :
  //fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
  return result
  }
  
  
  
  //LOAD MESSAGES
  conn.loadMessage = (messageID) => {
  return Object.entries(conn.chats)
  .filter(([_, { messages }]) => typeof messages === 'object')
  .find(([_, { messages }]) => Object.entries(messages)
  .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
  ?.[1].messages?.[messageID]
  }
  
  
  //SETTING
  conn.decodeJid = (jid) => {
  if (!jid) return jid
  if (/:\d+@/gi.test(jid)) {
  let decode = jidDecode(jid) || {}
  return decode.user && decode.server && decode.user + '@' + decode.server || jid
  } else return jid
  }
  
  
    
  
  
  if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
  conn.chats = {}
  conn.contacts = {}
  
  
  
  //Funtion o geing file
  conn.getFile = async (PATH, returnAsFilename) => {
  let res, filename
  let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
  if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
  let type = await fromBuffer(data) || {
  mime: 'application/octet-stream',
  ext: '.bin'
  }
  if (data && returnAsFilename && !filename) (filename = path.join(__dirname,  '../' +new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
  return {
  res,
  filename,
  ...type,
  data
  }
  }
  
  
  conn.saveName = async (id, name = '') => {
  if (!id) return
  id = conn.decodeJid(id)
  let isGroup = id.endsWith('@g.us')
  if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
  let metadata = {}
  if (isGroup) metadata = await conn.groupMetadata(id)
  let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
  if(!isGroup) conn.contacts[id] = chat
  //conn.chats[id] = chat
  }
  
  
  
  //Funtion Send Media All Type
  conn.sendMedia = async (jid, path, quoted, options = {}) => {
  let { ext, mime, data } = await conn.getFile(path)
  let messageType = mime.split("/")[0]
  let pase = messageType.replace('application', 'document') || messageType
  return await conn.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
  }
  
  
  
  
  
  
  
  /**
  * Send Contact
  * @param {String} jid
  * @param {String} number
  * @param {String} name
  * @param {Object} quoted
  * @param {Object} options
  */
  conn.sendContact = async (jid, number, name, quoted, options) => {
  let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
  let vcard = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${name.replace(/\n/g, '\\n')}
  TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
  END:VCARD
  `
  return await conn.sendMessage(jid, {
  contacts: {
  displayName: `${name}`,
  contacts: [{ vcard }],
  ...options
  }
  },
  {
  quoted,
  ...options
  })
  }
  
  
  
  
  /**
  * Reply to a message
  * @param {String} jid
  * @param {String|Object} text
  * @param {Object} quoted
  * @param {Object} mentions [m.sender]
  */
  conn.reply = (jid, text = '', quoted, options) => {
  return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text }, { quoted, ...options })
  }
  
  
  
  
  conn.processMessageStubType = async(m) => {
  /**
  * to process MessageStubType
  * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m
  */
  if (!m.messageStubType) return
  const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
  if (!chat || chat === 'status@broadcast') return
  const emitGroupUpdate = (update) => {
  ev.emit('groups.update', [{ id: chat, ...update }])
  }
  switch (m.messageStubType) {
  case WAMessageStubType.REVOKE:
  case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
  emitGroupUpdate({ revoke: m.messageStubParameters[0] })
  break
  case WAMessageStubType.GROUP_CHANGE_ICON:
  emitGroupUpdate({ icon: m.messageStubParameters[0] })
  break
  default: {
  console.log({
  messageStubType: m.messageStubType,
  messageStubParameters: m.messageStubParameters,
  type: WAMessageStubType[m.messageStubType]
  })
  break
  }
  }
  const isGroup = chat.endsWith('@g.us')
  if (!isGroup) return
  let chats = conn.chats[chat]
  if (!chats) chats = conn.chats[chat] = { id: chat }
  chats.isChats = true
  const metadata = await conn.groupMetadata(chat).catch(_ => null)
  if (!metadata) return
  chats.subject = metadata.subject
  chats.metadata = metadata
  }
  
    
  
  
    conn.pushMessage = async(m) => {
    /**
    * pushMessage
    * @param {import('@adiwajshing/baileys').proto.WebMessageInfo[]} m
    */
    if (!m) return
    if (!Array.isArray(m)) m = [m]
    for (const message of m) {
    try {
    // if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
    if (!message) continue
    if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
    const _mtype = Object.keys(message.message || {})
    const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
    (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
    _mtype[_mtype.length - 1]
    const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
    if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
    /**
    * @type {import('@adiwajshing/baileys').proto.IContextInfo}
    */
    let context = message.message[mtype].contextInfo
    let participant = conn.decodeJid(context.participant)
    const remoteJid = conn.decodeJid(context.remoteJid || participant)
    /**
    * @type {import('@adiwajshing/baileys').proto.IMessage}
    *
    */
    let quoted = message.message[mtype].contextInfo.quotedMessage
    if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
    let qMtype = Object.keys(quoted)[0]
    if (qMtype == 'conversation') {
    quoted.extendedTextMessage = { text: quoted[qMtype] }
    delete quoted.conversation
    qMtype = 'extendedTextMessage'
    }
  
    if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
    quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
    const isGroup = remoteJid.endsWith('g.us')
    if (isGroup && !participant) participant = remoteJid
    const qM = {
    key: {
    remoteJid,
    fromMe: areJidsSameUser(conn.user.jid, remoteJid),
    id: context.stanzaId,
    participant,
    },
    message: JSON.parse(JSON.stringify(quoted)),
    ...(isGroup ? { participant } : {})
    }
    let qChats = conn.chats[participant]
    if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup }
    if (!qChats.messages) qChats.messages = {}
    if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
    let qChatsMessages
    if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
    }
    }
    if (!chat || chat === 'status@broadcast') continue
    const isGroup = chat.endsWith('@g.us')
    let chats = conn.chats[chat]
    if (!chats) {
    if (isGroup) await conn.insertAllGroup().catch(console.error)
    chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) }
    }
    let metadata, sender
    if (isGroup) {
    if (!chats.subject || !chats.metadata) {
    metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {}
    if (!chats.subject) chats.subject = metadata.subject || ''
    if (!chats.metadata) chats.metadata = metadata
    }
    sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '')
    if (sender !== chat) {
    let chats = conn.chats[sender]
    if (!chats) chats = conn.chats[sender] = { id: sender }
    if (!chats.name) chats.name = message.pushName || chats.name || ''
    }
    } else if (!chats.name) chats.name = message.pushName || chats.name || ''
    if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
    chats.isChats = true
    if (!chats.messages) chats.messages = {}
    const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id)
    if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
    delete message.message.messageContextInfo
    delete message.message.senderKeyDistributionMessage
    chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
    let chatsMessages
    if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
    }
    } catch (e) {
    console.error(e)
    }
    }
    }
  
  
  
  
  
  /**
  * sendGroupV4Invite
  * @param {String} jid
  * @param {*} participant
  * @param {String} inviteCode
  * @param {Number} inviteExpiration
  * @param {String} groupName
  * @param {String} caption
  * @param {*} options
  * @returns
  */
  conn.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
  let msg = proto.Message.fromObject({
  groupInviteMessage: proto.GroupInviteMessage.fromObject({
  inviteCode,
  inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
  groupJid: jid,
  groupName: groupName ? groupName : this.getName(jid),
  caption
  })
  })
  let message = await this.prepareMessageFromContent(participant, msg, options)
  await this.relayWAMessage(message)
  return message
  }
  
  /**
  *Message
  */
  conn.relayWAMessage = async (pesanfull) => {
  var mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
  conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
  return mekirim
  }
  
  /**
  * cMod
  * @param {String} jid
  * @param {*} message
  * @param {String} text
  * @param {String} sender
  * @param {*} options
  * @returns
  */
  conn.cMod = async (jid, message, text = '', sender = conn.user.jid, options = {}) => {
  if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
  let copy = message.toJSON()
  delete copy.message.messageContextInfo
  delete copy.message.senderKeyDistributionMessage
  let mtype = Object.keys(copy.message)[0]
  let msg = copy.message
  let content = msg[mtype]
  if (typeof content === 'string') msg[mtype] = text || content
  else if (content.caption) content.caption = text || content.caption
  else if (content.text) content.text = text || content.text
  if (typeof content !== 'string') {
  msg[mtype] = { ...content, ...options }
  msg[mtype].contextInfo = {
  ...(content.contextInfo || {}),
  mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
  }
  }
  if (copy.participant) sender = copy.participant = sender || copy.participant
  else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
  if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
  else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
  copy.key.remoteJid = jid
  copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
  return proto.WebMessageInfo.fromObject(copy)
  }
  
  
  
  
  
  
  
  /**
  * Exact Copy Forward
  * @param {String} jid
  * @param {Object} message
  * @param {Boolean|Number} forwardingScore
  * @param {Object} options
  */
  conn.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
  let m = generateForwardMessageContent(message, !!forwardingScore)
  let mtype = Object.keys(m)[0]
  if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
  m = generateWAMessageFromContent(jid, m, { ...options, userJid: conn.user.id })
  await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options }})
  return m
  }
  
  
  
  
  
  conn.downloadM = async (m, type, saveToFile) => {
  let filename // = makeid(5)
  if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
  const stream = await downloadContentFromMessage(m, type)
  let buffer = Buffer.from([])
  for await (const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
  }
  if (saveToFile) ({ filename } = await conn.getFile(buffer, true))
  return saveToFile && fs.existsSync(filename) ? filename : buffer
  }
  
  conn.downloadMed = async (message, filename, attachExtension = true) => {
  if(filename == undefined) {
  var filename = makeid(5)
  }
  let mime = (message.msg || message).mimetype || ''
  let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
  const stream = await downloadContentFromMessage(message, messageType)
  let buffer = Buffer.from([])
  for await (const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
  }
  let type = await fromBuffer(buffer)
  let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
  //trueFileName = attachExtension ? filename : filename
  // save to file
  await fs.writeFileSync(trueFileName, buffer)
  return trueFileName
  }
  
  
  conn.downloadMediaMessage = async (message, filename) => {
    let media = await downloadMediaMessage(
      message,
      "buffer",
      {},
      {
        logger: pino({
          timestamp: () => `,"time":"${new Date().toJSON()}"`,
          level: "fatal",
        }).child({ class: "hisoka" }),
        reuploadRequest: conn.updateMediaMessage,
      }
    );
  
    if (filename) {
      let mime = await fileTypeFromBuffer(media);
      let filePath = path.join(process.cwd(), `${filename}.${mime.ext}`);
      fs.promises.writeFile(filePath, media);
      return filePath;
    }
  
    return media;
  };
  
  
  
  /**
  * Get name from jid
  * @param {String} jid
  * @param {Boolean} withoutContact
  */
  conn.getName =  (jid = '', withoutContact = false) => {
    let myUser = Object.keys(db.data.users)
    let jod = jid
    jid = conn.decodeJid(jid)
    withoutContact = conn.withoutContact || withoutContact
    let v
      
    if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
    v = conn.chats[jid] || {}
    if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {}
    resolve(v.name || v.subject )
    })
    else v = jid === '0@s.whatsapp.net' ? {
    jid,
    vname: 'WhatsApp'
    } : areJidsSameUser(jid, conn.user.id) ?
    conn.user :
    (conn.contacts[jid] || conn.chats[jid] || {}) // (withoutContact ? '' : v.name)
    return  v.vname || v.notify || v.verifiedName || v.verifiedBizName || v.name || (myUser.includes(jod)? db.data.users[jod].name : PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), ""))
    }
  
  
  
  
  
  
  
  
  
  conn.insertAllGroup = async() => {
  const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {}
  for (const group in groups) conn.chats[group] = { ...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
  return conn.chats
  }
  
  
  
  
  
  conn.getBusinessProfile = async (jid) => {
  const results = await conn.query({
  tag: 'iq',
  attrs: {
  to: 's.whatsapp.net',
  xmlns: 'w:biz',
  type: 'get'
  },
  content: [{
  tag: 'business_profile',
  attrs: { v: '244' },
  content: [{
  tag: 'profile',
  attrs: { jid }
  }]
  }]
  })
  const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
  if (!profiles) return {} // if not bussines
  const address = getBinaryNodeChild(profiles, 'address')
  const description = getBinaryNodeChild(profiles, 'description')
  const website = getBinaryNodeChild(profiles, 'website')
  const email = getBinaryNodeChild(profiles, 'email')
  const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
  return {
  jid: profiles.attrs?.jid,
  address: address?.content.toString(),
  description: description?.content.toString(),
  website: website?.content.toString(),
  email: email?.content.toString(),
  category: category?.content.toString(),
  }
  }
  
  conn.msToDate = (ms) => {
    let months = Math.floor(ms / (30 * 24 * 60 * 60 * 1000));
    let monthms = ms % (30 * 24 * 60 * 60 * 1000);
    let days = Math.floor(monthms / (24 * 60 * 60 * 1000));
    let daysms = monthms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor(minutesms / 1000);
    return months + " Bulan " + days + " Hari " + hours + " Jam " + minutes + " Menit";
  }
  
  
  conn.msToTime = (ms) => {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
  }
  
  conn.msToHour = (ms) => {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  return [h + ' Jam '].map(v => v.toString().padStart(2, 0)).join(' ')
  }
  
  conn.msToMinute = (ms) => {
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  return [m + ' Menit '].map(v => v.toString().padStart(2, 0)).join(' ')
  }
  
  conn.msToSecond = (ms) => {
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
  }
  
  conn.clockString = (ms) => {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
  }
  
  
  conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
  let buffer = Buffer.isBuffer(path)
  ? path
  : /^data:.*?\/.*?;base64,/i.test(path)
  ? Buffer.from(path.split`,`[1], 'base64')
  : /^https?:\/\//.test(path)
  ? await await getBuffer(path)
  : fs.existsSync(path)
  ? fs.readFileSync(path)
  : Buffer.alloc(0);
  return await conn.sendMessage(
  jid,
  { image: buffer, caption: caption, ...options },
  { quoted }
  );
  };
  
  
  conn.sendVideo = async (jid, yo, caption = '', quoted = '', gif = false, options) => {
  return await conn.sendMessage(jid, { video: yo, caption: caption, gifPlayback: gif, ...options }, {quoted })
  }
  
  
  conn.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
  let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
  return await conn.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
  }
  
  
  conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
  
  
  
  conn.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
  let msg = WAProto.Message.fromObject({
  groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
  inviteCode,
  inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
  groupJid: jid,
  groupName: groupName ? groupName : (await conn.groupMetadata(jid)).subject,
  jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
  caption
  })
  })
  const m = generateWAMessageFromContent(participant, msg, options)
  return await conn.relayMessage(participant, m.message, { messageId: m.key.id })
  }
  
  
  
  //SEND 1 KONTAK
  conn.sendKontak = (jid, nomor, nama, org = "", quoted = '', opts = {} ) => {
  const vcard ="BEGIN:VCARD\n"
  +"VERSION:3.0\n"
  + "FN:" +nama +"\n"
  +"ORG:" + org + "\n"
  +"TEL;type=CELL;type=VOICE;waid=" +nomor + ":+" +nomor +"\n"
  +"item1.X-ABLabel:Ponsel\n"
  +"item2.EMAIL;type=INTERNET:okeae2410@gmail.com\n"
  +"item2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\n"
  +"item3.X-ABLabel:Instagram\n"
  +"item4.ADR:;;Indonesia;;;;\n"
  +"item4.X-ABLabel:Region\n"
  +"END:VCARD"
  conn.sendMessage(jid,{contacts: {displayName: nama, contacts: [{ vcard }] }, ...opts},{quoted})
  };
  
  
  /**
  *
  * @param {*} message
  * @param {*} filename
  * @param {*} attachExtension
  * @returns
  */
  conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
  let quoted = message.msg ? message.msg : message
  let mime = (message.msg || message).mimetype || ''
  let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
  const stream = await downloadContentFromMessage(quoted, messageType)
  let buffer = Buffer.from([])
  for await(const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
  }
  let type = await fromBuffer(buffer)
  
  let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
  // save to file
  await fs.writeFileSync(trueFileName, buffer)
  return trueFileName
  }
  
  
  
  
  
  
  //Funtion untuk mengganti nama file
  conn.renameFile = async(path, newPath) => {
  return new Promise((res, rej) => {
  fs.rename(path, newPath, (err, data) =>
  err
  ? rej(err)
  : res(data));
  });
  }
  
  //Function agar bisa ngetag orang
  conn.parseMention = (text = '') => {
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
  }
  
  
  
  
  //Function to Send Media/File with Automatic Type Specifier
  conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await conn.getFile(path, true)
  let { res, data: file, filename: pathFile } = type
  if (res && res.status !== 200 || file.length <= 65536) {
  try { throw { json: JSON.parse(file.toString()) } }
  catch (e) { if (e.json) throw e.json }
  }
  let opt = { filename }
  if (quoted) opt.quoted = quoted
  if (!type) if (options.asDocument) options.asDocument = true
  let mtype = '', mimetype = type.mime
  if (/webp/.test(type.mime)) mtype = 'sticker'
  else if (/image/.test(type.mime)) mtype = 'image'
  else if (/video/.test(type.mime)) mtype = 'video'
  else if (/audio/.test(type.mime)) (
  //convert = await (ptt ? toPTT : toAudio)(file, type.ext),
  //file = convert.data,
  //pathFile = convert.filename,
  mtype = 'audio',
  mimetype = 'audio/ogg; codecs=opus'
  )
  else mtype = 'document'
  await conn.sendMessage(jid, {
  ...options,
  caption,
  ptt,
  [mtype]: { url: pathFile },
  mimetype
  }, {
  ...opt,
  ...options
  })
  return fs.unlinkSync(pathFile)
  }
  
  //send ExternlAdReply
  conn.sendAdReply = async (jid,text, title, body,link,quoted = {}) => {
  let contextInfo = {
  forwardingScore: 50,
  isForwarded: true,
  externalAdReply:{
  mediaType: 1,
  renderLargerThumbnail : true,
  showAdAttribution: false,
  title: title,
  body: body,
  thumbnailUrl: link
  }
  }
  conn.sendMessage(jid,{contextInfo,text},quoted)
  
  }
  
  
  
  conn.logger = {
  info(...args) {
  console.log(
  chalk.bold.bgRgb(51, 204, 51)('INFO '),
  `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
  chalk.cyan(format(...args))
  )
  },
  error(...args) {
  console.log(
  chalk.bold.bgRgb(247, 38, 33)('ERROR '),
  `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
  chalk.rgb(255, 38, 0)(format(...args))
  )
  },
  warn(...args) {
  console.log(
  chalk.bold.bgRgb(255, 153, 0)('WARNING '),
  `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
  chalk.redBright(format(...args))
  )
  },
  trace(...args) {
  console.log(
  chalk.grey('TRACE '),
  `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
  chalk.white(format(...args))
  )
  },
  debug(...args) {
  console.log(
  chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
  `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
  chalk.white(format(...args))
  )
  }
  }
  
  
  
  conn.adReply = async (jid, text, title = '', body = '', buffer, source = '', quoted, options) => {
  let { data } = await conn.getFile(buffer, true)
  return conn.sendMessage(jid, { text: text,
  contextInfo: {
  mentionedJid: await conn.parseMention(text),
  externalAdReply: {
  showAdAttribution: true,
  mediaType: 1,
  title: title,
  body: body,
  thumbnail: data,
  renderLargerThumbnail: true,
  sourceUrl: source
  }
  }
  }, { quoted: quoted, ...options })
  }
  
  
  conn.resize = (buffer, uk1, uk2) => {
  return new Promise(async(resolve, reject) => {
  let baper = await jimp.read(buffer);
  let result = await baper.resize(uk1, uk2).getBufferAsync(jimp.MIME_JPEG)
  resolve(result)
  })
  }
  
  
  conn.loadMime = async (path) => {
  let media = buffer(path)
  if(media.url){
  const stream = got.stream(media.url);
  let data = await fileTypeFromStream(stream)
  return data.mime
  } else if(Buffer.isBuffer(media)){
  let data = await fileTypeFromBuffer(media)
  return data.mime
  } else {
  let data = await fileTypeFromFile(media)
  
  return data.mime
  }
  }
  
  //Untuk mendeteksi size pada folder
  conn.getDirSize = (dirPath) => {
  let size = 0;
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
  const filePath = path.join(dirPath, files[i]);
  const stats = fs.statSync(filePath);
  if (stats.isFile()) {
  size += stats.size;
  } else if (stats.isDirectory()) {
  size += conn.getDirSize(filePath);
  }
  }
  return size;
  };
  
  //Untuk mendeteksi size pada file
  conn.getFileSize = (filename) => {
  let stats = fs.statSync(filename);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
  }
  
  //Kode By Dittaz
  //Untuk membuat sticker
  conn.toSticker = async (from,path,m) => {
  let mime = await conn.loadMime(path)
  let check = buffer(path)
  //let ffmpeg = require('fluent-ffmpeg')
  
  
  
  
    
  
  
  
  
  if(check.url) {
  let buf = await getBuffer(check.url)
  
  if(mime === "image/gif"){
  let file = getRandomFile('.gif')
  await fs.writeFile(file, buf)
  var media = file
  } else if(mime === 'image/jpeg' || mime === 'image/jpg' || mime === 'image/png'  ){
  let file = getRandomFile('.jpeg')
  await fs.writeFile(file, buf)
  var media = file
  } else if(mime === 'video/mp4'){
  let file = getRandomFile('.mp4')
  await fs.writeFile(file, buf)
  var media = file
  }
  
  
  } else if(Buffer.isBuffer(check)){
  let name = getRandomFile('.'+mime.split('/')[1])
  await fs.writeFileSync(name, check)
  var media = name
  } else {
  var media = check
  
  }
  
  let output = getRandomFile('.webp')

  let { Sticker, StickerTypes } = require('wa-sticker-formatter')
  let jancok = new Sticker(media, {
      pack: packName, // The pack name
      author: authorName, // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 50, // The quality of the output file
      background: '#FFFFFF00' // The sticker background color (only for full stickers)
  })
  let stok = getRandomFile(".webp")
  let nono = await jancok.toFile(stok)
  let nah = fs.readFileSync(nono)
    conn.sendMessage(from,{sticker: nah},{quoted: m})
      fs.unlinkSync(stok)
  
  
  }
  
  
  conn.fileSize = (bytes) => {
  if (bytes === 0) {
  return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
  }
  
  
  
  
  Object.defineProperty(conn, 'name', {
  value: { ...(options.chats || {}) },
  configurable: true,
  
  
  
  
  
  })
  if (conn.user?.id) conn.user.jid = conn.decodeJid(conn.user.id)
  //bind(conn)
  store.bind(conn.ev)
  return conn
  
  
  
  
  
  
  
  
  
  //------------------------------[ BATAS KATULISTIWA ]----------------------------\\
  }
  
  /**
  * Serialize Message
  * @param {WAConnection} conn
  * @param {Object} m
  * @param {Boolean} hasParent
  */
  export const smsg = async (conn, m, hasParent) => {
  if (!m) return m
  let M = proto.WebMessageInfo
  m = M.fromObject(m)
  if (m.key) {
  m.id = m.key.id
  m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
  m.chat = conn.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
  m.now = m.messageTimestamp
  m.isGroup = m.chat.endsWith('@g.us')
  m.sender = conn.decodeJid(m.key.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
  m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, conn.user.id)
  m.from  = m.key.remoteJid
  
  
  if(m.isGroup){
  m.groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await conn.groupMetadata(m.chat).catch(_ => null)) : {}) || {} //(m.isGroup ? await conn.groupMetadata(m.from) : {}) || {}
  m.groupName =  (m.isGroup ? m.groupMetadata.subject : []) || []
  m.groupId =  (m.isGroup ? m.groupMetadata.id : []) || []
  m.groupMembers = (m.isGroup ? m.groupMetadata.participants : []) || []
  m.groupDesc =  (m.isGroup ? m.groupMetadata.desc : []) || []
  m.groupOwner =  (m.isGroup ? m.groupMetadata.subjectOwner : []) || []
  m.user = (m.isGroup ? m.groupMembers.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
  m.bot = (m.isGroup ? m.groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) : {}) || {} // Your Data
  m.isRAdmin = m.user && m.user.admin == 'superadmin' || false
  m.isAdmin = m.isRAdmin || m.user && m.user.admin == 'admin' || false
  m.isBotAdmin = m.bot && m.bot.admin == 'admin' || false // Are you Admin?
  }
  
  }
  
  // (m.type == 'stickerMessage') ? db.data.users[m.sender].sticker[m.message.stickerMessage.fileSha256]? db.data.users[m.sender].sticker[m.message.stickerMessage.fileSha256].text : false : 
  
  if (m.message) {
  let mtype = Object.keys(m.message)
  m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) ||
  (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1]
  m.type = getContentType(m.message)
  m.content = JSON.stringify(m.message)
  m.botNumber = conn.user.id ? conn.user.id.split(":")[0]+"@s.whatsapp.net" : conn.user.jid
  m.senderNumber = m.sender.split("@")[0]
  m.pushname = m.pushName || "No Name"
  m.itsMe = m.sender == m.botNumber ? true : false
  m.mentionByTag = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : false
  m.download = (saveToFile = false) => conn.downloadM(m, m.mtype.replace(/message/i, ''), saveToFile)
  m.mentionByReply = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? 
  m.message.extendedTextMessage.contextInfo.participant || "" : m.type == "stickerMessage" && m.message.stickerMessage.contextInfo != null ? m.message.stickerMessage.contextInfo.participant || "" : ""
  
  m.users = m.mentionByReply? m.mentionByReply : m.mentionByTag[0]
  m.budy = (m.type === 'conversation') ? m.message.conversation : 
  (m.type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ""
   
  // Pastikan objek global.db.data.users[m.sender] telah didefinisikan
  if (global.db.data.users[m.sender]) {
    // Jika objek telah didefinisikan, lanjutkan dengan mengakses properti 'sticker'
    global.db.data.users[m.sender].sticker = global.db.data.users[m.sender].sticker || {};
  } else {
    // Jika objek belum didefinisikan, inisialisasi objek global.db.data.users[m.sender] dengan properti 'sticker'
    global.db.data.users[m.sender] = { sticker: {} };
  }
  
  let User = db.data.users[m.sender] 
  let cmdStik = (m.type == 'stickerMessage') ? db.data.users[m.sender].sticker[m.message.stickerMessage.fileSha256] : ''
  m.body = (m.type === 'conversation') ?  m.message.conversation : 
  (m.type === 'interactiveMessage' || m.type === 'interactiveResponseMessage') ?  JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : 
  (m.type == 'imageMessage') ? m.message.imageMessage.caption : 
    (m.type == 'stickerMessage') ? cmdStik? cmdStik.text : '' :      //db.data.users[m.sender].premiumTime !== 0 ? db.data.users[m.sender].sticker[m.message.stickerMessage.fileSha256]? db.data.users[m.sender].sticker[m.message.stickerMessage.fileSha256].text : "" : "" :
    (m.type == 'videoMessage') ? m.message.videoMessage.caption : 
    (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : 
    (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : 
    (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
    (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
     (m.type === 'viewOnceMessageV2') ? m.message.viewOnceMessageV2.message.imageMessage ?
    m.message.viewOnceMessageV2.message.imageMessage.caption :  
    m.message.viewOnceMessageV2.message.videoMessage.caption : ''
  m.args = m.body.trim().split(/ +/).slice(1)
  m.numberQuery = m.args.join(' ').replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
  
  
  m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.type])
  if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
  if (m.mtype == 'protocolMessage' && m.msg.key) {
  if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
  if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
  m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
  if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
  }
  
  m.myButton = m.isGroup && (m.type == 'interactiveResponseMessage' && m.message.interactiveResponseMessage.contextInfo.participant !== m.botNumber
  || m.type == 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.contextInfo.participant !== m.botNumber
  || m.type == 'listResponseMessage' && m.message.listResponseMessage.contextInfo.participant !== m.botNumber)
  
  
  try{
  var virus = m.message.extendedTextMessage.contextInfo.externalAdReply.title.length
  }catch{
  var virus = 100
  }
  
  m.virtex = m.type == "groupInviteMessage" && m.message.groupInviteMessage.caption.length > 8000 ||  m.type == "contactMessage" && m.message.contactMessage.displayName.length > 8000 || m.type == "imageMessage" && m.message.imageMessage.caption.length > 8000 || m.budy.length > 8000 && !m.fromMe  || m.type == "extendedTextMessage" && virus > 8000 && !m.fromMe ||  m.type == "productMessage" && m.message.productMessage.product.description.length > 8000 && !m.fromMe
  
  
  //Ucapan Waktu
  const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
  if(timeWib < "23:59:00"){ var ucapanWaktu = 'Selamat malam' }
  if(timeWib < "19:00:00"){ var ucapanWaktu = 'Selamat malam'}
  if(timeWib < "18:00:00"){ var ucapanWaktu = 'Selamat sore'}
  if(timeWib < "15:00:00"){ var ucapanWaktu = 'Selamat siang'}
  if(timeWib < "11:00:00"){ var ucapanWaktu = 'Selamat pagi'}
  if(timeWib < "06:00:00"){ var ucapanWaktu = 'Selamat pagi'}
  m.ucapanWaktu = ucapanWaktu
  
  //m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
  m.text =  m.body
  
  
  m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
  let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
  if (m.quoted) {
  let type = Object.keys(m.quoted)[0]
  m.quoted = m.quoted[type]
  if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
  m.quoted.mtype = type
  m.quoted.id = m.msg.contextInfo.stanzaId
  m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
  m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
  m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
  m.quoted.fromMe = m.quoted.sender === conn.user.jid
  
  m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
  m.quoted.name = conn.getName(m.quoted.sender)
  m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
  let vM = m.quoted.fakeObj = M.fromObject({
  key: {
  fromMe: m.quoted.fromMe,
  remoteJid: m.quoted.chat,
  id: m.quoted.id
  },
  message: quoted,
  ...(m.isGroup ? { participant: m.quoted.sender } : {})
  })
  
  
  m.getQuotedObj = m.getQuotedMessage = async () => {
  if (!m.quoted.id) return null
  let q = M.fromObject(await conn.loadMessage(m.quoted.id) || vM)
  return smsg(conn, q)
  }
  
  
  m.quoted.download = (saveToFile = false) => conn.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
  //m.quoted.download = (saveToFile = false) => conn.downloadMediaMessage(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
  
  /**
  * Reply to quoted message
  * @param {String|Object} text
  * @param {String|false} chatId
  * @param {Object} options
  */
  m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)
  m.quoted.replys = (text, chatId, options) => conn.replys(chatId ? chatId : m.chat, text, vM, options)
  /**
  * Copy quoted message
  */
  m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))
  
  /**
  * Forward Quoted Message
  * @param {String} jid
  * @param {Boolean} forceForward
  */
  m.quoted.forward = (jid, forceForward = false) => conn.forwardMessage(jid, vM, forceForward)
  
  /**
  * Exact Forward quoted message
  * @param {String} jid
  * @param {Boolean|Number} forceForward
  * @param {Object} options
  */
  m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
  
  /**
  * Modify quoted Message
  * @param {String} jid
  * @param {String} tex
  * @param {String} sender
  * @param {Object} options
  */
  m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)
  
  /**
  * Delete quoted message
  */
  m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
  }
  }
  m.name = !nullish(m.pushName) && m.pushName || conn.getName(m.sender)
  if (m.msg && m.msg.url) m.download = (saveToFile = false) => conn.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
  
  /**
  * Reply to this message
  * @param {String|Object} text
  * @param {String|false} chatId
  * @param {Object} options
  */
  m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)
  m.replys = (text, chatId, options) => conn.replys(chatId ? chatId : m.chat, text, m, options)
  /**
  * Exact Forward this message
  * @param {String} jid
  * @param {Boolean} forceForward
  * @param {Object} options
  */
  m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)
  /**
  * Modify this Message
  * @param {String} jid
  * @param {String} text
  * @param {String} sender
  * @param {Object} options
  */
  m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)
  
  /**
  * Delete this message
  */
  m.delete = () => conn.sendMessage(m.chat, { delete: m.key })
  try {
  conn.saveName(m.sender, m.name)
  conn.pushMessage(m)
  //if (m.isGroup) conn.saveName(m.chat)
  if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
  } catch (e) {
  console.error(e)
  }
  return m
  }
  
  let logic = (check, inp, out) => {
  if (inp.length !== out.length) throw new Error('Input and Output must have same length')
  for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
  return null
  }
  
  
  
  
  
  
  
  
  
  export function protoType() {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
  const ab = new ArrayBuffer(this.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < this.length; ++i) {
  view[i] = this[i];
  }
  return ab;
  }
  /**
  * @returns {ArrayBuffer}
  */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
  return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  /**
  * @returns {Buffer}
  */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
  return Buffer.from(new Uint8Array(this))
  }
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
  return await fileTypeFromBuffer(this)
  }
  /**
  * @returns {Boolean}
  */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  /**
  *
  * @returns {String}
  */
  String.prototype.capitalize = function capitalize() {
  return this.charAt(0).toUpperCase() + this.slice(1, this.length)
  }
  /**
  * @returns {String}
  */
  String.prototype.capitalizeV2 = function capitalizeV2() {
  const str = this.split(' ')
  return str.map(v => v.capitalize()).join(' ')
  }
  String.prototype.decodeJid = function decodeJid() {
  if (/:\d+@/gi.test(this)) {
  const decode = jidDecode(this) || {}
  return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
  } else return this.trim()
  }
  /**
  * number must be milliseconds
  * @returns {string}
  */
  Number.prototype.toTimeString = function toTimeString() {
  // const milliseconds = this % 1000
  const seconds = Math.floor((this / 1000) % 60)
  const minutes = Math.floor((this / (60 * 1000)) % 60)
  const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
  const days = Math.floor((this / (24 * 60 * 60 * 1000)))
  return (
  (days ? `${days} day(s) ` : '') +
  (hours ? `${hours} hour(s) ` : '') +
  (minutes ? `${minutes} minute(s) ` : '') +
  (seconds ? `${seconds} second(s)` : '')
  ).trim()
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
  }
  
  function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
  }
  
  
  function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
  return Math.floor(Math.random() * this)
  }
  
  
  /**
  * ??
  * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  * @returns {boolean}
  */
  function nullish(args) {
  return !(args !== null && args !== undefined)
  }
