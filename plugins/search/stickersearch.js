import fetch from 'node-fetch';

const handler = async (m, { conn, text, args }) => {
  try {
    if (!text) {
      return m.reply("*Please provide a search term for the stickers*");
    }

    await m.reply('🔍 *Searching for stickers...*');

    // Searching for stickers
    const response = await fetch(`https://api.akuari.my.id/search/sticker?query=${encodeURIComponent(text)}`);
    const data = await response.json();

    if (!data.result || data.result.length === 0) {
      return m.reply("*No stickers found for your search*");
    }

    // Limit to 5 results to avoid spamming
    const limitedResults = data.result.slice(0, 5);
    
    await m.reply(`🔍 *STICK