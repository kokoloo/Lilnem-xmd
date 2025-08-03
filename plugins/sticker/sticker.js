import { sticker, addExif } from '../../lib/sticker.js'
import { ryzenCDN } from '../../lib/uploadFile.js'
import { Sticker } from 'wa-sticker-formatter'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''

        if (/webp/.test(mime)) throw `Reply to image/video/gif with command ${usedPrefix + command}`
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) throw 'Failed to download image'
            stiker = await sticker(img, false, global.sticker.packname, global.sticker.author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) throw 'Maximum video duration is 10 seconds!'
            let img = await q.download()
            if (!img) throw 'Failed to download video'
            stiker = await sticker(img, false, global.sticker.packname, global.sticker.author)
        } else {
            throw `Send/reply to image/video/gif with command ${usedPrefix + command}\nVideo duration: 1-9 seconds`
        }
    } catch (e) {
        console.error(e)
        if (!stiker) stiker = e
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        else throw 'Conversion failed'
    }
}

handler.help = ['sticker (caption|reply media)', 'sticker <url>', 's (caption|reply media)', 's <url>']
handler.tags = ['sticker']
handler.command = /^s(tick?er)?(gif)?$/i

export default handler

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: global.stickpack,
        author: global.stickauth,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}