import baileys from "@whiskeysockets/baileys"
const { generateWAMessageFromContent } = baileys

const handler = async (m, { conn, text, participants, isOwner, isAdmins, reply }) => {
  if (!isAdmins && !isOwner) return reply("Command reserved for admins!")

  try {
    const users = participants.map((u) => conn.decodeJid(u.id))
    const q = m.quoted ? m.quoted : m
    const c = m.quoted ? await m.getQuotedObj() : m