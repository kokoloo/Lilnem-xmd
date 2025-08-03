
import { youtube } from '../../lib/youtube.js'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <search query>\n\nExample: ${usedPrefix + command} Imagine Dragons Thunder`

    try {
        m.reply('🔍 Searching...')

        const results = await youtube.search(args.join(' '))
        if (!results || !results.video || results.video.length === 0) throw 'No results found!'

        const video = results.video[0]
        const info = await youtube.getInfo(video.url)

        const caption = `*🎵 YouTube Music Player*\n\n` +
                       `📱 *Title:* ${info.title}\n` +
                       `👤 *Channel:* ${info.author.name}\n` +
                       `⏱️ *Duration:* ${info.lengthSeconds} seconds\n` +
                       `👁️ *Views:* ${info.viewCount}\n` +
                       `📅 *Upload Date:* ${info.uploadDate}\n\n` +
                       `🔗 *URL:* ${info.video_url}`

        await conn.sendFile(m.chat, info.thumbnail, 'thumbnail.jpg', caption, m)

        m.reply('⬇️ Downloading audio...')
        const downloadData = await youtube.download(video.url)
        
        if (downloadData && downloadData.resultUrl && downloadData.resultUrl.audio && downloadData.resultUrl.audio[0]) {
            const audioUrl = await downloadData.resultUrl.audio[0].download()
            await conn.sendFile(m.chat, audioUrl, `${info.title}.mp3`, '', m, false, {
                mimetype: 'audio/mpeg'
            })
        } else {
            throw 'Failed to get download link'
        }

    } catch (error) {
        console.error('YouTube Play Error:', error)
        throw 'An error occurred while processing your request. Please try again.'
    }
}

handler.help = ['play <query>']
handler.tags = ['downloader']
handler.command = /^play$/i
handler.register = true

export default handler
