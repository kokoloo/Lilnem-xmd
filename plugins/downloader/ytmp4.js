
import { youtube } from '../../lib/youtube.js'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <YouTube URL>\n\nExample: ${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`

    if (!args[0].match(/youtu\.be|youtube\.com/)) throw 'Please provide a valid YouTube URL!'

    try {
        m.reply('⬇️ Downloading video...')

        const info = await youtube.getInfo(args[0])
        const downloadData = await youtube.download(args[0])

        if (downloadData && downloadData.resultUrl && downloadData.resultUrl.video && downloadData.resultUrl.video[0]) {
            const videoUrl = await downloadData.resultUrl.video[0].download()
            
            const caption = `*🎬 YouTube Video Downloader*\n\n` +
                           `📱 *Title:* ${info.title}\n` +
                           `👤 *Channel:* ${info.author.name}\n` +
                           `⏱️ *Duration:* ${info.lengthSeconds} seconds`

            await conn.sendFile(m.chat, videoUrl, `${info.title}.mp4`, caption, m, false, {
                mimetype: 'video/mp4'
            })
        } else {
            throw 'Failed to get download link'
        }

    } catch (error) {
        console.error('YouTube MP4 Error:', error)
        throw 'An error occurred while downloading the video. Please try again.'
    }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^(ytmp4|ytv)$/i
handler.register = true

export default handler
