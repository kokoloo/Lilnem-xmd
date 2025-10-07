const fs = require('fs')
const chalk = require('chalk')

// ──「 Set Pairing 」── \\ // EN: Pairing configuration | FR: Configuration d'appairage
global.pairingbot = '' // EN: pairing number | FR: numéro d'appairage
global.custompairing = 'HISOKAMD' // EN: 8 characters no spaces | FR: 8 caractères sans espaces

// ──「 Set Owner 」── \\ // EN: Owner settings | FR: Paramètres du propriétaire
global.ownernumber = "2250101676111"
global.ownername = "hisoka"
global.fother = "Lil-Maria v1 by hisoka"

// ──「 Set Bot 」── \\ // EN: Bot configuration | FR: Configuration du bot
global.namabot = "𝓛𝓲𝓵‑𝓜𝓪𝓻𝓲𝓪 𝓿1"
global.botNumber = "6282185483182"
global.version = "1.0"
global.packname = "Lil‑Maria v1"
global.author = "hisoka‑raven"
global.coauthor = "lilnem"
global.foother = "Powered by hisoka‑raven"
global.namach = "© Information Lil‑Maria v1"
global.idch = "1203633401130891@newsletter"

// ──「 Set Media 」── \\ // EN: Media settings | FR: Paramètres média
global.website = "https://github.com/hhhisoka"
global.thumbnail = ""

// ──「 Set Message 」── \\ // EN: Warning messages | FR: Messages d'avertissement
global.mess = {
 admin: "*[ Warning! ]* group admins only",
 botAdmin: "*[ Warning! ]* the bot must be an admin",
 owner: "*[ Warning! ]* owner-only command",
 creator: "*[ Warning! ]* owner-only command",
 group: "*[ Warning! ]* group-only command",
 private: "*[ Warning! ]* use this feature in a private chat",
 premium: "*[ Warning! ]* premium users only"
}



// *** message *** // EN: Message timing | FR: Timing des messages
global.closeMsgInterval = 30; // EN: 30 minutes. max 60 min, min 1 min | FR: 30 minutes. max 60 min, min 1 min
global.backMsgInterval = 2; // EN: 2 hours. max 24 hours, min 1 hour | FR: 2 heures. max 24h, min 1h