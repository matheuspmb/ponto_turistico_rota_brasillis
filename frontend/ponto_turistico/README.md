# Ponto Turistico Rota Brasillis

Este projeto é uma aplicação web desenvolvida com **React** no frontend e **ASP.NET** com **C#** no backend. O objetivo é fornecer informações sobre pontos turísticos, permitindo que o usuário busque, visualize e cadastre novos pontos turísticos.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter os seguintes programas instalados no seu computador:

1. **Node.js** (versão 14 ou superior): Para rodar o frontend em React.
   - [Download Node.js](https://nodejs.org/)
   
2. **.NET SDK** (versão 6 ou superior): Para rodar o backend em ASP.NET.
   - [Download .NET SDK](https://dotnet.microsoft.com/download)

3. **SQL Server** 
   - Para armazenamento de dados do ponto turístico (se o banco de dados for local).

## Instalação

# 1. Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/matheuspmb/ponto_turistico_rota_brasillis
cd ponto_turistico_rota_brasillis

## Instalar as dependências do frontend
Acesse a pasta do frontend (onde está o código React) e instale as dependências necessárias:

cd frontend
npm install

## Instalar as dependências do backend:
Acesse a pasta do backend (onde está o código ASP.NET) e restaure as dependências:

cd backend
dotnet restore  

## Configuração do banco de dados:

O projeto utiliza banco de dados (SQL Server), siga os passos abaixo para configurar:

Crie um banco de dados no seu servidor.
Altere a string de conexão no arquivo appsettings.json do backend para corresponder ao seu ambiente.

Se necessário, execute as migrações para configurar o banco:

dotnet ef database update

## Rodar o projeto:

##Frontend: Para rodar o frontend, no diretório frontend execute:

npm start

Isso iniciará o servidor de desenvolvimento do React na URL http://localhost:3000

## Backend: Para rodar o backend, no diretório backend execute:

dotnet run

Isso iniciará o servidor backend ASP.NET C# na URL https://localhost:5001

## Funcionalidades
Cadastro de ponto turístico: O usuário pode cadastrar um novo ponto turístico informando nome, descrição, localização, e referência.
Busca de pontos turísticos: O usuário pode buscar por pontos turísticos de acordo com a localização ou nome.
Exibição de detalhes: Ao clicar em um ponto turístico, o usuário pode ver mais detalhes sobre o local.

## Estrutura de pastas
frontend/: Contém o código React para a interface do usuário.
backend/: Contém o código ASP.NET para o servidor e a API.
README.md: Este arquivo.

## Tecnologias utilizadas

# Frontend:
React.js
CSS Modules
Axios (para requisições HTTP)

# Backend:
ASP.NET Core (C#)
Entity Framework Core
SQL Server