const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = routes;
