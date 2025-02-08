# Amigo Secreto

## Descrição do Projeto

O projeto Amigo Secreto é um sorteador online que permite aos usuários criar grupos para sorteios de amigo secreto, como "Família", "Faculdade", etc. Dentro de cada grupo, é possível adicionar os nomes e emails dos participantes, além de escolher uma data para o sorteio. Uma funcionalidade interessante é que cada usuário pode cadastrar itens que gostaria de receber como presente.

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **NestJS:** Framework para construção de aplicações backend escaláveis e robustas em Node.js.
- **TypeORM:** ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a qualidade do código.

## Instalação

Para instalar o projeto, siga os seguintes passos:

1.  Clone o repositório para sua máquina local:

    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://www.google.com/search?q=https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
    ```

2.  Acesse o diretório do projeto:

    ```bash
    cd NOME_DO_REPOSITORIO
    ```

3.  Instale as dependências do projeto:

    ```bash
    npm install
    ```

4.  Crie um arquivo `.env` na raiz do projeto e preencha as variáveis de ambiente listadas no arquivo `.env.example`.

5.  Configure o banco de dados:

    - O projeto foi construído para utilizar um banco de dados PostgreSQL. Caso deseje utilizar outro banco de dados, você precisará alterar o arquivo `data-source.ts`, no parâmetro `type`, preenchendo com o tipo de banco desejado (ex: `mysql`, `sqlite`, etc.).

## Uso

Para executar o projeto, siga os seguintes passos:

1.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run start:dev
    ```

2.  Acesse a documentação da API:

    - Acesse a URL `http://localhost:3000/api#/` no seu navegador. Essa rota foi construída utilizando o Swagger, que permite visualizar e testar as requisições da API de forma interativa.

## Licença

Este projeto está sob a licença [MIT](LICENSE).

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TypeORM CLI

```bash
# create migration
> npm run typeorm migration:create ./src/migrations/CreateGroupsTable

# revert migration
> npm run typeorm migration:revert --dataSource ./src/data-source.ts


```
