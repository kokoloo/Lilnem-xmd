
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage: ${usedPrefix + command} <bio text>\n\nExample: ${usedPrefix + command} I am a WhatsApp Bot`
    
    try {
        await conn.updateProfileStatus(text)
        m.reply(`✅ Successfully updated bot bio to:\n"${text}"`)
    } catch (error) {
        console.error('Set Bio Error:', error)
        throw 'Failed to update bio. Please try again.'
    }
}

handler.help = ['setbio <text>']
handler.tags = ['owner']
handler.command = /^setbio$/i
handler.owner = true

export default handler
