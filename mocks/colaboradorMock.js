// colaboradorMock.js
const faker = require('faker');
const Colaborador = require("../models/ColaboradorSchema");


let matricula = 0;
async function createColaboradorMock() {
    const colaborador = new Colaborador({
        matricula: ++matricula,
        nome: faker.name.findName()
    });

    try {
        const savedColaborador = await colaborador.save();
        console.log('Colaborador aleatório criado');
        return { colaboradorMatricula: savedColaborador.matricula, colaboradorNome: savedColaborador.nome };
    } catch (error) {
        console.log(error);
    }
}

module.exports = createColaboradorMock;
