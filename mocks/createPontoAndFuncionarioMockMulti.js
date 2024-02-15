const createColaboradorMock = require("./colaboradorMock");
const createPontoMock = require("./pontoMock");

function createPontoAndFuncionarioMock(){
    let promises = [];
    for (let i = 0; i < 1000; i++){
        promises.push(
            createColaboradorMock().then(usuarioSalvo => {
                for (let j = 0; j < 30; j++){
                    createPontoMock(usuarioSalvo.colaboradorMatricula, usuarioSalvo.colaboradorNome);
                }
            })
        );
    }
    Promise.all(promises).then(() => console.log('Todos os colaboradores e pontos foram criados.'));
}


module.exports = createPontoAndFuncionarioMock;
