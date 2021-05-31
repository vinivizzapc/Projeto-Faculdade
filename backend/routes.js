const { Router } = require('express');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const PrevencaoController = require('./controllers/PrevencaoController');
const UsuarioController = require('./controllers/UsuarioController');
const LocalizacaoController = require('./controllers/LocalizacaoController');
const ConsultaController = require('./controllers/ConsultasController');
const AgendaController = require('./controllers/AgendaController');
const FavoritosController = require('./controllers/FavoritosController');

const routes = Router();

routes.get('/prevencoes/:id', PrevencaoController.SelecionarPreven);
routes.get('/prevencoes', PrevencaoController.Selecionar);
routes.get('/prevencoesHigiene', PrevencaoController.SelecionarHigiene);
routes.get('/prevencoesMental', PrevencaoController.SelecionarMental);
routes.get('/prevencoesFisica', PrevencaoController.SelecionarFisica);
routes.get('/prevencoesAlimentacao', PrevencaoController.SelecionarAlimentacao);
routes.post('/prevencoes', PrevencaoController.Inserir);
routes.put('/prevencoes/:id', PrevencaoController.Update);
routes.delete('/prevencoes/:id', PrevencaoController.Delete);

routes.post('/usuario', UsuarioController.Login);
routes.get('/usuarios', UsuarioController.Selecionar);
routes.get('/usuariosUsu', UsuarioController.SelecionarUsu);
routes.get('/usuariosAdm', UsuarioController.SelecionarAdm);
routes.post('/usuarios', UsuarioController.Inserir);
routes.put('/usuarios/:id', UsuarioController.Update);
routes.delete('/usuarios/:id', UsuarioController.Delete);

routes.get('/locais', LocalizacaoController.Selecionar);
routes.get('/locaisConsulta', LocalizacaoController.SelecionarLocConsulta);
routes.get('/locaisVacinacao', LocalizacaoController.SelecionarLocVacinacao);
routes.get('/locaisExame', LocalizacaoController.SelecionarLocExame);
routes.post('/locais', LocalizacaoController.Inserir);
routes.put('/locais/:id', LocalizacaoController.Update);
routes.delete('/locais/:id', LocalizacaoController.Delete);
routes.get('/locais/:id', LocalizacaoController.SelecionarLocal);

routes.get('/loc/agenda/:id', AgendaController.Selecionar);
routes.get('/loc/agendas', AgendaController.SelecionarAgendas);
routes.post('/loc/agenda', AgendaController.Inserir);
routes.put('/loc/agenda/:id', AgendaController.Update);
routes.delete('/loc/agenda/:id', AgendaController.Delete);

routes.get('/consultas', ConsultaController.SelecionarAdm);
routes.get('/usu/consultas/:id', ConsultaController.Selecionar);
routes.post('/usu/consultas', ConsultaController.Inserir);
routes.put('/usu/consultas/:id', ConsultaController.Update);
routes.delete('/consultas/:id', ConsultaController.Delete);

routes.get('/favoritos/:id', FavoritosController.Selecionar);
routes.get('/favorito/:idUsuario/:idLocal', FavoritosController.SelecionarFavorito);
routes.post('/favoritos', FavoritosController.Inserir);
routes.delete('/favoritos/:id', FavoritosController.Delete);
routes.post('/favoritoDelete', FavoritosController.DeleteFavorito);

module.exports = routes;