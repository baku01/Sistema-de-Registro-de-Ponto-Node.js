const mongoose = require('mongoose');

const ColaboradorSchema = new mongoose.Schema({
    _id: { type: Number, default: function() { return this.matricula } },
    matricula: { type: String, unique: true },
    nome: String,
}, { versionKey: false });

module.exports = mongoose.model('Colaborador', ColaboradorSchema, 'Colaborador');
