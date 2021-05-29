const connection = require('../connection');

module.exports = {
    async Login(req, res, next){
        const { email, senha } = req.body;
        var sql = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}'`;
        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const usuario = rows.shift();
            return res.json(usuario);
            
        });
    },

    async Inserir(req, res, next){
        const { nome, email, senha, status, imagem } = req.body;
        let sql = `INSERT INTO Usuario(idusuario, nome, email, senha, status, imagem) VALUES(null, '${nome}', '${email}', '${senha}', ${status}, '${imagem}')`;
        await connection.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            const usuario = {
                id: result.insertId,
                nome: nome,
                email: email, 
                senha: senha, 
                status: status,
                imagem: imagem
            }

            return res.status(201).json(usuario);
        });
    },

    async Update(req, res, next){
        const idUsuario= req.params.id;
        const { nome, email, senha } = req.body;
        let sql = `UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE idusuario = ${idUsuario}`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const usuario = {
                idusuario: idUsuario,
                nome: nome,
                email: email,
                senha: senha
            }

            return res.status(200).json(usuario);
        });
        
    },

    async Delete(req, res, next) {
        const id = req.params.id;
        let sql = `DELETE FROM usuario WHERE idusuario = ${id}`;
        
        await connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).end();
        });
    },

    async Selecionar(req, res, next) {
        let sql = `SELECT * FROM usuario`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },

    async SelecionarAdm(req, res, next) {
        let sql = `SELECT * FROM usuario where status = 1`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    },
    async SelecionarUsu(req, res, next) {
        let sql = `SELECT * FROM usuario where status = 0`;

        await connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }

            return res.json(rows);
        });
    }

};