import "../../settings/config.js"

const usedPrefix = global.prefix
let handler = async (m, { conn, text, usedPrefix }) => {
    try {
        const plugins = global.plugins || {}
        const commands = {}
        
        // Organize commands by category
        Object.keys(plugins).forEach(file => {
            const plugin = plugins[file]
            if (!plugin || !plugin.help) return
            
            const category = plugin.tags && plugin.tags[0] ? plugin.tags[0] : 'uncategorized'
            if (!commands[category]) commands[category] = []
            
            plugin.help.forEach(help => {
                commands[category].push({
                    name: help,
                    owner: plugin.owner || false,
                    premium: plugin.premium || false,
                    limit: plugin.limit || false
                })
            })
        })

        if (!text) {
            // Show available categories
            let categoryText = `╭─❋ *📂 AVAILABLE CATEGORIES* ❋
`
            Object.keys(commands).sort().forEach(category => {
                const count = commands[category].length
                categoryText += `│ • ${category} (${count} commands)\n`
            })
            categoryText += `╰──────────────────────

Use ${usedPrefix}list <category> to see commands in that category.

Example: ${usedPrefix}list sticker`

            return m.reply(categoryText)
        }

        const category = text.toLowerCase()
        if (!commands[category]) {
            return m.reply(`Category "${category}" not found.\n\nUse ${usedPrefix}list to see available categories.`)
        }

        // Show commands in the specified category
        let listText = `╭─❋ *📋 ${category.toUpperCase()} COMMANDS* ❋
`
        
        commands[category].forEach(cmd => {
            let cmdLine = `│ • ${usedPrefix}${cmd.name}`
            
            const indicators = []
            if (cmd.premium) indicators.push('💎')
            if (cmd.owner) indicators.push('👑')
            if (cmd.limit) indicators.push(`⚡${cmd.limit}`)
            
            if (indicators.length > 0) {
                cmdLine += ` ${indicators.join(' ')}`
            }
            
            listText += cmdLine + '\n'
        })
        
        listText += `╰────────────────────────

Total: ${commands[category].length} commands
Use ${usedPrefix}help <command> for detailed information`

        await conn.sendMessage(m.chat, { text: listText }, { quoted: m })

    } catch (error) {
        console.error('List error:', error)
        m.reply(`Error listing commands: ${error.message}`)
    }
}

handler.help = ['list', 'category']
handler.tags = ['info']
handler.command = /^(list|category)$/i
handler.register = true

export default handler
