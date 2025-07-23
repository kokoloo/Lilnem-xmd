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
    
    // If it's not a YouTube link, search
    if (!youtubeLink.includes('youtube.com') && !youtubeLink.includes('youtu.be')) {
      const searchResults = await yts(youtubeLink);
      if (!searchResults.videos.length) {
        downloading = false;
        return reply("*No video found for your search*");
        
        {}