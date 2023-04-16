const express = require('express');
const Router    = express.Router()
const ProviderController = require('../controllers/providers-controller')
const providerController = new ProviderController();

Router.use(express.json());

Router.post('/providers', (req, res, next) => providerController.createProvider(req, res, next));
Router.get('/providers', (req, res, next) => providerController.getProviders(req, res, next));
Router.get('/providers/:id', (req, res, next) => providerController.getProvider(req, res, next));
Router.delete('/providers/:id', (req, res, next) => providerController.deactivateProvider(req, res, next));
Router.put('/providers/:id', (req, res, next) => providerController.editProvider(req, res, next));

module.exports = Router