const Ponto = require("../../models/PontoSchema");

function createPonto(matricula, nome, dataPonto, entrada1, saida1, entrada2,saida2, horasTrabalhadas){
    const ponto = new Ponto({
        colaboradorMatricula: matricula,
        colaboradorNome: nome,
        data: dataPonto,
        entrada1: entrada1,
        saida1: saida1,
        entrada2: entrada2,
        saida2: saida2,
        horasTrabalhadas: horasTrabalhadas
    });
    ponto.save().then(() => console.log(`Ponto registrado`))
}
module.exports = createPonto;
