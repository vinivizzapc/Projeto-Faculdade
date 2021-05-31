const connection = require('../connection');

module.exports = {
    async Selecionar(req, res, next) {
        const { tipo } = req.query;
        let sql = `SELECT * FROM prevencao, usuario WHERE prevencao.idUsuario = usuario.idusuario`;
        if(tipo != null){
            sql += ` AND tipo = '${tipo}'`;
        }

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async SelecionarHigiene(req, res, next) {
        const { tipo } = req.query;
        let sql = `SELECT * FROM prevencao, usuario WHERE prevencao.idUsuario = usuario.idusuario and tipo = "Higiene"`;
        if(tipo != null){
            sql += ` AND tipo = '${tipo}'`;
        }

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async SelecionarMental(req, res, next) {
        const { tipo } = req.query;
        let sql = `SELECT * FROM prevencao, usuario WHERE prevencao.idUsuario = usuario.idusuario and tipo = "Mental"`;
        if(tipo != null){
            sql += ` AND tipo = '${tipo}'`;
        }

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async SelecionarFisica(req, res, next) {
        const { tipo } = req.query;
        let sql = `SELECT * FROM prevencao, usuario WHERE prevencao.idUsuario = usuario.idusuario and tipo = "Fisica"`;
        if(tipo != null){
            sql += ` AND tipo = '${tipo}'`;
        }

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async SelecionarAlimentacao(req, res, next) {
        const { tipo } = req.query;
        let sql = `SELECT * FROM prevencao, usuario WHERE prevencao.idUsuario = usuario.idusuario and tipo = "Alimentação"`;
        if(tipo != null){
            sql += ` AND tipo = '${tipo}'`;
        }

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async Inserir(req, res, next) {
        const { tipo, texto, idUsuario, imagem } = req.body;
        let sql = `INSERT INTO prevencao(idPrevencao, tipo, texto, idUsuario, imagem) VALUES(null, '${tipo}', '${texto}', ${idUsuario}, '${imagem}')`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            const prevencao = {
                id: result.insertId,
                tipo: tipo,
                texto: texto,
                idUsuario: idUsuario,
                imagem: imagem
            }

            return res.status(201).json(prevencao);
        });
    },

    async Update(req, res, next) {
        const id = req.params.id;
        const { tipo, texto } = req.body;

        let sql = `UPDATE prevencao SET tipo = '${tipo}', texto = '${texto}' WHERE idPrevencao = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            const prevencao = {
                id: id,
                tipo: tipo,
                texto: texto
            }

            return res.status(200).json(prevencao);
        });
    },

    async Delete(req, res, next) {
        const id = req.params.id;
        let sql = `DELETE FROM prevencao WHERE idPrevencao = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },

    async SelecionarPreven(req, res, next) {
        const id = req.params.id;
        let sql = `SELECT * FROM prevencao WHERE idPrevencao = ${id}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    }
}