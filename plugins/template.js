/**
 * Template Plugin for none-jiaku-maria Bot
 * Created by jiaku-maria
 * 
 * This is a template for creating new plugins.
 * Copy this file and modify it to create your own plugin.
 */

// Example plugin handler
const handler = async (m, { conn, text, usedPrefix, command }) => {
    // Your plugin logic here
    const response = `✅ Template plugin executed!\n\n` +
                    `Command: ${command}\n` +
                    `Text: ${text || 'No text provided'}\n` +
                    `User: @${m.sender.split('@')[0]}`

    m.reply(response, null, { mentions: [m.sender] })
}

// Plugin metadata
handler.help = ['template']
handler.tags = ['example']
handler.command = /^template$/i
handler.register = true

// Export the handler
export default handler