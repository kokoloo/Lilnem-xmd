const handler = async (m, { conn, args, text }) => {
  try {
    const db = (await import('../../lib/database/database.js')).default;
    
    // Initialize settings if not exists
    if (!db.data.settings[conn.user.jid]) {
      db.data.settings[conn.user.jid] = {
        broadcastReply: false,
        broadcastReplyMessage: 'Automatic bot message',
        autoReadBroadcast: false,
        fakeTyping: false,
        fakeRecording: false
      };
    }
    
    const setting = db.data.settings[conn.user