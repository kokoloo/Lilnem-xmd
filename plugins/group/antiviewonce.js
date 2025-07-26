import baileys from "@whiskeysockets/baileys"
const { downloadContentFromMessage } = baileys

const handler = async (m, { conn, args, isAdmin, isBotAdmin }) => {
  if (args.length > 0) {
    if (!isAdmin) return m.reply('❌ This command is reserved for group admins!');
    
    const db = (await import('../../lib/database/database.js')).default;
    const group = db.getGroup(m.chat);
    
    if (args[0] === 'on' || args[0] === 'enable') {
      group.settings.antiviewonce = true;
      db.updateGroup(m.chat, group);
      await m.reply('✅ *Anti-viewonce activated*\nMessages set to view once will be automatically saved.');
    } else if (args[0