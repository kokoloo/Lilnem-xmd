
var handler = async (m, { conn }) => {
    if (!m.isGroup) throw 'This command can only be used in groups!'
    
    try {
        await m.reply('👋 Goodbye! The bot is leaving this group.')
        await conn.groupLeave(m.chat)
    } catch (error) {
        console.error('Leave Group Error:', error)
        throw 'Failed to leave group. Please try again.'
    }
}

handler.help = ['leavegc']
handler.tags = ['owner']
handler.command = /^leavegc$/i
handler.owner = true
handler.group = true

export default handler
