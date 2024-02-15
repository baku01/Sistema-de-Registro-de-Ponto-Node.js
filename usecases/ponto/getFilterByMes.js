const Ponto = require('../../models/PontoSchema');
const Colaborador = require('../../models/ColaboradorSchema');

Ponto.createIndexes({ data: 1 });

async function getFilterByMes(req, res) {
    try {
        const mes = parseInt(req.params.mes);
        const page = parseInt(req.query.page) || 1; // Adicione paginação
        const limit = parseInt(req.query.limit) || 10; // Limite de documentos por página

        if (isNaN(mes) || mes < 1 || mes > 12) {
            console.log('Mês inválido:', req.params.mes);
            res.status(400).send('Mês inválido');
            return;
        }

        const startDate = new Date(new Date().getFullYear(), mes - 1);
        const endDate = new Date(new Date().getFullYear(), mes);

        const pontos = await Ponto.find({ data: { $gte: startDate, $lt: endDate } })
            .select('data entrada1 saida1 entrada2 saida2')
            .sort({ data: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(pontos);
    } catch (error) {
        console.log('Erro ao buscar pontos:', error);
        res.status(500).send('Erro ao buscar pontos');
    }
}

module.exports = getFilterByMes;
