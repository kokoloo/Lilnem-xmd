let handler = async (m) => {
  const sentMsg = await conn.sendContactArray(m.chat, [
      [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `💌 Developer Bot `, `Not Famous`, `🇨🇮`, `👤 Owner of JIAKU`],
      [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 Whatsapp Bot`, `📵 Dont Spam`, `ameerto3637@gmail.com`, `🇮🇩 Indonesia`, `📍 https://github.com/hhhisoka-bot/`, `it's just a bot made for fun ☺`]
  ], fkontak)
  await m.reply(`Hello @${m.sender.split(`@`)[0]} Thats my owner, dont spam or i will block u`)
}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i
export default handler