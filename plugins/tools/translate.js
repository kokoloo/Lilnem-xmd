
import { translate } from '@vitalets/google-translate-api'

var handler = async (m, { args, usedPrefix, command }) => {
	let lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'en', text = args.slice(1).join(' ')
	} else if (m.quoted && m.quoted.text) {
		lang = args[0] ? args[0] : 'en', text = m.quoted.text
	} else throw `Example: ${usedPrefix + command} en hello i am robot`
	let res = await translate(text, { to: lang }).catch(_ => null)
	if (!res) throw `Error: Language "${lang}" is not supported`
	m.reply(`*Detected Language:* ${res.raw.src}\n*To Language:* ${lang}\n\n*Original Text:* ${res.raw.sentences[0].orig}\n*Translation:* ${res.raw.sentences[0].trans}`.trim())
}

handler.help = ['translate'].map(v => v + ' <language> <text>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

handler.register = true

export default handler
