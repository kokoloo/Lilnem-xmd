import { delay } from '../../lib/myfunction.js'

var handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Usage: ${usedPrefix + command} <number>|<text>|<amount>`
	let [nomor, pesan, jumlah] = text.split('|')
	if (!nomor || !pesan || !jumlah) throw `Usage: ${usedPrefix + command} <number>|<text>|<amount>`
	if (isNaN(nomor)) throw 'Number must be numeric!'
	if (isNaN(jumlah)) throw 'Amount must be numeric!'
	if (jumlah > 50) throw 'Maximum amount is 50!'

	m.reply(`Sending ${jumlah} messages to ${nomor}...`)

	for (let i = 0; i < jumlah; i++) {
		await delay(1000) // 1 second delay
		await conn.sendMessage(nomor + '@s.whatsapp.net', { text: pesan })
	}

	m.reply(`Successfully sent ${jumlah} messages to ${nomor}`)
}

handler.help = ['spamwa <number>|<text>|<amount>']
handler.tags = ['tools']
handler.command = /^spamwa$/i
handler.owner = true

export default handler