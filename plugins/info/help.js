import "../../settings/config.js"

const usedPrefix = global.prefix
let handler = async (m, { conn, text, usedPrefix }) => {
    try {
        if (!text) {
            return m.reply(`Please specify a command name.\n\nExample: ${usedPrefix}help ping`)
        }

        const plugins = global.plugins || {}
        let foundPlugin = null
        let commandName = text.toLowerCase()

        // Search for the command in plugins
        Object.keys(plugins).forEach(file => {
            const plugin = plugins[file]
            if (!plugin || !plugin.help) return
            
            if (plugin.help.includes(commandName)) {
                foundPlugin = plugin
                return
            }
        })

        if (!foundPlugin) {
            return m.reply(`Command "${commandName}" not found.\n\nUse ${usedPrefix}menu to see all available commands.`)
        }

        // Build detailed help
        let helpText = `╭─❋ *🔍 COMMAND DETAILS* ❋
│ 📝 *Command:* ${commandName}
│ 🏷️ *Category:* ${foundPlugin.tags ? foundPlugin.tags[0] : 'uncategorized'}
│ 📋 *Description:* ${foundPlugin.description || 'No description available'}
│ 🔖 *Usage:* ${usedPrefix}${commandName}${foundPlugin.usage ? ' ' + foundPlugin.usage : ''}
╰────────────────────

`

        // Add restrictions if any
        const restrictions = []
        if (foundPlugin.owner) restrictions.push('👑 Owner only')
        if (foundPlugin.premium) restrictions.push('💎 Premium only')
        if (foundPlugin.group) restrictions.push('👥 Group only')
        if (foundPlugin.admin) restrictions.push('🛡️ Admin only')
        if (foundPlugin.botAdmin) restrictions.push('🤖 Bot must be admin')
        if (foundPlugin.limit) restrictions.push(`⚡ Limited usage (${foundPlugin.limit} times)`)

        if (restrictions.length > 0) {
            helpText += `╭─❋ *⚠️ RESTRICTIONS* ❋
`
            restrictions.forEach(restriction => {
                helpText += `│ ${restriction}\n`
            })
            helpText += `╰────────────────────────

`
        }

        // Add aliases if any
        if (foundPlugin.help && foundPlugin.help.length > 1) {
            helpText += `╭─❋ *🔄 ALIASES* ❋
`
            foundPlugin.help.forEach(alias => {
                helpText += `│ • ${usedPrefix}${alias}\n`
            })
            helpText += `╰────────────────────────

`
        }

        helpText += `*Need more help? Contact the owner!*`

        await conn.sendMessage(m.chat, { text: helpText }, { quoted: m })

    } catch (error) {
        console.error('Help error:', error)
        m.reply(`Error getting help: ${error.message}`)
    }
}

handler.help = ['help']
handler.tags = ['info']
handler.command = /^(help)$/i
handler.register = true

export default handler
