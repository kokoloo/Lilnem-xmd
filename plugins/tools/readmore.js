
var handler = async (m, { text }) => {
    let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
    m.reply(l + readMore + r)
}

handler.help = ['readmore <text1>|<text2>']
handler.tags = ['tools']
handler.command = /^readmore$/i
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
