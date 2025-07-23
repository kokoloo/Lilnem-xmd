const handler = async (m, { conn, args }) => {
  try {
    if (!global.db) global.db = { data: { settings: {} } };
    if (!global.db.data.settings[conn.user.jid]) {
      global.db.data.settings[conn.user.jid] = {};
    }

    const setting = global.db.data.settings[conn.user.jid];
    
    if (args[0] === 'on' || args[0] === 'enable') {
      setting.autoReadStatus = true;
      await m.reply('✅ *Auto-read status activated*\nThe bot will automatically read all WhatsApp statuses.');
    } else if (args[0] === 'off' || args[0] === 'disable') {
      setting.autoReadStatus = false;
      await m.reply('❌ *Auto-read status deactivated*\nThe bot will no longer automatically read statuses.');
    } else {
      const status = setting.autoReadStatus ?