
import { toPTT } from '../../lib/converter.js'

var handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!/audio/.test(mime)) throw `Send/reply to an audio file with ${usedPrefix + command}`
    
    try {
        m.reply('🔄 Converting to voice note...')
        let media = await q.download()
        let audio = await toPTT(media, 'mp4')
        
        conn.sendFile(m.chat, audio, 'voice.opus', '', m, true, {
            mimetype: 'audio/ogg; codecs=opus'
        })
    } catch (error) {
        console.error('To PTT Error:', error)
        throw 'Failed to convert audio to voice note. Please try again.'
    }
}

handler.help = ['toptt (reply audio)']
handler.tags = ['converter']
handler.command = /^to(ptt|vn)$/i

export default handler
