const fs = require("fs")

let handler = async (m, { conn, isCreator, text, reply }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("filename & reply code")
if (!m.quoted || !m.quoted.text) return reply("filename & reply code")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
let kondisi = "editing"
if (!fs.existsSync("./MIMIPLUGINS/" + text.toLowerCase())) return reply("Plugin file not found!")
let teks = m.quoted.text
await fs.writeFileSync("./MIMIPLUGINS/" + text, teks)
return reply(`Successfully ${kondisi} plugin file *${text}*`)
}

handler.command = ["sp", "svp", "saveplugins", "saveplugin"]

module.exports = handler