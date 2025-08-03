let handler = async (m) => {
  const sentMsg = await conn.sendContactArray(m.chat, [
      [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `💌 Developer Bot `, `Not Famous`, `Zimbabwe �🇮`, `👤 Owner of Lilnem`],
      [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 Whatsapp Bot`, `📵 Dont Spam`, `lilnemthrillerhcker@gmail.com`, `Zimbabwe`, `📍 https://github.com/-bot/`, `it's just a bot made for fun ☺`]
  ], fkontak)
  await ř.reply(`Hello @${m.sender.split(`@`)[0]} Thats my owner, dont spam or i will block u`)
}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i
export default handler