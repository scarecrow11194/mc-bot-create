const mineflayer = require('mineflayer');
const http = require('http');

// 1. Create a tiny web server so Render deployment succeeds
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Minecraft Bot is running 24/7!\n');
});

// Render automatically provides a PORT environment variable
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Web server listening on port ${PORT}`);
});
function createBot() {
    const bot = mineflayer.createBot({
        host: 'scarecrow11194.aternos.me', 
        port: 57757,                         
        username: 'dont kill me',                 
        version: false                       
    });
    bot.on('spawn', () => {
        console.log('Bot successfully joined the server!');
        // Small movement every 60 seconds to avoid AFK kicks
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 30 seconds...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => {
        console.log('Bot error: ', err);
    });
}

createBot();
