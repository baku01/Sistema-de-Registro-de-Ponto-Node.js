const mongoose = require('mongoose');

const PontoSchema = new mongoose.Schema({
    colaboradorMatricula: Number,
    data: { type: Date, default: new Date().setHours(0,0,0,0) },
    entrada1: { type: Date, default: new Date().setHours(0,0,0,0) },
    saida1: { type: Date, default: new Date().setHours(0,0,0,0) },
    entrada2: { type: Date, default: new Date().setHours(0,0,0,0) },
    saida2: { type: Date, default: new Date().setHours(0,0,0,0) },
    entrada3: { type: Date, default: new Date().setHours(0,0,0,0) },
    saida3: { type: Date, default: new Date().setHours(0,0,0,0) },
    entrada4: { type: Date, default: new Date().setHours(0,0,0,0) },
    saida4: { type: Date, default: new Date().setHours(0,0,0,0) },
    entrada5: { type: Date, default: new Date().setHours(0,0,0,0) },
    saida5: { type: Date, default: new Date().setHours(0,0,0,0) },
    horasTrabalhadas: Number,
}, { versionKey: false });

PontoSchema.pre('save', function(next) {
    this.horasTrabalhadas = 0;

    if (this.entrada1 && this.saida1) {
        this.horasTrabalhadas += (this.saida1 - this.entrada1);
    }
    if (this.entrada2 && this.saida2) {
        this.horasTrabalhadas += (this.saida2 - this.entrada2);
    }
    if (this.entrada3 && this.saida3) {
        this.horasTrabalhadas += (this.saida3 - this.entrada3);
    }
    if (this.entrada4 && this.saida4) {
        this.horasTrabalhadas += (this.saida4 - this.entrada4);
    }
    if (this.entrada5 && this.saida5) {
        this.horasTrabalhadas += (this.saida5 - this.entrada5);
    }

    // Convertendo milissegundos para horas
    this.horasTrabalhadas = Math.round(this.horasTrabalhadas / (1000 * 60 * 60));

    next();
});

module.exports = mongoose.model('Ponto', PontoSchema, 'Ponto');
