# Api Mini Loteria

### Objetivo

Demonstrar meu nível de conhecimentos nas seguintes tecnologias e padrões:
* Git
* Docker
* Node JS
* Teste Unitário
* OO
* Boas práticas
* Clean Code

## Contexto Geral
* Criar uma API que gere um bilhete premiado. Os números deste bilhete serão dezenas onde o usuário deverá informar a quantidade
* Cada número não pode ser sorteado mais de uma vez e eles devem estar em ordem crescente.
* Também Será disposta uma tabela html para exibição dos números sorteados
* Não será utilizado nenhum Framework exceto para os testes


## O que o código faz
* Gera bilhetes de acordo com a quantidade e dezenas escolhidas pelo usuário 
* Busca todos os bilhetes já gerados
* Busca um bilhete específico
* Realiza o sorteio dos bilhetes gerados para a premiação
* Reinicia a premiação

## O que o código não faz
* Armazenar informações em banco de dados
* Dispor uma interface administrativa para consumir as rotas da API
* Deletar um bilhete específico
* E diversos...


## Orientações

⚠️É necessário ter o docker engine e docker-compose instalado na máquina

Baixar este repositório e executar os seguintes comandos na pasta raiz:

* docker-compose build
* docker-compose up -d

## Informações

* ⚠️Por se tratar de uma API as requisições serão feitas través do POSTMAN ou Insomnia
* ⚠️Foram criados 2 containers docker para isolar a API do "front" (onde será exibido a tabela html)

## API
- Rotas:
  * [GET] /bilhete -> Mostra todos os bilhetes gerados
  * [GET] /bilhete/:id -> Mostra um bilhete específico por ID
  * [POST] /bilhete | {"dezenas":"","quantidade":""} -> Grava bilhetes
  * [POST] /premiacao -> Realiza o sorteio para escolher um bilhete premiado
  * [POST] /RESTART -> Reinicia a Premiação
  * 
- Validações: 
  * Quantidade de bilhetes a serem gerados é obrigatório
  * Quantidade de dezenas a serem geradas é obrigatória
  * Limite de bilhete 50
  * Dezenas entre 6 e 10

### Testes Unitários
- Para rodar os testes, deverá executar o comando **npm test** na raiz do projeto
- Foram criados os seguintes casos de testes:
  * Insere bilhetes
  * Busca de bilhetes
  * Busca bilhete por ID
  * Realiza Premiação

⚠️ Tecnologia utilizada para os testes: **Jest**

## Contextos
* [Front]-> http://localhost:8000/
* [Back]-> http://localhost:3000/
