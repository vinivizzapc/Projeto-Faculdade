const connection = require('../connection');

module.exports = {
    async Selecionar(req, res, next){
        const {id} = req.params;
        var sql = `SELECT * FROM favoritos, locais WHERE idusuario = ${id} and favoritos.idlocal = locais.idlocais`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            
            return res.json(rows);
        });
    },

    async SelecionarFavorito(req, res, next){
        const { idUsuario, idLocal } = req.params;
        var sql = `SELECT * FROM favoritos WHERE idusuario = ${idUsuario} AND idlocal = ${idLocal}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const favorito = rows.shift();
            if (favorito != null) {
                return res.json({ msg: 'É favorito' });
            }else{
                return res.json({ msg: 'Não é favorito' });
            }
        });
    },

    async Inserir(req, res, next){
        const { idUsuario, idLocal } = req.body; 
        let sql = `INSERT INTO favoritos(idfavoritos, idusuario, idlocal) VALUES(null, ${idUsuario}, ${idLocal})`;
        await connection.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            
            return res.status(201).json(result.insertId);
        });
        
    },

    async Delete(req, res, next) {
        const { id } = req.params;
        let sql = `DELETE FROM favoritos WHERE idfavoritos = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },

    async DeleteFavorito(req, res, next) {
        const { idUsuario, idLocal } = req.body;
        let sql = `DELETE FROM favoritos WHERE idusuario = ${idUsuario} AND idlocal = ${idLocal}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },
};
