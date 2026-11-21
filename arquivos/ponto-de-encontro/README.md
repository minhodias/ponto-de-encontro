# Ponto de Encontro — Chat em Tempo Real

Aplicação de chat com identidade visual própria, salas temáticas e troca instantânea de mensagens. Desenvolvida com Node.js, Express e WebSockets (`ws`), com histórico persistido em arquivo JSON.

## Funcionalidades
- Vários usuários conectados simultaneamente.
- Mensagens em tempo real via WebSocket.
- Quatro salas: Café, Estudos, Ideias e Livre.
- Nome de exibição escolhido pelo usuário.
- Histórico por sala salvo em `data/messages.json`.
- Interface responsiva para computador e celular.

## Requisitos
- Node.js 18 ou superior.
- npm.

## Instalação
1. Baixe ou clone o repositório.
2. Abra o terminal na pasta do projeto.
3. Instale as dependências:

```bash
npm install
```

## Executar o servidor

```bash
npm start
```

Acesse **http://localhost:3000** no navegador. Para testar vários usuários, abra o endereço em duas ou mais abas ou navegadores e entre com nomes diferentes.

Para desenvolvimento, use `npm run dev`.

## Estrutura
```text
ponto-de-encontro/
├── data/messages.json
├── public/ (index.html, styles.css, app.js)
├── src/storage.js
├── package.json
├── server.js
└── README.md
```

## Publicar no GitHub
Crie um repositório público chamado `ponto-de-encontro`. Dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Cria chat Ponto de Encontro"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ponto-de-encontro.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário do GitHub.

## Observação
O arquivo JSON atende ao objetivo didático e a testes pequenos. Para produção ou muitos usuários simultâneos, recomenda-se um banco de dados e uma estratégia de gravação mais robusta.
