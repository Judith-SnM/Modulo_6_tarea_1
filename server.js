// server.js
const express = require('express');
const path = require('path');
const app = express();

// Lista de nombres de usuarios registrados
const usuarios = ['Harry', 'Hermione', 'Ron', 'Draco'];

// Configurar la carpeta "assets" como pública
app.use(express.static(path.join(__dirname, 'assets')));

// Ruta para devolver la lista de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Middleware para verificar si el usuario existe en la lista
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'who.jpg'));
    }
});

// Ruta de juego (procede solo si el middleware fue exitoso)
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Ruta para verificar si el número coincide con el aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = parseInt(req.params.n, 10);
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

    if (n === numeroAleatorio) {
        res.sendFile(path.join(__dirname, 'assets', 'conejito.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'Voldemort'));
    }
});

// Ruta genérica para manejar páginas no encontradas
app.use((req, res) => {
    res.status(404).send('Esta página no existe...');
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
