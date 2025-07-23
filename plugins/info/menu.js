import { getCommands } from '../../lib/utils/pluginLoader.js';

const handler = async (m, { conn, prefix, pushname }) => {
  try {
    const commands = getCommands();
    
    if (!commands || Object.keys(commands).length === 0) {
      return m.reply("*No commands available at the moment*");
    }

    // Organize commands by category
    const categories = {};
    
    Object.keys(commands).forEach(cmd => {
      const command = commands[cmd];
      const category = command.category || 'Others';
      
      if (!categories[category]) {
        categories[category] = [];
      }
      
      // Avoid duplicates (aliases)
      if (!command.isAlias) {
        categories[category].push({
          name: cmd,
          help: command.metadata?.help || [cmd],
          description: command.metadata?.description || 'No description',
          owner: command.metadata?.owner || false,
          premium: command.metadata?.premium || false,
          group: command.metadata?.group || false,
          admin: command.metadata?.admin || false
        });
      }
    });

    // Build the menu message
    let menuText = `╭─❍「 *${global.botName || 'LILNEM-XMD'}* 」❍\n`;
    menuText += `├❍ *User:* ${pushname}\n`;
    menuText += `├❍ *Prefix:* ${prefix}\n`;
    menuText += `├❍ *Total commands:* ${Object.keys(commands).length}\n`;
    menuText += `├❍ *Version:* ${global.botVersion || '1.0.0'}\n`;
    menuText += `╰─❍\n\n`;

    // Add categories
    const categoryEmojis = {
      'info': '📊',
      'tools': '🛠️',
      'downloader': '⬇️',
      'converter': '🔄',
      'search': '🔍',
      'sticker': '🎭',
      'group': '👥',
      'owner': '👑',
      'rpg': '⚔️',
      'example': '💡'
    };

    Object.keys(categories).sort().forEach(category => {
      const emoji = categoryEmojis[category.toLowerCase()] || '📂';
      menuText += `╭─❍「 ${emoji} *${category.toUpperCase()}* 」\n`;
      
      categories[category].forEach(cmd => {
        let cmdText = `├❍ ${prefix}${cmd.name}`;
        
        // Add indicators
        if (cmd.owner) cmdText += ' 👑';
        if (cmd.premium) cmdText += ' 💎';
        if (cmd.group) cmdText += ' 👥';
        if (cmd.admin) cmdText += ' 👮';
        
        menuText += `${cmdText}\n`;
      });
      
      menuText += `╰─❍\n\n`;
    });

    // Footer
    menuText +=