const connection = require('../connection');

module.exports = {
    async Selecionar(req, res, next){
        const {id} = req.params;
        var sql = `SELECT * FROM favoritos WHERE idusuario = ${id}`;
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async Inserir(req, res, next){
        const { idUsuario, idLocal } = req.body; 
        let sql = `INSERT INTO favoritos(idfavoritos, idusuario, idlocal) VALUES(null, ${idUsuario}, ${idLocal})`;
        await connection.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            
            return res.status(201).json(result.insertId);
        });
        
    },

    async Delete(req, res, next) {
        const { idUsuario, idLocal } = req.body;
        let sql = `DELETE FROM favoritos WHERE idlocal = ${idLocal} AND idusuario = ${idUsuario}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },
};
