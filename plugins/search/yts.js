import yts from 'yt-search'

const handler = async (m, { conn, text, prefix, command, reply }) => {
  if (!text) return reply(`⚠️ *Enter a search term!*\nExample: ${prefix + command} despacito`)

  try {
    reply("🔍 Searching...")

    const results = await yts(text)
    if (!results || !results.videos || results.videos.length === 0) {
      return reply('❌ No video found for your search')
    }

    const videos = results.videos.slice(0, 10)
    let teks