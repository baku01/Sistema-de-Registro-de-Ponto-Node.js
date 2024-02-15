const Colaborador = require("../../models/ColaboradorSchema");

function findByName(colaboradorNome){
    Colaborador.findOne({ nome: colaboradorNome })
        .then(colaborador => {
            if (colaborador) {
                console.log('Colaborador encontrado:', colaborador);
            } else {
                console.log('Nenhum colaborador encontrado com o nome', colaboradorNome);
            }
        })
        .catch(erro => {
            console.log(erro);
        });
}

module.exports = findByName;
