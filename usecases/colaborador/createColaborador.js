const Colaborador = require("../../models/ColaboradorSchema");

function createColaborador(colaboradorId,colaboradorNome){
    const colaborador = new Colaborador({
        matricula: colaboradorId,
        nome: colaboradorNome
    });
    colaborador.save().then(() => console.log(`Colaborador criado com id: ${colaboradorId} e nome ${colaboradorNome}!`));
}
module.exports = createColaborador;
