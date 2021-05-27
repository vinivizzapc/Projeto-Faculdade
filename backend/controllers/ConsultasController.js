const connection = require('../connection');

module.exports = {
    async Selecionar(req, res, next){
        const { id } = req.params;

        var sql = `select * from consultas, locais where consultas.idLocais = locais.idlocais and consultas.idusuario = ${id}`;
        
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            
            return res.json(rows);
            
        });
    },


    async Inserir(req, res, next){
        const {data, idusuario, idlocais} = req.body; 
            let sql = `INSERT INTO consultas(null, data, idusuario, idlocais) VALUES(null, '${data}', ${idusuario}, ${idlocais})`;
            await connection.query(sql, (error, result) => {
            if (error) {
                throw error;
            }

            var sql = `select * from consultas, locais where consultas.idconsultas = locais.idlocais and consultas.idusuario = ${idusuario}`;
            connection.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                }

                return res.json(rows);
            });
        });

    },
    async Update(req, res, next){
        const idconsulta = req.params.id;
        const {status} = req.body;
        let sql = `UPDATE consulta SET status = ${status} WHERE idconsultas = ${idconsulta}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const consulta = {
                idconsultas: idconsultas,
                status: status 
            }

            return res.status(200).json(consulta);
        });

    }, 
};