const handler = async (m, { conn, text, prefix, command, isAdmins, isBotAdmins, reply }) => {
  if (!isAdmins) return reply("Command reserved for admins!")
  if (!isBotAdmins) return reply("The bot must be an admin!")

  let user = null

  // If the message quotes someone
  if (m.quoted?.sender) {
    user = m.quoted.sender
  }
  // If someone is mentioned
  else if (m.mentionedJid && m.mentionedJid.length > 0) {
    user = m.mentionedJid[0]
  }
  // If a number is provided
  else if (text) {
    let number = text.replace(/[^0-9]/g, '')
    
    if (number.length < 8 || number.length > 15) {
      return reply("❌ Please provide a valid number: 263717869574")
    }
    
    user = number + '@s.whatsapp.net'
  }

  if (!user) {
    return reply(`*Usage: ${prefix + command} @tag*\n*Or: ${prefix +