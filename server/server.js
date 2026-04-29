const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("client"));

let players = {};

io.on("connection", (socket) => {
    console.log("Oyuncu bağlandı:", socket.id);

    players[socket.id] = { x: 200, y: 200 };

    socket.on("move", (input) => {
        const speed = 5;
        if (input.up) players[socket.id].y -= speed;
        if (input.down) players[socket.id].y += speed;
        if (input.left) players[socket.id].x -= speed;
        if (input.right) players[socket.id].x += speed;
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

setInterval(() => {
    io.emit("state", players);
}, 50);

server.listen(3000, () => console.log("Server running on 3000"));
