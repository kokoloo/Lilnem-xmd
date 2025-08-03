import fetch from 'node-fetch'
import { uploadPomf } from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Send/Reply image with caption .waifu2x'
        m.reply('Processing image...')
        let media = await q.download()
        let url = await uploadPomf(media)

        // Send request to waifu2x API and get buffer
        let response = await fetch(`${APIs.ryzen}/api/ai/waifu2x?url=${url}`)
        if (!response.ok) throw new Error('Failed to connect to waifu2x API')

        let result = await response.buffer()

        // Send buffer file directly to chat
        await conn.sendFile(m.chat, result, 'result.jpg', global.wm, m)
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.help = ['waifu2x']
handler.tags = ['anime', 'ai']
handler.command = /^(waifu2x)$/i

handler.register = true
handler.limit = 15

export default handler