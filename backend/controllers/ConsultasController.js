const connection = require('../connection');

module.exports = {
    async SelecionarAdm(req, res, next){
        const { id } = req.params;

        var sql = `select * from consultas, locais where consultas.idLocais = locais.idlocais`;
        
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            
            return res.json(rows);
            
        });
    },

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
        const {data, idusuario, idlocais, status, tipoConsulta, horario, especialidade} = req.body; 
            let sql = `INSERT INTO consultas(idconsultas, data, idusuario, idlocais, status, tipoConsulta, horario, especialidade) VALUES(null, '${data}', ${idusuario}, ${idlocais}, '${status}', '${tipoConsulta}', '${horario}', '${especialidade}')`;
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
        let sql = `UPDATE consultas SET status = ${status}, tipo = ${tipo} WHERE idconsultas = ${idconsulta}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const consulta = {
                idconsultas: idconsultas,
                status: status,
                tipoConsulta: tipoConsulta
            }

            return res.status(200).json(consulta);
        });

    }, 

    async Delete(req, res, next) {
        const id = req.params.id;
        let sql = `DELETE FROM consultas WHERE idconsultas = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },

};