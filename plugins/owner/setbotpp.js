
var handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime || !/image/.test(mime)) throw `Send/reply to an image with ${usedPrefix + command}`
    
    try {
        let img = await q.download()
        await conn.updateProfilePicture(conn.user.jid, img)
        m.reply('✅ Successfully updated bot profile picture!')
    } catch (error) {
        console.error('Set Bot PP Error:', error)
        throw 'Failed to update profile picture. Please try again.'
    }
}

handler.help = ['setbotpp (reply image)']
handler.tags = ['owner']
handler.command = /^setbotpp$/i
handler.owner = true

export default handler
