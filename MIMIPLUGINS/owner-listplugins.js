const fs = require("fs")
const path = require('path');

let handler = async (m, { conn, isCreator, text, reply, example }) => {
if (!isCreator) return reply(global.mess.creator)
let dir = fs.readdirSync('./MIMIPLUGINS')
if (dir.length < 1) return reply("Tidak ada file plugins")
let teks = "\n"
for (let e of dir) {
teks += `* ${e}\n`
}
reply(teks)
}

handler.command = ["listplugin", "listplugins"]

module.exports = handler