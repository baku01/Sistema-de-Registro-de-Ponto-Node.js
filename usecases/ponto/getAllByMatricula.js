// Importando o modelo Ponto
const Ponto = require('../../models/PontoSchema');

// Importando o modelo Colaborador
const Colaborador = require('../../models/ColaboradorSchema');

const mongoose = require('mongoose');

// Certifique-se de que os campos 'matricula' e 'colaboradorMatricula' estão indexados
Colaborador.createIndexes({ matricula: 1 });
Ponto.createIndexes({ colaboradorMatricula: 1 });



async function getAllByMatricula(req, res) {
    try {
        const matricula = parseInt(req.query.matricula);
        const page = parseInt(req.query.page) || 1; // Adicione paginação
        const limit = parseInt(req.query.limit) || 100; // Limite de documentos por página

        if (isNaN(matricula)) {
            console.log('Matrícula inválida:', req.params.matricula);
            res.status(400).send('Matrícula inválida');
            return;
        }

        console.time('Tempo de execução: ')

        const colaborador = await Colaborador.findOne({ matricula: matricula }, 'nome');

        console.timeEnd('Tempo de execução: ');

        if (!colaborador) {
            console.log('Colaborador não encontrado para a matrícula:', matricula);
            res.status(404).send('Colaborador não encontrado');
            return;
        }

        const pontos = await Ponto.find({ colaboradorMatricula: matricula })
            .select('data entrada1 saida1 entrada2 saida2')
            .sort({ data: 1 }) // Adicionado aqui
            .skip((page - 1) * limit)
            .limit(limit);

// Calcular o total de horas trabalhadas
        let totalHorasTrabalhadas = 0;
        for (const ponto of pontos) {
            const entrada1 = ponto.entrada1 ? new Date(ponto.entrada1) : null;
            const saida1 = ponto.saida1 ? new Date(ponto.saida1) : null;
            const entrada2 = ponto.entrada2 ? new Date(ponto.entrada2) : null;
            const saida2 = ponto.saida2 ? new Date(ponto.saida2) : null;

            const horasTrabalhadas1 = (entrada1 && saida1) ? (saida1.getTime() - entrada1.getTime()) : 0;
            const horasTrabalhadas2 = (entrada2 && saida2) ? (saida2.getTime() - entrada2.getTime()) : 0;

            const horasTrabalhadas = (horasTrabalhadas1 + horasTrabalhadas2) / (1000 * 60 * 60); // Converter milissegundos para horas

            totalHorasTrabalhadas += horasTrabalhadas;
        }

        res.render('index', {
            matricula: matricula,
            pontos: pontos,
            nome: colaborador.nome,
            totalHorasTrabalhadas: totalHorasTrabalhadas
        });

    } catch (error) {
        console.log('Erro ao buscar pontos:', error);
        res.status(500).send('Erro ao buscar pontos');
    }
}

module.exports = getAllByMatricula;
