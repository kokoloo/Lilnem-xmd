
import { youtube } from '../../lib/youtube.js'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <YouTube URL>\n\nExample: ${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`

    if (!args[0].match(/youtu\.be|youtube\.com/)) throw 'Please provide a valid YouTube URL!'

    try {
        m.reply('⬇️ Downloading audio...')

        const info = await youtube.getInfo(args[0])
        const downloadData = await youtube.download(args[0])

        if (downloadData && downloadData.resultUrl && downloadData.resultUrl.audio && downloadData.resultUrl.audio[0]) {
            const audioUrl = await downloadData.resultUrl.audio[0].download()
            
            const caption = `*🎵 YouTube Audio Downloader*\n\n` +
                           `📱 *Title:* ${info.title}\n` +
                           `👤 *Channel:* ${info.author.name}\n` +
                           `⏱️ *Duration:* ${info.lengthSeconds} seconds`

            await conn.sendFile(m.chat, audioUrl, `${info.title}.mp3`, caption, m, false, {
                mimetype: 'audio/mpeg'
            })
        } else {
            throw 'Failed to get download link'
        }

    } catch (error) {
        console.error('YouTube MP3 Error:', error)
        throw 'An error occurred while downloading the audio. Please try again.'
    }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = /^(ytmp3|yta)$/i
handler.register = true

export default handler
