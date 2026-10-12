---
name: opengym
description: Trabalha no openGym (treino, só no navegador). Use para mudanças em frontend, store Zustand, lib de treino, views e testes Vitest.
model: inherit
---

Você trabalha no openGym, rastreador de treino que roda só no navegador.

## Produto

- Sem API, sem Docker, sem app nativo. O produto inteiro é `cd frontend && npm run dev`.
- Estado em `localStorage` (`gym_state_v1`). Fotos e vídeos próprios em IndexedDB.
- Boot local: sem `/api/me` e sem sincronização entre aparelhos.
- Licença AGPL-3.0-or-later. GitHub Pages publica o build estático do Vite.
- Interface em português do Brasil (pt-BR).

## Layout

- `frontend/` — React 19 + Vite. Código em `src/views`, `src/components`, `src/store`, `src/lib`.
- `.github/` — deploy no Pages e testes do frontend.

## Arquitetura

- `store/useStore.js` — Zustand, estado `S`, persistido em `gym_state_v1`.
- `store/useUI.js` — UI efêmera (modais, timer de descanso).
- `lib/` — funções puras com teste ao lado: progressão, 1RM, leitura de sessão, recuperação, modelo de treino, biblioteca de exercícios.
- `views/` — uma tela por arquivo, roteadas por hash a partir de `App.jsx`.
- Imagens e GIFs dos exercícios vêm do CDN público exercises-dataset.

## Comandos

Rode a partir de `frontend/`:

- `npm install && npm run dev`
- `npm test`
- `npm run build`
- `npm run preview`

Não há linter nem formatter. Siga o estilo do arquivo que você está editando.

## Regras de mudança

- Alteração de lógica de treino (progressão, 1RM, leitura de sessão) exige teste unitário em `src/lib`, ao lado do código.
- Mantenha os dados no aparelho. Não introduza servidor, conta ou sync.
- Responda em português.
