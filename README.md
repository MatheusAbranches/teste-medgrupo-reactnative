# Sistema de Gestão de Escolas
Aplicativo mobile para gerenciar escolas públicas e suas turmas.

## Versões Utilizadas
- Node.js: 18+
- Expo SDK: 54.0.23
- React Native: 0.81.5
- TypeScript: 5.9.2
- Gluestack UI: 1.1.73
- Expo Router: 6.0.14
- Zustand: 5.0.8
- MirageJS: 0.1.48

## Passos de instalação
- No terminal execute: npm install


## executar
- Para dar start no projeto: npm start
- Depois escaneie o QR code com o app Expo Go no celular

## Mock de Back-end
O mock inicia automaticamente quando você roda o app. Nao precisa configurar nada.
O MirageJS intercepta as requisições e simula uma API REST que ja vem com escolas e turmas cadastradas.

Endpoints:
- GET/POST/PUT/DELETE /api/schools
- GET/POST/PUT/DELETE /api/classes


## Funcionalidades

- Lista de escolas com busca
- Cadastrar/editar/deletar escola
- Ver turmas de cada escola
- Cadastrar/editar/deletar turma
- Cada turma tem nome, turno (Manhã/Tarde/Noite) e ano

