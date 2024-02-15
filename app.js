require('dotenv').config();
require('mongoose');



const {Types} = require("mongoose");
const express = require('express');
const connectDB = require('./services/database');
const getAllByMatricula = require('./usecases/ponto/getAllByMatricula');
const createPontoAndFuncionarioMock = require('./mocks/createPontoAndFuncionarioMockMulti')
const app = express();
const port = process.env.PORT || 3000;


app.listen(port, async () => {
  console.log(`Servidor está rodando na porta ${port}`);
  connectDB();
  createPontoAndFuncionarioMock();
})

app.set('view engine', 'pug');
app.set('views', 'view');

app.get('/pontos/matricula', getAllByMatricula);
