const handler = async (m, { conn, args, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return m.reply("❌ This command only works in groups!")
  if (!isAdmin) return m.reply("❌ Only administrators can modify the settings!")

  const db = (await import('../../lib/database/database.js')).default
  const group = db.getGroup(m.chat)

  if (!args[0]) {
    // Display current settings
    const settings = group.settings
    const status = (value) => value ? "✅ Enabled" : "❌ Disabled"
    
    const message = `
🔧 *GROUP SETTINGS*

📝 *Features:*
• Welcome: ${status(settings.welcome)}
• Antilink: ${status(settings.antilink)}
• Anti-ViewOnce: ${status(settings.antiviewonce)}
• Anti-Spam: ${status(settings.antisp