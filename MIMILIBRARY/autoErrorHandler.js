// autoErrorHandler.js
const fs = require("fs");
const path = require("path");

// EN: Error log file location | FR: Emplacement du fichier de log d'erreur
const errorLogPath = path.join(__dirname, "error.log");

function saveErrorLog(error) {
    const time = new Date().toISOString();
    const log = `[${time}] ${error.stack || error}\n\n`;
    fs.appendFileSync(errorLogPath, log, "utf8");
    console.error("❌ Error logged to error.log");
}

// EN: Function to send error message to WhatsApp | FR: Fonction pour envoyer un message d'erreur à WhatsApp
async function sendErrorToWhatsApp(sock, jid, error) {
    try {
        let text = `⚠️ *WhatsApp Bot Error* ⚠️\n\n` +
                   `🕒 Time: ${new Date().toLocaleString()}\n` +
                   `📌 Message: ${error.message || error}\n\n` +
                   `📄 Stack:\n${error.stack || "-"}`
        await sock.sendMessage(jid, { text });
    } catch (e) {
        console.error("Failed to send error to WhatsApp:", e.message);
    }
}

// EN: Function to setup auto error handler | FR: Fonction pour configurer le gestionnaire d'erreur automatique
function setupErrorHandler(sock, ownerNumber) {
    process.on("uncaughtException", (err) => {
        console.error("🚨 Uncaught Exception:", err);
        saveErrorLog(err);
        sendErrorToWhatsApp(sock, ownerNumber, err);
    });

    process.on("unhandledRejection", (reason) => {
        console.error("🚨 Unhandled Rejection:", reason);
        saveErrorLog(reason);
        sendErrorToWhatsApp(sock, ownerNumber, reason);
    });
}

module.exports = { setupErrorHandler };