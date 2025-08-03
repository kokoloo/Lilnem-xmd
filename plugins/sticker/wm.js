
import { addExif } from '../../lib/sticker.js'

var handler = async (m, { conn, text }) => {
    if (!m.quoted) throw 'Reply to a sticker!'
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw 'Reply to a sticker!'
        let img = await m.quoted.download()
        if (!img) throw 'Failed to download sticker!'
        stiker = await addExif(img, packname || global.sticker.packname, author || global.sticker.author)
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        else throw 'Conversion failed'
    }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^wm$/i

export default handler
