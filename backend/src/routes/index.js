const express = require('express');
const OngController = require('../controllers/OngController');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ status: 'ok' }));

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

module.exports = routes;
