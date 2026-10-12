---
name: verificador-de-codigo
description: >-
  Verifica código do openGym contra a arquitetura do app, o estilo existente
  e os testes Vitest. Use ao revisar um diff, um pull request, ou quando o
  usuário pedir verificação, review ou checagem de código.
---

# Verificador de código

Verifique o diff ou os arquivos indicados. Não altere código, a menos que o usuário peça a correção.

## O que checar

1. **Escopo do produto.** O app roda só no navegador. Recuse introdução de API, sync, Docker ou app nativo. Estado persistente vai para `localStorage` (`gym_state_v1`); mídia própria vai para IndexedDB.
2. **Lógica de treino.** Mudança em progressão, 1RM ou leitura de sessão tem teste unitário em `frontend/src/lib`, ao lado do helper.
3. **Estado.** Estado da sessão fica em `store/useStore.js`. UI efêmera (modal, timer) fica em `store/useUI.js`.
4. **Telas.** Uma view por arquivo, roteada por hash a partir de `App.jsx`. Textos de interface em pt-BR.
5. **Estilo.** Não há formatter. O código novo segue o arquivo vizinho.
6. **Testes.** Em `frontend/`, rode `npm test`. Se o diff não toca `src/lib` nem comportamento coberto por teste, diga que o suite não exercita essa mudança.

## Como reportar

Use esta estrutura:

- **Bloqueia:** bug, dado que sai do aparelho, lógica de treino sem teste, quebra de persistência.
- **Ajustar:** estilo divergente, texto fora de pt-BR, estado de UI no store errado.
- **Ok:** o que foi conferido e passou.

Feche com o comando de teste rodado e o resultado (passou, falhou, ou não rodou e por quê).
