
import { performance } from 'perf_hooks'

var handler = async (m, { conn }) => {
    const start = performance.now()
    
    const message = await conn.sendMessage(m.chat, { text: '🏓 Pinging...' }, { quoted: m })
    
    const end = performance.now()
    const responseTime = Math.round(end - start)
    
    await conn.sendMessage(m.chat, {
        text: `🏓 *Pong!*\n⚡ *Response Time:* ${responseTime}ms`,
        edit: message.key
    })
}

handler.help = ['ping']
handler.tags = ['example']
handler.command = /^ping$/i
handler.register = true

export default handler
