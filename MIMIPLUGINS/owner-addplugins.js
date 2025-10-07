const fs = require("fs")

let handler = async (m, { conn, isCreator, text, reply }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("filename & reply code")
if (!m.quoted || !m.quoted.text) return reply("filename & reply code")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
let kondisi = "adding"
if (fs.existsSync("./MIMIPLUGINS/" + text)) return reply("Plugin file name already exists in plugins folder!")
let teks = m.quoted.text
await fs.writeFileSync("./MIMIPLUGINS/" + text, teks)
return reply(`Successfully ${kondisi} plugin file *${text}*`)
}

handler.command = ["addplugins", "addplugin", "addp", "addplug"]

module.exports = handler    