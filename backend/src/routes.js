const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


//Logon da ONG (WEB)
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().length(8).pattern( new RegExp('^[0-9A-Fa-f]{8}$') ),
  }),
}), SessionController.create);


//Listagem das ONGs (dev)
routes.get('/ongs', OngController.index);


//Criacao de uma ONG (WEB)
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), OngController.create);


//Listagem dos casos de UMA ONG (WEB)
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);


//Listagem dos casos de todas ongs (MOBILE)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), IncidentController.index);


//Adicao de um caso novo (WEB)
/**
 *  Expressao regular para valor monetário com . no milhar e , nos centavos
 *  ^([1-9]\d{0,2}(\.\d{3})*|0),\d{2}$
 * 
 *  Expressao regular para valor monetário com pontuacoes . e , facultativos
 *  ^([1-9]\d{0,2}(\d*|(\.\d{3})*)|0)(,\d{2})*$
 */
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number(),
  }),
}), IncidentController.create);


//Exclusao de um caso exixtente (WEB)
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);


module.exports = routes;
