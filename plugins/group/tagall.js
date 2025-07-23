const handler = async (m, { conn, text, participants, isAdmins, isOwner, reply }) => {
  if (!isAdmins && !isOwner) return reply("Command reserved for admins!")

  const message = text || "📢 Attention everyone!"
  let teks = `*📢 GENERAL ANNOUNC