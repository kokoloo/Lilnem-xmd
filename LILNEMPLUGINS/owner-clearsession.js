const fs = require("fs")

let handler = async (m, { isCreator, reply }) => {
if (!isCreator) return reply(global.mess.creator)
const dirsesi = fs.readdirSync("./session").filter(e => e !== "creds.json")
for (const i of dirsesi) {
await fs.unlinkSync("./session/" + i)
}
reply(`*Successfully cleaned up trash ✅*
*${dirsesi.length}* session files deleted`)
}

handler.command = ["boost", "clearsession", "clsesi", "clearsesi"]

module.exports = handler