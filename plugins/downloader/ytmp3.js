import fetch from 'node-fetch';
import yts from 'yt-search';

let downloading = false;

const handler = async (m, { conn, text, args, command, prefix, reply }) => {
  if (!args[0]) {
    return reply(`*Usage: ${prefix + command} <YouTube link or search term>*`);
  }

  if (downloading) {
    return reply("*A download is already in progress. Please wait...*");
  }

  downloading = true;

  try {
    let youtubeLink = args.join(' ');
    
    // If this is not a YouTube link, search for it
    if (!youtubeLink.includes('youtube.com') && !youtubeLink.includes('youtu.be')) {
      const searchResults = await yts(youtubeLink);
      if (!searchResults.videos.length) {
        downloading = false;
        return reply("*No video found for your search*");
      }
      youtubeLink = searchResults.videos[0].url;
    }

    await reply("*🎵 Downloading audio...*");

    // For now, we just return the information
    // You will need to implement your preferred download API
    const videoInfo = await yts({ videoId: youtubeLink.split('v=')[1]?.split('&')[0] || youtubeLink.split('/').pop() });
    
    if (videoInfo) {
      await reply(`✅ *Audio found!*\n📱 *Title:* ${videoInfo.title}\n👤 *Author:* ${videoInfo.author.name}\n⏱️ *Duration:* ${videoInfo.timestamp}\n\n_Note: Implement your preferred download API in this plugin_`);
    } else {
      await reply("❌ *Unable to retrieve video information*");
    }

  } catch (error) {
    console.error('Error while downloading audio:', error);
    await reply("*❌ Error during download. Please try again.*");
  } finally {
    downloading = false;
  }
};

handler.help = ["ytmp3", "yta"];
handler.tags = ["downloader"];
handler.command = /^(audio|ytmp3|yta|mp3)$/i;

export default handler;