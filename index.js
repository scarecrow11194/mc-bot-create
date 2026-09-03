const bedrock = require('bedrock-protocol');
const http = require('http');


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bedrock AFK Bot is running!\n');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Web server active on port ${PORT}`);
});


function createBot() {
    const client = bedrock.createClient({
        host: 'ezzz-BS31.aternos.me',
        port: 49761,
        username: 'AFK_Bot_Bedrock',
        offline: true 
    });

    client.on('join', () => {
        console.log('Bedrock bot successfully connected to the world!');
    });

    client.on('close', () => {
        console.log('Disconnected. Attempting reconnect in 30 seconds...');
        setTimeout(createBot, 30000);
    });

    client.on('error', (err) => {
        console.log('Bot Error caught: ', err.message);
    });
}

createBot();
