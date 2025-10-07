require("./MIMISETTINGS/settings");
const {
  default: makeWaSocket,
  socket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@whiskeysockets/baileys");
const { modul } = require("./MIMILIBRARY/module");
const { exec } = require("child_process");
const { axios, baileys, chalk, cheerio, FileType, fs, ffmpeg, PhoneNumber, process, moment, ms, util, ytdl,  } = modul;
const os = require('os');
const speed = require('performance-now')
const sharp = require('sharp');
const { color, bgcolor } = require("./MIMILIBRARY/color");
const { delay } = require("@whiskeysockets/baileys");
const readFile = util.promisify(fs.readFile);
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const path = require("path");

module.exports = conn = async (conn, m, chatUpdate, store) => {
try {
  async function appenTextMessage(text, chatUpdate) {
    let messages = await generateWAMessage(
      m.chat,
      {
        text: text,
        mentions: m.mentionedJid,
      },
      {
        userJid: conn.user.id,
        quoted: fkontak.quoted && m.quoted.fakeObj,
      },
    );
    messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    conn.ev.emit("messages.upsert", msg);
  }
  const { type, quotedMsg, mentioned, now, fromMe } = m;
  let body =
    m.mtype === "interactiveResponseMessage"
      ? JSON.parse(
          m.message.interactiveResponseMessage.nativeFlowResponseMessage
            .paramsJson,
        ).id
      : m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype == "videoMessage"
            ? m.message.videoMessage.caption
            : m.mtype == "extendedTextMessage"
              ? m.message.extendedTextMessage.text
              : m.mtype == "buttonsResponseMessage"
                ? m.message.buttonsResponseMessage.selectedButtonId
                : m.mtype == "listResponseMessage"
                  ? m.message.listResponseMessage.singleSelectReply
                      .selectedRowId
                  : m.mtype == "templateButtonReplyMessage"
                    ? m.message.templateButtonReplyMessage.selectedId
                    : m.mtype == "messageContextInfo"
                      ? m.message.buttonsResponseMessage?.selectedButtonId ||
                        m.message.listResponseMessage?.singleSelectReply
                          .selectedRowId ||
                        m.text
                      : m.mtype === "editedMessage"
                        ? m.message.editedMessage.message.protocolMessage
                            .editedMessage.extendedTextMessage
                          ? m.message.editedMessage.message.protocolMessage
                              .editedMessage.extendedTextMessage.text
                          : m.message.editedMessage.message.protocolMessage
                              .editedMessage.conversation
                        : "";

// ─────「 SET FILE 」───── \\
const {
  clockString,
  parseMention,
  formatp,
  isUrl,
  sleep,
  runtime,
  getBuffer,
  jsonformat,
  format,
  capital,
  reSize,
  getGroupAdmins, 
  fetchJson,
  generateProfilePicture
} = require("./MIMILIBRARY/myfunc");

const premium = JSON.parse(fs.readFileSync("./MIMIDATABASE/premium.json"))

// ─────「 SET BOT - ADMIN - OWNER 」───── \\
  const budy = (typeof m.text === 'string') ? m.text : '';
  const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
  const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
  const isCmd = body.startsWith(prefix);
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
  const args = body.trim().split(/ +/).slice(1)
  const chath = body;
  const pes = body;
  const content = JSON.stringify(m.message);
  const from = m.key.remoteJid;
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = m.sender === global.ownernumber.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const pushname = m.pushName || "Nothing";
  const text = (q = args.join(" "));
  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || "";
  const qmsg = quoted.msg || quoted;
  const isMedia = /image|video|sticker|audio/.test(mime);

  const isImage = type == "imageMessage";
  const isVideo = type == "videoMessage";
  const isAudio = type == "audioMessage";
  const isSticker = type == "stickerMessage";
  const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");
  const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage");
  const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage");
  const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage");
  const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage");
  const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage");
  const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage");
  const sender = m.isGroup ? m.key.participant ? m.key.participant : m.participant : m.key.remoteJid;
  const senderNumber = sender.split("@")[0];
  const isGroup = from.endsWith('@g.us')
    
 const groupMetadata = m?.isGroup ? await conn.groupMetadata(m?.chat).catch(e => {}) : {};
 const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
 const participants = m?.isGroup ? await groupMetadata.participants || [] : [];
 const groupAdmins = m?.isGroup ? await getGroupAdmins(participants) || [] : [];
 const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
 const isAdmins = m?.isGroup ? groupAdmins.includes(m?.sender) : false;
 const groupOwner = m?.isGroup ? groupMetadata.owner || '' : '';
 const isGroupOwner = m?.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m?.sender) : false;

  const isPremium = premium.includes(m.sender)
  const mentionUser = [ ...new Set([ ...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : []), ]), ];
  const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : [];
  const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : "";
  const numberQuery = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
  const usernya = mentionByReply ? mentionByReply : mentionByTag[0];
  const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false;
  const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  
// ─────「 CONSOLE 」───── \\
if (isCmd) {
const from = m.key.remoteJid
const chatType = from.endsWith("@g.us") ? "Group" : "Private"
console.log(
chalk.blue.bold("Messages Detected 🚀"), 
chalk.white.bold("\n▢ Command :"), chalk.white.bold(`${prefix+command}`), 
chalk.white.bold("\n▢ Pengirim :"), chalk.white.bold(`${sender}`), 
chalk.white.bold("\n▢ Name :"), chalk.white.bold(`${pushname}`), 
chalk.white.bold("\n▢ Chat Type :"), chalk.white.bold(`${chatType}\n\n`)
   )
}

// ─────「 SET REPLY 」───── \\
async function reply(teks) {
const nedd = {
contextInfo: {
forwardingScore: 999,
isForwarded: false,
forwardedNewsletterMessageInfo: {
newsletterName: global.namach,
newsletterJid: global.idch,
},
externalAdReply: {
showAdAttribution: false,
title: `${global.namabot}`,
body: time + ' UTC+7',
previewType: `${prefix} + ${command}`,
thumbnailUrl: global.thumbnail, 
sourceUrl: global.website,  
},
},
text: teks,
};
return conn.sendMessage(m.chat, nedd, {quoted: fkontak,});
}

const fkontak = {
        "key": {
        "participant": '0@s.whatsapp.net',
            "remoteJid": "status@broadcast",
                    "fromMe": false,
                    "id": "Halo"
                        },
       "message": {
                    "locationMessage": {
                    "name": `☁ ${global.namabot}`,
                    "jpegThumbnail": ''
                          }
                        }
                      } 

//menghapus statusMention di Group TagSw
if (m.mtype.includes("groupStatusMentionMessage") && m.isGroup) {
await conn.deleteMessage(m.chat, m.key);
}

// ─────「 SET FUNCTION 」───── \\
// Function Public / Self
if (!conn.public && !m.key.fromMe && !global.ownernumber.includes(m.sender.split("@")[0])) {
  return;
}

  // Function Send             
  async function sendconnMessage(chatId, message, options = {}) {
    let generate = await generateWAMessage(chatId, message, options);
    let type2 = getContentType(generate.message);
    if ("contextInfo" in options)
      generate.message[type2].contextInfo = options?.contextInfo;
    if ("contextInfo" in message)
      generate.message[type2].contextInfo = message?.contextInfo;
    return await conn.relayMessage(chatId, generate.message, {
      messageId: generate.key.id,
    });
  }

  // Function GetTypeData
  function GetType(Data) {
    return new Promise((resolve, reject) => {
      let Result, Status;
      if (Buffer.isBuffer(Data)) {
        Result = new Buffer.from(Data).toString("base64");
        Status = 0;
      } else {
        Status = 1;
      }
      resolve({
        status: Status,
        result: Result,
      });
    });
  }

  // Function RandomId
  function randomId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Function MonoSpace
  function monospace(string) {
    return '```' + string + '```'
}

  // Function MonoSpa
function monospa(string) {
    return '`' + string + '`'
}

  // Function GetRandomFile
function getRandomFile(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`;
}

  // Function PickRandom
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

  // Function RandomNomor
function randomNomor(min, max = null){
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

  // Function GenerateRandomPassword
function generateRandomPassword() {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
const length = 10;
let password = '';
for (let i = 0; i < length; i++) {
const randomIndex = Math.floor(Math.random() * characters.length);
password += characters[randomIndex];
}
return password;
}

  // Function GenerateRandomNumber
function generateRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

  // Function DellCase
async function dellCase(filePath, caseNameToRemove) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            return;
        }

        const regex = new RegExp(`case\\s+'${caseNameToRemove}':[\\s\\S]*?break`, 'g');
        const modifiedData = data.replace(regex, '');

        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error('Terjadi kesalahan saat menulis file:', err);
                return;
            }

            console.log(`Teks dari case '${caseNameToRemove}' telah dihapus dari file.`);
        });
    });
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

try {
const currentTimee = Date.now();
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!('autoread' in user)) user.autoread = true
} else global.db.data.users[m.sender] = {
autoread: true
}
} catch (err){
console.log(err)
}

if (global.db.data.autoread && global.db.data.autoread == true) conn.readMessages([m.key])
        
function countProfit(jumlahAwal) {
    jumlahAwal = parseInt(jumlahAwal)
    let keuntungan = jumlahAwal * 1
    if (keuntungan > 1000) {
        keuntungan = 1000
    }
    return (jumlahAwal + keuntungan).toFixed(0)
}

conn.ments = (teks = '') => {
return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : []
};

function genreff() {
  const characters = '0123456789';
  const length = 5;
  let reffidgen = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reffidgen += characters[randomIndex];
  }
  return reffidgen;
}
const regexPattern = txt => new RegExp(txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")

// ─────「 SETTING CASE 」───── \\
switch (command) {
case "menu": {
let teksnya = `
Haii @${m.sender.split("@")[0]},
i am an automated system (WhatsApp bot) that can help to do something search and get data / information only through WhatsApp.

*[ Information ]*
> Nama : ${pushname}
> Tag : @${sender.split("@")[0]}
> Status : ${conn.public ? "Public" : "Self"}
> Owner : @${global.ownernumber}
`
await conn.sendMessage(m.chat, {
  footer: `© Whatsapp Bot | ${global.namabot}`,
  buttons: [
    {
      buttonId: `.allmenu`,
      buttonText: { displayText: 'All Menu' },
      type: 1
    },
    {
      buttonId: `.owner`,
      buttonText: { displayText: 'Owner' },
      type: 1
    },
    {
      buttonId: `.donasi`,
      buttonText: { displayText: 'Donate' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  document: fs.readFileSync("./package.json"),
  fileName: `© ${global.packname}`,
  mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  fileLength: 99999999,
  caption: teksnya,
  contextInfo: {
   isForwarded: true, 
   mentionedJid: [m.sender], 
   forwardedNewsletterMessageInfo: {
   newsletterJid: global.idch,
   newsletterName: global.namach
   }, 
    externalAdReply: {
      title: `${global.namabot}`,
      body: `© WhatsApp Bot | ${global.foother}`,
      thumbnailUrl: global.thumbnail,
      sourceUrl: global.website,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: fkontak })
}
break
case 'allmenu':{
let mbut = `
Hi, @${sender.split("@")[0]}
I am ${global.namabot}, created using the Javascript language type commonjs, I was developed by ${global.ownername}

Commands : 

- Download :
> ${prefix}tt/tiktok

- Owner Menu
> ${prefix}self
> ${prefix}public
> ${prefix}addprem
> ${prefix}delprem
> ${prefix}addcase
> ${prefix}delcase

- Main Menu :
> ${prefix}runtime
> ${prefix}ping
> ${prefix}owner
> ${prefix}donasi

- Group Menu : 
> ${prefix}hidetag
> ${prefix}kick

- Info Menu :
> ${prefix}gempa
> ${prefix}kurs
`
conn.sendMessage(m.chat, {
document: fs.readFileSync("./package.json"),
fileName: `${global.namabot}`,
mimetype: "application/pdf",
fileLength: 99999,
pageCount: 666,
caption: mbut,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: `${global.namach}`,
newsletterJid: `${global.idch}`,
},
externalAdReply: {  
title: `${global.namabot}`, 
body: global.foother,
thumbnailUrl: global.thumbnail,
sourceUrl: global.website, 
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: fkontak })
};
break

// Info Menu
case 'kurs': {
  try {
    let base = "IDR"; // default kurs USD
    let { data } = await axios.get(`https://open.er-api.com/v6/latest/${base}`);

    if (!data || !data.rates) return reply("⚠️ Failed to fetch exchange rate data.");

    let teks = `💹 *Exchange Rates: ${base} to All Currencies*\n\n`;
    let count = 0;

    for (let [code, rate] of Object.entries(data.rates)) {
      teks += `1 ${base} = ${rate} ${code}\n`;
      count++;

      if (count % 40 === 0) {
        await conn.sendMessage(m.chat, { text: teks }, { quoted: fkontak });
        teks = "";
      }
    }

    if (teks.length > 0) {
      await conn.sendMessage(m.chat, { text: teks }, { quoted: fkontak });
    }

  } catch (e) {
    console.error(e);
    reply("⚠️ Failed to fetch exchange rate data.");
  }
}
break;
case 'gempa': {
  try {
    const res = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    const gempa = res.data.Infogempa.gempa;

    let pesan = `🌏 *BMKG Earthquake Info*\n\n`;
    pesan += `📅 Date: ${gempa.Tanggal}\n`;
    pesan += `⏰ Time: ${gempa.Jam}\n`;
    pesan += `📍 Location: ${gempa.Wilayah}\n`;
    pesan += `⚡ Magnitude: ${gempa.Magnitude}\n`;
    pesan += `📊 Depth: ${gempa.Kedalaman}\n`;
    pesan += `📌 Coordinates: ${gempa.Coordinates}\n`;
    pesan += `🚨 Potential: ${gempa.Potensi}\n\n`;
    pesan += `Source: BMKG (https://www.bmkg.go.id/)`;

    // gambar shakemap (peta guncangan BMKG)
    const shakemapUrl = `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`;

    // koordinat untuk map (contoh: "-7.38 106.57")
    const [lat, lon] = gempa.Coordinates.split(' ').map(c => c.trim());
    const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=6&size=600x400&markers=color:red%7C${lat},${lon}&key=YOUR_GOOGLE_MAPS_API_KEY`;

    // kirim info + shakemap
    await conn.sendMessage(m.chat, {
      image: { url: shakemapUrl },
      caption: pesan
    }, { quoted: fkontak });

    // kirim map lokasi (pakai Google Static Maps, perlu API key)
    await conn.sendMessage(m.chat, {
      image: { url: mapsUrl },
      caption: `🗺️ Earthquake location: ${gempa.Wilayah}\n(${lat}, ${lon})`
    }, { quoted: fkontak });

  } catch (err) {
    console.error(err);
    reply('⚠️ Failed to fetch earthquake data from BMKG.');
  }
  break;
}

// Download Menu
case 'tt':
case 'tiktok': {
  try {
    if (!text) return reply('Usage: .tiktok <tiktok_url>\nContoh: .tiktok https://www.tiktok.com/@user/video/1234567890');

    const tiktokUrl = text.trim();
    const apiUrl = `https://restapiikyjs.vercel.app/download/tiktok-v2?url=${encodeURIComponent(tiktokUrl)}`;

    reply('⏳ Fetching data from API...');

    const apiRes = await axios.get(apiUrl, { timeout: 15000 });
    const data = apiRes.data;

    if (!data?.result?.data) {
      return reply('Failed to find video data. API Response:\n' + JSON.stringify(data).slice(0, 1000));
    }

    const vid = data.result.data;

    // ambil link video
    const videoUrl = vid.play || vid.wmplay;
    if (!videoUrl) return reply('Video link not found in API data.');

    // ambil musik (opsional)
    const musicUrl = vid.music;

    // unduh video
    const dl = await axios.get(videoUrl, { responseType: 'arraybuffer', timeout: 30000 });
    const buffer = Buffer.from(dl.data);

    const maxSizeBytes = 15 * 1024 * 1024; // 15MB batas aman
    if (buffer.length > maxSizeBytes) {
      return reply(`Video too large (${(buffer.length/1024/1024).toFixed(2)} MB). Manual download:\n${videoUrl}`);
    }

    // kirim ke WhatsApp (contoh dengan baileys)
    await conn.sendMessage(m.chat, {
      video: buffer,
      fileName: `${vid.id}.mp4`,
      caption: `🎬 ${vid.title || 'Video TikTok'}\n\nRegion: ${vid.region}\n\n🔗 Tanpa WM: ${vid.play}\n🔗 Dengan WM: ${vid.wmplay}\n🎵 Music: ${musicUrl}`
    }, { quoted: fkontak });

  } catch (err) {
    console.error(err);
    reply('Terjadi error saat memproses. Error: ' + (err.message || String(err)).slice(0, 300));
  }
  break;
}

// ───────「 CASE FEATURES 」─────── \\
// Owner Menu
case 'self': {
if (!isCreator) return reply(mess.owner)
conn.public = false
reply('Successfully changed to Self Mode')
}
break

case 'public': {
if (!isCreator) return reply(mess.owner)
conn.public = true
reply('Successfully changed to Public Mode')
}
break

case "addprem": {
if (!isCreator) return
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} ${global.ownernumber}`)
let prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
let ceknya = await conn.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
premium.push(prrkek)
fs.writeFileSync("./MIMIDATABASE/premium.json", JSON.stringify(premium))
reply(`Successfully Added ${prrkek} To Database`)
}
break

case "delprem": {
if (!isCreator) return
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} ${global.ownernumber}`)
let ya = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
let unp = premium.indexOf(ya)
premium.splice(unp, 1)
fs.writeFileSync("./MIMIDATABASE/premium.json", JSON.stringify(premium))
reply(`Successfully Removed ${ya} From Database`)
}
break

case 'addcase': {
if (!isCreator) return reply(mess.owner)
if (!text) return reply('Where is the code case');
const fs = require('fs');
const namaFile = './case.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) {
console.error('An error occurred while reading the file:', err);
return;
}
const posisiAwalGimage = data.indexOf("case 'addcase':");

if (posisiAwalGimage !== -1) {
const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
if (err) {
reply('An error occurred while reading the file:', err);
} else {
reply('New case added successfully.');
}
});
} else {
reply('Cannot add case in file.');
}
});
}
break

case 'delcase': {
if (!isCreator) return reply(mess.owner)
if (!q) return reply('Enter the name of the case to be deleted.')

dellCase('./case.js', q)
reply(`*Dellcase Successfully*\n\n© Dellcase By ${global.namabot}`)
}
break

// Main Menu
case 'donasi':
let ctf = `Mau donasi? Silakan Di bawah ini\n\nNote : Terima kasih untuk donasinya kak,walau sedikit tapi berguna untuk owner :)`
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({
text: ctf
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: ``
}),
header: proto.Message.InteractiveMessage.Header.create({
title: '',
gifPlayback: true,
subtitle: '',
hasMediaAttachment: false  
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
"name": "cta_copy",
"buttonParamsJson": JSON.stringify({
"display_text": "Dana",
"copy_code": `083844970586`
})
},
{
"name": "cta_copy",
"buttonParamsJson": JSON.stringify({
"display_text": "Pulsa 1",
"copy_code": `083139882434`
})
},
{
"name": "cta_copy",
"buttonParamsJson": JSON.stringify({
"display_text": "Pulsa 2",
"copy_code": `083844970586`
})
}
],
}),
contextInfo: {
mentionedJid: [m.sender], 
forwardingScore: 999,
isForwarded: false,
forwardedNewsletterMessageInfo: {
newsletterJid: global.idch,
newsletterName: global.namach,
serverMessageId: 145
}
}})}}
}, {quoted: fkontak})
await conn.relayMessage(m.chat, msg.message, {
messageId: msg.key.id
})
break
case 'owner': {
let teks1 = `Halo kak\nJika ada fitur yang error bisa hubungi owner ya kak`
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
      contextInfo: {
                mentionedJid: [m.sender], 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: {
                        newsletterJid: idch,
                        newsletterName: namach, 
                        serverMessageId: -1
                },
                forwardingScore: 256,
            externalAdReply: {  
                title: '', 
                thumbnailUrl: 'https://files.catbox.moe/zhasgs.jpeg', 
                sourceUrl: global.website,
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: teks1
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'Whatsapp Bot | Ai Meta'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: false
        }),
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: [
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `${global.ownername} is my owner and creator who designed me to be this good\n\nNote: If any features have errors, contact them`
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `Owner ${global.namabot}`,
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/zhasgs.jpeg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Whatsapp Owner","url":"https://wa.me/6283139882434","merchant_url":"https://google.com"}`
                  }
                  ]
              })
            },
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: 'Kalian sedang mencari rest api yang aktif?\nSilakan gunakan link di bawah ini'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`Rest Api Free`',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/zhasgs.jpeg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Rest Api Web","url":"https://restapiikyjs.vercel.app/","merchant_url":"https://google.com"}`
                  }
                  ]
              })
            }
          ]
        })
      })
    }
  }
}, { userJid: m.chat, quoted: fkontak })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
break
case "runtime": {
let lowq = `*${global.namabot} Telah Online Selama:*\n${runtime(process.uptime(),)}*`;
reply(`${lowq}`);
}
break
case 'ping': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });

    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let neww = performance.now();
    let oldd = performance.now();

    let respon = `
*㆔ Response Speed:* ${latensi.toFixed(4)} _Second_  
ㆳ ${(oldd - neww).toFixed(2)} _Milliseconds_  
ㆳ *Runtime:* ${runtime(process.uptime())}

┌───────────────── •
│ *Info Server ㇀*  
│ *RAM:* ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
└───────────────── •

ㇴ *NodeJS Memory Usage*  
${Object.keys(used)
    .map((key, _, arr) => `> ${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`)
    .join('\n')}

${cpus[0] ? `ㆫ *Total CPU Usage*  
\`${cpus[0].model.trim()} (${cpu.speed} MHz)\`
${Object.keys(cpu.times)
    .map(type => `> *${(type + '*').padEnd(6)} : ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`)
    .join('\n')}

ㇴ *CPU Core(s) Usage (${cpus.length} Core CPU)*  
${cpus
    .map(
        (cpu, i) => `> [ ${i + 1} ] ${cpu.model.trim()} (${cpu.speed} MHz)  
${Object.keys(cpu.times)
    .map(type => `- *${(type + '*').padEnd(6)} : ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`)
    .join('\n')}`
    )
    .join('\n\n')}` : ''}
`;

    reply(respon);
}
break

case "h":
case "hidetag": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isCreator) return reply(mess.admin)
if (m.quoted) {
conn.sendMessage(m.chat, {
forward: m.quoted.fakeObj,
mentions: participants.map(a => a.id)
})
}
if (!m.quoted) {
conn.sendMessage(m.chat, {
text: q ? q : '',
mentions: participants.map(a => a.id)
}, { quoted: fkontak })
}
}
break

case 'kick': case 'dor': {
if (!isGroup) return reply(mess.group)
if (!isCreator && !isAdmins) return reply(mess.admin)
if (text || m.quoted) {
const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
var onWa = await conn.onWhatsApp(input.split("@")[0])
if (onWa.length < 1) return reply("Nomor tidak terdaftar di whatsapp")
const res = await conn.groupParticipantsUpdate(m.chat, [input], 'remove')
await reply(`Berhasil mengeluarkan ${input.split("@")[0]} dari grup ini`)
} else {
return reply("@tag/reply orangnya yang mau di kick")
}
}
break

// ─────「 BATAS CASE - SET EVAL 」───── \\
default:
if (budy.startsWith('=>')) {
if (!isCreator) return

function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await reply(evaled);
} catch (err) {
reply(String(err));
}
}

if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) return reply(stdout)
})
}

}
} catch (err) {
console.log(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})