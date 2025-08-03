
var handler = async (m, { conn, usedPrefix, command }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!users) throw `Tag or reply to someone you want to promote!\n\nExample: ${usedPrefix + command} @user`
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
        m.reply(`✅ Successfully promoted @${users.split('@')[0]} to admin!`, null, {
            mentions: [users]
        })
    } catch (error) {
        console.error('Promote Error:', error)
        throw 'Failed to promote user. Make sure the bot is an admin and the user is a group member.'
    }
}

handler.help = ['promote @user']
handler.tags = ['group']
handler.command = /^promote$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
