Peço desculpas pela falta de clareza. Aqui está o README completo com os trechos de código incorporados:

---

# Sistema de Registro de Ponto 🕒

Este é um sistema de registro de ponto desenvolvido em Node.js utilizando o framework Express e o banco de dados MongoDB com o auxílio da biblioteca mongoose. 💻📝

## Funcionalidades

- **Criação de Colaboradores**: Utiliza o método `createColaborador` para criar um novo colaborador no banco de dados MongoDB. Este método recebe uma matrícula e um nome como parâmetros e cria um novo documento na coleção de colaboradores.

```javascript
const Colaborador = require("../../models/ColaboradorSchema");

function createColaborador(colaboradorId,colaboradorNome){
    const colaborador = new Colaborador({
        matricula: colaboradorId,
        nome: colaboradorNome
    });
    colaborador.save().then(() => console.log(`Colaborador criado com id: ${colaboradorId} e nome ${colaboradorNome}!`));
}
module.exports = createColaborador;
```

- **Criação de Pontos**: Utiliza o método `createPonto` para registrar os pontos de um colaborador. Este método recebe a matrícula, nome, data do ponto, horas de entrada e saída, e horas trabalhadas como parâmetros. Ele cria um novo documento na coleção de pontos no banco de dados MongoDB.

```javascript
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
```

- **Recuperação de Pontos por Matrícula**: O método `getAllByMatricula` é responsável por recuperar os pontos de um colaborador com base em sua matrícula. Ele busca o colaborador correspondente no banco de dados e, em seguida, recupera todos os pontos associados a essa matrícula.

```javascript
const Colaborador = require('../../models/ColaboradorSchema');
const Ponto = require('../../models/PontoSchema');
const mongoose = require('mongoose');

async function getAllByMatricula(req, res) {
    try {
        // Código omitido
    } catch (error) {
        console.log('Erro ao buscar pontos:', error);
        res.status(500).send('Erro ao buscar pontos');
    }
}

module.exports = getAllByMatricula;
```

## Configuração do Banco de Dados

Para garantir uma busca eficiente de dados, é importante indexar os campos relevantes nas coleções do MongoDB. No código, estamos certificando que os campos `matricula` em `Colaborador` e `colaboradorMatricula` em `Ponto` estão indexados:

```javascript
// Certifique-se de que os campos 'matricula' e 'colaboradorMatricula' estão indexados
Colaborador.createIndexes({ matricula: 1 });
Ponto.createIndexes({ colaboradorMatricula: 1 });
```

### Instalação

1. Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.
2. Clone este repositório:

```bash
git clone https://github.com/baku01/Sistema-de-Registro-de-Ponto-Node.js.git
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
npm start
```

### Configuração do Banco de Dados

Para configurar o banco de dados, você pode utilizar o Docker Compose. Abaixo está um exemplo de arquivo `docker-compose.yml` para iniciar um contêiner MongoDB:

```yaml
version: '3'

services:
  db:
    container_name: Ponto_MONGO
    restart: always
    image: mongo:latest
    ports:
      - "27017:27017"
```

