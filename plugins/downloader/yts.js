
import { youtube } from '../../lib/youtube.js'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <search query>\n\nExample: ${usedPrefix + command} Alan Walker Faded`
    
    try {
        m.reply('🔍 Searching YouTube...')
        
        const results = await youtube.search(args.join(' '))
        if (!results || !results.video || results.video.length === 0) throw 'No results found!'
        
        let text = '*🔍 YouTube Search Results*\n\n'
        
        for (let i = 0; i < Math.min(results.video.length, 10); i++) {
            const video = results.video[i]
            text += `*${i + 1}.* ${video.title}\n`
            text += `👤 *Channel:* ${video.authorName || 'Unknown'}\n`
            text += `⏱️ *Duration:* ${video.duration || 'Unknown'}\n`
            text += `👁️ *Views:* ${video.view || 'Unknown'}\n`
            text += `🔗 *URL:* ${video.url}\n\n`
        }
        
        text += `💡 *Tip:* Use .play <number> to play a specific result\n`
        text += `💡 *Or use:* .ytmp3 <url> or .ytmp4 <url> to download`
        
        await conn.sendFile(m.chat, results.video[0].thumbnail, 'thumbnail.jpg', text, m)
        
    } catch (error) {
        console.error('YouTube Search Error:', error)
        throw 'An error occurred while searching YouTube. Please try again.'
    }
}

handler.help = ['yts <query>']
handler.tags = ['downloader']
handler.command = /^yts(earch)?$/i
handler.register = true

export default handler
