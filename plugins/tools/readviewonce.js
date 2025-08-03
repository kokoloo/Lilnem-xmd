var handler = async (m) => {
    if (!m.quoted) throw 'Reply to a view once message!'
    if (m.quoted.mtype !== 'viewOnceMessageV2') throw 'This is not a view once message'
    let msg = m.quoted.message
    let type = Object.keys(msg)[0]
    let media = await m.quoted.download()
    let caption = msg[type].caption || ''
    if (/video/.test(type)) {
        return m.reply({ video: media, caption: caption })
    } else if (/image/.test(type)) {
        return m.reply({ image: media, caption: caption })
    }
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^readviewonce|rvo$/i

export default handler