const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
    messages: {
        1: [],
        2: [],
    },
}).write();

const io = require('socket.io')(null, {
    cors: {
        origin: '*',
    },
});

let messages = db.get('messages').value();
console.log(messages);

setInterval(() => io.sockets.emit('newMessages', messages), 1000);

io.on('connection', (client) => {
    console.log('client connected');
    client.on('messages', (message) => {
        const { roomId, username, content } = message;
        messages[roomId].push({ username, content });
        db.set('messages', messages).write();
        io.sockets.emit('newMessages', messages);
    });
});
io.listen(3002);
