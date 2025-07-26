import baileys from "@whiskeysockets/baileys"
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = baileys
import fetch from 'node-fetch'

const handler = async (m, { conn, text, participants, args, isAdmins, isBotAdmins, reply }) => {
  if (!isAdmins) return reply("Command can only be executed by admin!")
  if (!isBotAdmins) return reply("The bot needs to be an admin!")
  if (!args[0]) return reply("Please enter the number to add!\nExample: .add 263717869574")

  try {
    const _participants = participants.map((user) => user.id)
    const users = (await Promise.all(
      text.split(',')
        .map((v) => v.replace(/[^0-9]/g, ''))
        .filter((v) => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net