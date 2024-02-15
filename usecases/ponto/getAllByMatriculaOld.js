// Importando o modelo Ponto
const Ponto = require('../../models/PontoSchema');

// Importando o modelo Colaborador
const Colaborador = require('../../models/ColaboradorSchema');

async function getAllByMatricula(req, res) {
    try {
        const matricula = parseInt(req.params.matricula);

        if (isNaN(matricula)) {
            console.log('Matrícula inválida:', req.params.matricula);
            res.status(400).send('Matrícula inválida');
            return;
        }

        console.time('Tempo de execução: ')

        const colaborador = await Colaborador.findOne({ matricula: matricula });

        console.timeEnd('Tempo de execução: ');

        if (!colaborador) {
            console.log('Colaborador não encontrado para a matrícula:', matricula);
            res.status(404).send('Colaborador não encontrado');
            return;
        }

        const pontos = await Ponto.find({ colaboradorMatricula: matricula });

        res.render('index', { matricula: matricula, pontos: pontos, nome: colaborador.nome });
    } catch (error) {
        console.log('Erro ao buscar pontos:', error);
        res.status(500).send('Erro ao buscar pontos');
    }
}

module.exports = getAllByMatricula;
