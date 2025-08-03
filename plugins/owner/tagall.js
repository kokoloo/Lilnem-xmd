
var handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => u.id)
    let txt = text ? `*Message:* ${text}\n\n` : '*Tagged Everyone*\n\n'
    
    for (let user of users) {
        txt += `@${user.split('@')[0]}\n`
    }
    
    conn.sendMessage(m.chat, {
        text: txt,
        mentions: users
    }, { quoted: m })
}

handler.help = ['tagall <message>']
handler.tags = ['owner', 'group']
handler.command = /^(tagall|all)$/i
handler.admin = false
handler.group = true

export default handler
