const handler = async (m, { conn, args }) => {
  try {
    const db = (await import('../../lib/database/database.js')).default;
    
    // Initialize settings if not exists
    if (!db.data.settings[conn.user.jid]) {
      db.data.settings[conn.user.jid] = {
        autoReadBroadcast: false,
        broadcastReply: false,
        broadcastReplyMessage: 'Automatic message from the bot',
        fakeTyping: false,
        fakeRecording: false
      };
    }
    
    const setting = db.data.settings