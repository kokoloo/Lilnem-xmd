const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let sending = false

const handler = async (m, { conn, text, isCreator, reply }) => {
  if (!isCreator) return reply("Command reserved for the owner!")
  if (sending) return reply("A request is already in progress...")

  sending = true

  try {
    const link = text
    if (!link || !link.match(linkRegex)) {
      sending = false
      return reply("❌ Invalid WhatsApp group link!")
    }

    const [_, code] = link.match(linkRegex) || []
