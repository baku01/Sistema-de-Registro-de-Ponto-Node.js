const Ponto = require('../models/PontoSchema');
const faker = require('faker');

function createPontoMock(matricula , nome) {
    console.log(`Matricula: ${matricula}, Nome: ${nome}`); // Verificar os valores passados

    const data = faker.date.between('2022-01-01', '2022-12-31');
    const entrada1 = faker.date.between(data, new Date(data.getTime() + 4 * 60 * 60 * 1000)); // até 4 horas depois
    const saida1 = faker.date.between(entrada1, new Date(entrada1.getTime() + 4 * 60 * 60 * 1000)); // até 4 horas depois
    const entrada2 = faker.date.between(saida1, new Date(saida1.getTime() + 4 * 60 * 60 * 1000)); // até 4 horas depois
    const saida2 = faker.date.between(entrada2, new Date(entrada2.getTime() + 4 * 60 * 60 * 1000)); // até 4 horas depois

    const ponto = new Ponto({
        colaboradorMatricula: matricula,
        colaboradorNome: nome,
        data: data,
        entrada1: entrada1,
        saida1: saida1,
        entrada2: entrada2,
        saida2: saida2,
    });

    ponto.save()
        .then(response => console.log('Ponto mock criado...'))
        .catch(error => console.log('Erro ao salvar o ponto:', error)); // Lidar com possíveis erros
}

module.exports = createPontoMock;
