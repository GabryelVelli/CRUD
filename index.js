const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Configurações do banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'empresabd',
    password: '',
    port: 3306
});

app.post('/addEmpresa', (req, res) => {
    const { idEmpresa, nome, cnpj, contato } = req.body;
    console.log('Recebendo dados para adicionar:', req.body);

    pool.query(
        'INSERT INTO EMPRESA (idEmpresa, nome, cnpj, contato) VALUES (?, ?, ?, ?)',
        [idEmpresa, nome, cnpj, contato],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar empresa:', err);
                return res.status(500).send(err);
            }
            console.log('Empresa adicionada com sucesso!', results);
            res.status(200).send('Empresa adicionada com sucesso!');
        }
    );
});

app.delete('/deleteEmpresa', (req, res) => {
    const { idEmpresa } = req.body;
    console.log('Recebendo dados para deletar:', req.body);

    pool.query(
        'DELETE FROM Empresa WHERE idEmpresa = ?',
        [idEmpresa],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar empresa:', err);
                return res.status(500).send(err);
            }
            if (results.affectedRows === 0) {
                console.warn('Empresa não encontrada:', idEmpresa);
                return res.status(404).send('Empresa não encontrada');
            }
            console.log('Empresa deletada com sucesso!', results);
            res.status(200).send('Empresa deletada com sucesso!');
        }
    );
});

app.put('/updateEmpresa', (req, res) => {
    const { idEmpresa, nome, cnpj, contato } = req.body;
    console.log('Recebendo dados para atualizar:', req.body);

    pool.query(
        'UPDATE Empresa SET nome = ?, cnpj = ?, contato = ? WHERE idEmpresa = ?',
        [nome, cnpj, contato, idEmpresa],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar empresa:', err);
                return res.status(500).send(err);
            }
            if (results.affectedRows === 0) {
                console.warn('Empresa não encontrada:', idEmpresa);
                return res.status(404).send('Empresa não encontrada');
            }
            console.log('Empresa atualizada com sucesso!', results);
            res.status(200).send('Empresa atualizada com sucesso!');
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});



