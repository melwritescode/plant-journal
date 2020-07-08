const redis = require('redis');
const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

client.on('connect', () => console.log('Client connected to Redis'));
client.on('ready', () => console.log('Client ready to make requests.'));
client.on('error', (err) => console.log(err.message));
client.on('end', () => console.log('Client disconnected from Redis.'));

// Shut down our Redis server to disconnect client from Redis
process.on('SIGINT', () => client.quit());

module.exports = client;
