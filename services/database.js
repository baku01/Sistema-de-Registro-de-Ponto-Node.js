const mongoose= require('mongoose');


//Cria e exporta conexão com o banco de dados
function connectDB() {
    mongoose.connect('mongodb://localhost:27017/RH', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(r => console.log('Conectado ao MongoDB!'));
}

module.exports = connectDB;
