import { spawn } from 'child_process'
import { join } from 'path'
import { fileTypeFromBuffer } from 'file-type'

var handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `Reply to an animated sticker with ${usedPrefix + command}`
    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Reply to an animated sticker with ${usedPrefix + command}`
    if (!/webp/.test(mime)) throw `Reply to an animated sticker with ${usedPrefix + command}`
    let media = await q.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        const filename = join(global.__dirname(import.meta.url), '../tmp/' + (new Date * 1) + '.webp')
        const fs = await import('fs')
        await fs.promises.writeFile(filename, media)
        spawn('dwebp', [filename, '-o', filename + '.png'])
            .on('error', reject)
            .on('exit', () => {
                fs.promises.readFile(filename + '.png')
                    .then(resolve)
                    .finally(() => {
                        fs.promises.unlink(filename)
                        fs.promises.unlink(filename + '.png')
                    })
            })
    }

    await conn.sendFile(m.chat, out, 'image.png', null, m)
}

handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = /^toimg$/i

export default handler