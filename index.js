const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const app = express();
const port = 3000;

// Inicializa el cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Evento para generar el QR
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea este código QR con tu aplicación de WhatsApp.');
});

// Evento cuando el cliente está listo
client.on('ready', () => {
    console.log('El bot de WhatsApp está listo!');
});

// Evento para recibir mensajes
client.on('message', message => {
    console.log(`Mensaje recibido: ${message.body}`);
    
    if(message.body.toLowerCase() === 'hola') {
        message.reply('¡Hola! ¿En qué puedo ayudarte?');
    }
});

// Inicia el cliente de WhatsApp
client.initialize();

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Inicia el servidor Express
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

