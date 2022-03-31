# Atividade 2 - 
A busca por livros

## Back-End

Passos para executar:

criar o arquivo .env

DB_USER=(usuario do banco)
DB_PASS=(a senha do banco)
SECRET=(senha para o jwt)

alterar linha 170 do app.js com o seu mongoDB Atlas

### `npm install`

### `npm start`

## Api-Gateway

Passos para executar:

### `npm install`

config oauth2

OAuth2 client
This module comes with an OAuth2 client that allows you to retrieve an access token, refresh it, and retry the request seamlessly. The basics of Google's OAuth2 implementation is explained on Google Authorization and Authentication documentation.

In the following examples, you may need a CLIENT_ID, CLIENT_SECRET and REDIRECT_URL. You can find these pieces of information by going to the Developer Console, clicking your project --> APIs & auth --> credentials.

Navigate to the Cloud Console and Create a new OAuth2 Client Id
Select Web Application for the application type
Add an authorized redirect URI with the value http://localhost:10000/oauth2callback (or applicable value for your scenario)
Click Create, and Ok on the following screen
Click the Download icon next to your newly created OAuth2 Client Id

Coloque o arquivo no api-gateway, renomeando ele para oauth2.keys.json

No Console na parte de tela de permissão OAuth
    tipo de usuario
        Externo
    usuarios de teste
        adicionar email do usuario que vai testar a aplicação

### `npm start`

Vai aparecer no navegador, e para logar com a conta que do usuario de teste, depois de aceitar estã pronto para uso a aplicação.

## Cliente

Passos para executar:

### `yarn`

### `yarn start`