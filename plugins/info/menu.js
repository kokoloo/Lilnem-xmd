
/**
 * none-jiaku-maria Bot Menu Plugin
 * Created by jiaku-maria
 */
import "../../settings/config.js"

const usedPrefix = global.prefix
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { runtime, formatDate } from '../../lib/myfunction.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const handler = async (m, { conn, usedPrefix, args }) => {
    try {
        const category = args[0]?.toLowerCase()
        
        // Get plugins directory
        const pluginsDir = join(__dirname, '../')

        // Function to scan plugins recursively
        const scanPlugins = (dir, category = '') => {
            const plugins = {}
            const items = readdirSync(dir, { withFileTypes: true })

            for (const item of items) {
                if (item.isDirectory() && !['lib', 'node_modules'].includes(item.name)) {
                    const subDir = join(dir, item.name)
                    const subPlugins = scanPlugins(subDir, item.name)
                    Object.assign(plugins, subPlugins)
                } else if (item.isFile() && item.name.endsWith('.js') && 
                          !['template.js', 'myfunction.js', 'uploadImage.js'].includes(item.name)) {
                    const cat = category || 'main'
                    if (!plugins[cat]) plugins[cat] = []

                    // Extract command from filename
                    const command = item.name.replace('.js', '')
                    plugins[cat].push(command)
                }
            }

            return plugins
        }

        // Scan all plugins
        const allPlugins = scanPlugins(pluginsDir)

        // Bot info
        const botName = 'none-jiaku-maria'
        const ownerName = 'jiaku-maria'
        const uptime = runtime(process.uptime())
        const totalCommands = Object.values(allPlugins).reduce((acc, cmds) => acc + cmds.length, 0)

        if (category && allPlugins[category]) {
            // Show specific category
            const commands = allPlugins[category]
            let categoryMenu = `╭─❋ *${category.toUpperCase()} COMMANDS* ❋\n`
            categoryMenu += `│ 📦 Category: ${category}\n`
            categoryMenu += `│ 📊 Commands: ${commands.length}\n`
            categoryMenu += `├──────────────────────\n`
            
            commands.forEach((cmd, index) => {
                categoryMenu += `│ ${index + 1}. ${usedPrefix}${cmd}\n`
            })
            
            categoryMenu += `╰──────────────────────\n\n`
            categoryMenu += `💡 Use ${usedPrefix}menu to see all categories`
            
            return conn.sendMessage(m.chat, { text: categoryMenu }, { quoted: m })
        }

        // Main menu
        let menuText = `╭─❋ *${botName.toUpperCase()} BOT* ❋\n`
        menuText += `│ 🤖 Bot: ${botName}\n`
        menuText += `│ 👤 Owner: ${ownerName}\n`
        menuText += `│ ⏰ Uptime: ${uptime}\n`
        menuText += `│ 📊 Commands: ${totalCommands}\n`
        menuText += `│ 📅 Date: ${formatDate(new Date())}\n`
        menuText += `╰────────────────────\n\n`

        menuText += `╭─❋ *CATEGORIES* ❋\n`
        
        const categories = Object.keys(allPlugins).sort()
        categories.forEach((cat, index) => {
            const count = allPlugins[cat].length
            const emoji = getCategoryEmoji(cat)
            menuText += `│ ${emoji} ${cat} (${count})\n`
        })
        
        menuText += `╰────────────────────\n\n`
        menuText += `💡 *Usage:*\n`
        menuText += `• ${usedPrefix}menu <category> - View category commands\n`
        menuText += `• ${usedPrefix}help <command> - Get command help\n\n`
        menuText += `🔗 *Examples:*\n`
        menuText += `• ${usedPrefix}menu sticker\n`
        menuText += `• ${usedPrefix}menu downloader\n`
        menuText += `• ${usedPrefix}help play\n\n`
        menuText += `⚡ Made with ❤️ by ${ownerName}`

        await conn.sendMessage(m.chat, { text: menuText }, { quoted: m })

    } catch (error) {
        console.error('Menu error:', error)
        const errorMsg = `❌ *Menu Error*\n\nSorry, there was an error loading the menu. Please try again later.\n\nError: ${error.message}`
        await conn.sendMessage(m.chat, { text: errorMsg }, { quoted: m })
    }
}

function getCategoryEmoji(category) {
    const emojis = {
        'ai': '🤖',
        'anime': '🎌',
        'converter': '🔄',
        'downloader': '⬇️',
        'example': '📝',
        'group': '👥',
        'info': 'ℹ️',
        'main': '🏠',
        'owner': '👑',
        'rpg': '⚔️',
        'sticker': '🎭',
        'tools': '🛠️',
        'audio': '🎵'
    }
    return emojis[category] || '📁'
}

handler.help = ['menu', 'help']
handler.tags = ['info']
handler.command = /^(menu|help|\?)$/i
handler.register = true

export default handler
