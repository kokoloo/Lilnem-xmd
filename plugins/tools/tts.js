import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    let lang = 'en'
    let text = args.slice(1).join(' ')

    if (args[0] && args[0].length === 2) {
        lang = args[0]
        text = args.slice(1).join(' ')
    } else {
        text = args.join(' ')
    }

    if (!text && !m.quoted?.text) throw `Usage: ${usedPrefix + command} <language> <text>\n\nExample: ${usedPrefix + command} en Hello World`

    text = text || m.quoted.text

    const tts = gtts(lang)
    const filePath = join(global.__dirname(import.meta.url), '../tmp/' + (1 * new Date) + '.wav')

    tts.save(filePath, text, function() {
        conn.sendFile(m.chat, readFileSync(filePath), 'tts.opus', null, m, true)
        unlinkSync(filePath)
    })
}

handler.help = ['tts <language> <text>']
handler.tags = ['tools']
handler.command = /^tts$/i
handler.register = true

export default handler