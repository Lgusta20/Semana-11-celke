const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const Home = require('./models/Home');
const Orcamento = require('./models/Orcamento');

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get('/', async (req, res) => {
    await Home.findOne()
    .then((datahome) => {
        return res.json({
            erro: false,
            datahome,
            url: "http://localhost:3001/files/home/"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum valor encontrado para a página home!"
        });
    });
}); 

app.post('/cadastrar', async (req, res) => {
    await Home.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Dados para página home cadastrado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Dados para página home não cadastrado com sucesso!"
        });
    });
});

app.post('/cadastrar-orcamento', async (req, res) => {

    /*await sleep(3000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }*/

    await Orcamento.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Orçamento enviando com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Orçamento não enviando com sucesso!"
        });
    });
});

app.listen(3001, () => {
    console.log("Servidor iniciado na porta 3001: http://localhost:3001");
});

