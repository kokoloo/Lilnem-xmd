
var handler = async (m, { conn, usedPrefix, command }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!users) throw `Tag or reply to someone you want to kick!\n\nExample: ${usedPrefix + command} @user`
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [users], 'remove')
        m.reply(`✅ Successfully kicked @${users.split('@')[0]} from the group!`, null, {
            mentions: [users]
        })
    } catch (error) {
        console.error('Kick Error:', error)
        throw 'Failed to kick user. Make sure the bot is an admin and the user is a group member.'
    }
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^kick$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
