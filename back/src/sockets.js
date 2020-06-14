let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = 8081;

io.on('connection', (socket) => {
console.log('connexion')
////////////////////// PRODUITS //////////////////////////////////////////////////

    socket.on('connection-contact', (contact) => {

        socket.broadcast.emit('contact-connecter', {contact: contact})
    });
    socket.on('deconnection-contact', (contact) => {

        socket.broadcast.emit('contact-deconnecter', {contact: contact})
    });
    socket.on('ajout-notification', (notification) => {

        socket.broadcast.emit('nouvelle-notification', {notification: notification})
    });
    socket.on('send-message', (message) => {

        socket.broadcast.emit('nouveau-message', {message: message})
    });
    socket.on('add-listeAttente', (user) => {

        socket.broadcast.emit('nouveau-user-listeAttente', {user: user})
    });
    socket.on('send-message-tchat-aveugle', (message) => {

        socket.broadcast.emit('nouveau-message-tchat-aveugle', {message: message})
    });
    socket.on('nouveau-tchat-aveugle', (data) => {

        socket.broadcast.emit('commencer-tchat-aveugle', {tchatAveugle: data.tchatAveugle, userId: data.userId})
    });
    socket.on('remove-user-tchat-aveugle', (userId) => {

        socket.broadcast.emit('user-supprime-tchat-aveugle', {userId: userId})
    });

});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

