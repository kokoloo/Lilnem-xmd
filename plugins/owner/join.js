
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage: ${usedPrefix + command} <group invite link>\n\nExample: ${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxxx`
    
    let [_, code] = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i) || []
    if (!code) throw 'Invalid WhatsApp group link!'
    
    try {
        let res = await conn.groupAcceptInvite(code)
        m.reply(`✅ Successfully joined the group!`)
    } catch (error) {
        console.error('Join Group Error:', error)
        if (error.output?.statusCode === 409) throw 'Bot is already in this group!'
        if (error.output?.statusCode === 401) throw 'Invalid or expired group link!'
        throw 'Failed to join group. Please check the link and try again.'
    }
}

handler.help = ['join <group_link>']
handler.tags = ['owner']
handler.command = /^join$/i
handler.owner = true

export default handler
