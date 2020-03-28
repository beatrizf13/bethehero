const express = require('express');

const routes = express.Router();

const SessionController = require('../controllers/SessionController');
const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');
const ProfileController = require('../controllers/ProfileController');

const OngValidator = require('../validators/OngValidator');
const IncidentValidator = require('../validators/IncidentValidator');
const SessionValidator = require('../validators/SessionValidator');

routes.get('/', (req, res) => res.json({ status: 'ok' }));

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.get(
  '/profile',
  SessionValidator.isAuthenticadet,
  ProfileController.index
);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator.store, OngController.store);

routes.get('/incidents', IncidentValidator.index, IncidentController.index);
routes.post(
  '/incidents',
  SessionValidator.isAuthenticadet,
  IncidentController.store
);
routes.delete(
  '/incidents/:id',
  SessionValidator.isAuthenticadet,
  IncidentValidator.delete,
  IncidentController.destroy
);

module.exports = routes;
