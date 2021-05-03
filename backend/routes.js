const { Router } = require('express');

const PrevencaoController = require('./controllers/PrevencaoController');
const UsuarioController = require('./controllers/UsuarioController');
const LocalizacaoController = require('./controllers/LocalizacaoController');
const ConsultaController = require('./controllers/ConsultasController');
const AgendaController = require('./controllers/AgendaController');

const routes = Router();

routes.get('/prevencoes/:id', PrevencaoController.SelecionarPreven);
routes.get('/prevencoes', PrevencaoController.Selecionar);
routes.post('/prevencoes', PrevencaoController.Inserir);
routes.put('/prevencoes/:id', PrevencaoController.Update);
routes.delete('/prevencoes/:id', PrevencaoController.Delete);

routes.post('/usuario', UsuarioController.Login);
routes.get('/usuarios', UsuarioController.Selecionar);
routes.post('/usuarios', UsuarioController.Inserir);
routes.put('/usuarios/:id', UsuarioController.Update);
routes.delete('/usuarios/:id', UsuarioController.Delete);

routes.get('/locais', LocalizacaoController.Selecionar);
routes.post('/locais', LocalizacaoController.Inserir);
routes.put('/locais/:id', LocalizacaoController.Update);
routes.delete('/locais/:id', LocalizacaoController.Delete);
routes.get('/locais/:id', LocalizacaoController.SelecionarLocal);

routes.get('/loc/agenda/:id', AgendaController.Selecionar);
routes.get('/loc/agendas', AgendaController.SelecionarAgendas);
routes.post('/loc/agenda', AgendaController.Inserir);
routes.put('/loc/agenda/:id', AgendaController.Update);
routes.delete('/loc/agenda/:id', AgendaController.Delete);

routes.get('/usuarios/consultas/:id', ConsultaController.Selecionar);
routes.post('/usuarios/consultas', ConsultaController.Inserir);
routes.put('/usuarios/consultas/:id', ConsultaController.Update);

module.exports = routes;