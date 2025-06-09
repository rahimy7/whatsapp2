const express = require('express');
const bodyParser = require('body-parser');
const webhookController = require('./controllers/webhook.controller');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor activo en Railway' });
});


// Webhook endpoints
app.get('/webhook', webhookController.verifyWebhook);
app.post('/webhook', webhookController.handleWebhook);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Algo salió mal!',
        message: err.message 
    });
});

module.exports = app;