
var handler = async (m, { conn, usedPrefix, command }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!users) throw `Tag or reply to someone you want to demote!\n\nExample: ${usedPrefix + command} @user`
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
        m.reply(`✅ Successfully demoted @${users.split('@')[0]} from admin!`, null, {
            mentions: [users]
        })
    } catch (error) {
        console.error('Demote Error:', error)
        throw 'Failed to demote user. Make sure the bot is an admin and the user is a group admin.'
    }
}

handler.help = ['demote @user']
handler.tags = ['group']
handler.command = /^demote$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
