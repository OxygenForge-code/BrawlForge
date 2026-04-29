const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { createBullet, updateBullets, getBullets } = require("./bullets");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// client klasörünü yayınla
app.use(express.static("client"));

let players = {};

// Oyuncu bağlanınca
io.on("connection", (socket) => {
    console.log("Oyuncu bağlandı:", socket.id);

    players[socket.id] = { x: 200, y: 200 };

    // Hareket
    socket.on("move", (input) => {
        const speed = 5;

        if (input.up) players[socket.id].y -= speed;
        if (input.down) players[socket.id].y += speed;
        if (input.left) players[socket.id].x -= speed;
        if (input.right) players[socket.id].x += speed;
    });

    // Ateş etme
    socket.on("shoot", ({ dirX, dirY }) => {
        const p = players[socket.id];
        if (!p) return;

        createBullet(p.x, p.y, dirX, dirY, socket.id);
    });

    // Çıkınca sil
    socket.on("disconnect", () => {
        console.log("Oyuncu çıktı:", socket.id);
        delete players[socket.id];
    });
});

// Oyun loop
setInterval(() => {
    updateBullets();

    io.emit("state", {
        players,
        bullets: getBullets()
    });
}, 50);

// 🔥 Render uyumlu PORT
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});