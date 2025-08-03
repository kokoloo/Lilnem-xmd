
import os from "os";
import chalk from "chalk";

// Function to format bytes into human-readable format
const formatBytes = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

// Function to calculate uptime in a readable format
const calculateUptime = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
};

var handler = async (m, { conn }) => {
  try {
    // System information
    const platform = os.platform();
    const architecture = os.arch();
    const hostname = os.hostname();
    const release = os.release();
    const uptime = calculateUptime(os.uptime());
    
    // Memory information
    const totalMemory = formatBytes(os.totalmem());
    const freeMemory = formatBytes(os.freemem());
    const usedMemory = formatBytes(os.totalmem() - os.freemem());
    
    // CPU information
    const cpuInfo = os.cpus();
    const cpuModel = cpuInfo[0].model;
    const cpuCores = cpuInfo.length;
    
    // Load averages (on Unix-like systems)
    const loadAverage = os.loadavg();
    
    // Node.js process information
    const nodeVersion = process.version;
    const processUptime = calculateUptime(process.uptime());
    const processMemory = process.memoryUsage();
    
    const systemInfo = `
*🖥️ SYSTEM INFORMATION*

*📱 Platform:* ${platform}
*🏗️ Architecture:* ${architecture}
*🌐 Hostname:* ${hostname}
*📋 OS Release:* ${release}
*⏰ System Uptime:* ${uptime}

*💾 MEMORY USAGE*
*📊 Total Memory:* ${totalMemory}
*🟢 Free Memory:* ${freeMemory}
*🔴 Used Memory:* ${usedMemory}

*⚙️ CPU INFORMATION*
*🔧 Model:* ${cpuModel}
*🔢 Cores:* ${cpuCores}
*📈 Load Average:* ${loadAverage.map(avg => avg.toFixed(2)).join(', ')}

*🟢 NODE.JS PROCESS*
*📦 Node Version:* ${nodeVersion}
*⏱️ Process Uptime:* ${processUptime}
*💾 Process Memory:*
  - RSS: ${formatBytes(processMemory.rss)}
  - Heap Used: ${formatBytes(processMemory.heapUsed)}
  - Heap Total: ${formatBytes(processMemory.heapTotal)}
  - External: ${formatBytes(processMemory.external)}

*🤖 BOT STATUS:* Online and Running
*📊 Performance:* Optimal
`.trim();

    await m.reply(systemInfo);
    
  } catch (error) {
    console.error(chalk.red('OS Info Error:'), error);
    throw 'Failed to retrieve system information. Please try again.';
  }
};

handler.help = ['os', 'system', 'sysinfo'];
handler.tags = ['info'];
handler.command = /^(os|system|sysinfo)$/i;
handler.register = true;

export default handler;
