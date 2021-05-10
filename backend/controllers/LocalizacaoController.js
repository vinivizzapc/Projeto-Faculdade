const connection = require('../connection');
const CepCoords = require("coordenadas-do-cep");

module.exports = {
    async Selecionar(req, res, next) {
        //desenvolver select com as localizações proximas
        var sql = `SELECT * FROM locais`
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async Inserir(req, res, next) {
        const { nome, cep, tipo, descricao} = req.body;

        try{
            const info = await CepCoords.getByCep(cep);
            let endereco = info.logradouro;
            let latitude = info.lat;
            let longitude = info.lon;
        }catch(err)
            {return res.json({msg:'CEP inválido'});
        }

        let sql = `INSERT INTO locais(idLocais, nome, cep, endereco, latitude, longitude, tipo, descricao) 
            VALUES(null, '${nome}', '${cep}', '${endereco}', ${latitude}, ${longitude}, '${tipo}', '${descricao}')`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            const local = {
                id: result.insertId,
                nome: nome,
                cep: cep,
                endereco: endereco,
                latitude: latitude,
                longitude: longitude,
                tipo: tipo,
                descricao: descricao,
            }

            return res.status(201).json(local);
        });
    },

    async Update(req, res, next){
        const idLocal = req.params.id;
        const { nome, cep, descricao, tipo } = req.body;

        const info = await CepCoords.getByCep(cep);
        let endereco = info.logradouro;
        let latitude = info.lat;
        let longitude = info.lon;

        let sql = `UPDATE locais SET nome = '${nome}', cep = '${cep}', endereco = '${endereco}', latitude = ${latitude}, 
            longitude = ${longitude}, descricao = '${descricao}', tipo = ${tipo} WHERE idlocais = ${idLocal}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const local = {
                idLocal: idLocal,
                nome: nome,
                cep: cep,
                endereco: endereco,
                latitude: latitude,
                longitude: longitude,
                descricao: descricao,
                tipo: tipo
            }

            return res.status(200).json(local);
        });
        
    },

    async Delete(req, res, next) {
        const idLocal = req.params.id;
        let sql = `DELETE FROM locais WHERE idlocais = ${idLocal}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },

    async SelecionarLocal(req, res, next) {
        const idLocal = req.params.id;
        let sql = `SELECT * FROM locais WHERE idlocais = ${idLocal}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    }
}