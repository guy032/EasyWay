const io = require('socket.io')(null, {
    cors: {
        origin: '*',
    },
});

const messages = {
    1: [],
    2: [],
};

io.on('connection', (client) => {
    console.log('client connected');
    client.on('messages', (newMessages) => {
        messages = newMessages;
        client.emit('messages', messages);
    });
});
io.listen(3002);
