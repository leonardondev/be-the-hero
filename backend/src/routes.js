const express = require('express');

const routes = express.Router();

routes.post('/users', (request, response) => {
  return response.json({ mensage: 'Omnistack11'});
});

module.exports = routes;
