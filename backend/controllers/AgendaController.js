const connection = require('../connection');

module.exports = {
    async SelecionarAgendas(req, res, next){
        var sql = `select * from agenda`;
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async Selecionar(req, res, next){
        const {id} = req.params;
        var sql = `select * from agenda, locais where agenda.idlocais = locais.idlocais and agenda.idlocais = ${id}`;
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async Inserir(req, res, next){
        const {data, status, idLocal} = req.body; 
        let sql = `INSERT INTO agenda(idagenda, data, status, idlocais) VALUES(null, '${data}', ${status}, ${idLocal})`;
        await connection.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            
            var sql = `select * from agenda, locais where agenda.idlocais = locais.idlocais and idagenda = ${result.insertId}`;
            connection.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }

                return res.json(rows);
            });
        });
        
    },
    async Update(req, res, next){
        const idagenda = req.params.id;
        const {status} = req.body;
        let sql = `UPDATE agenda SET status = ${status} WHERE idagenda = ${idagenda}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const agenda = {
                idagenda: idagenda,
                status: status 
            }

            return res.status(200).json(agenda);
        });
        
    },

    async Delete(req, res, next) {
        const id = req.params.id;
        let sql = `DELETE FROM agenda WHERE idagenda = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },
};
