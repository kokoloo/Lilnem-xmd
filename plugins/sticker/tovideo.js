import { ffmpeg } from '../../lib/converter.js'

var handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `Reply to a sticker with ${usedPrefix + command}`
    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''
    if (!/webp/.test(mime)) throw `Reply to a sticker with ${usedPrefix + command}`
    let media = await q.download()
    let out = await ffmpeg(media, 'mp4', 'mp4')
    await conn.sendFile(m.chat, out, 'sticker.mp4', '', m)
}

handler.help = ['tovideo (reply)']
handler.tags = ['sticker']
handler.command = /^tovideo$/i

export default handler