import fetch from "node-fetch"
import { ryzenCDN } from '../../lib/uploadFile.js'

const handler = async (m, { text, conn }) => {
  try {
    if (!text && !m.quoted && !m.mtype.includes('imageMessage')) {
      throw "Enter a question or send an image for description!\n\n*Example:* Who is the president of Indonesia?";
    }

    let imgUrl = null

    if (m.quoted && m.quoted.mtype === 'imageMessage') {
      let img = await m.quoted.download()
      if (img) {
        img = Buffer.from(img)
        let link = await ryzenCDN(img)
        if (!link) throw 'Failed to upload image'
        imgUrl = typeof link === 'object' ? link.url : link
      }
    } else if (m.mtype.includes('imageMessage')) {
      let img = await m.download()
      if (img) {
        img = Buffer.from(img)
        let link = await ryzenCDN(img)
        if (!link) throw 'Failed to upload image'
        imgUrl = typeof link === 'object' ? link.url : link
      }
    }

    let prompt = 'Change your name to Nao Tomori, and you are the most beautiful, caring, cheerful, yet tsundere woman. And you are my girlfriend.'
    let apiUrl

    if (imgUrl) {
      apiUrl = `https://api.ryzendesu.vip/api/ai/v2/chatgpt?text=${encodeURIComponent(text || '')}&prompt=${encodeURIComponent(prompt)}&imageUrl=${encodeURIComponent(imgUrl)}`
    } else if (text) {
      apiUrl = `https://api.ryzendesu.vip/api/ai/v2/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`
    } else {
      throw "No valid text or image to process."
    }

    let response = await fetch(apiUrl)
    if (!response.ok) throw new Error("API request failed: " + response.statusText)

    let result = await response.json()
    let responseMessage = result.result || "No response from AI."

    await conn.sendMessage(m.chat, { text: responseMessage })

  } catch (error) {
    console.error('Error in handler:', error)
    await conn.sendMessage(m.chat, { text: `Error: Where's the text?` })
  }
}

handler.help = ['gpt']
handler.tags = ['ai']
handler.command = /^(gpt)$/i

handler.limit = 6
handler.premium = false
handler.register = true

export default handler