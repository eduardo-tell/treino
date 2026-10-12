# openGym

Acompanhamento de treino que roda **só no navegador**. Sem servidor, sem conta. Os dados ficam neste aparelho (`localStorage` e IndexedDB).

Licença: [AGPL-3.0-or-later](LICENSE).

## Usar no GitHub Pages

O app já gera arquivos estáticos (`frontend/dist`). Depois de enviar o repositório:

1. No GitHub: **Settings → Pages**
2. Em **Build and deployment → Source**, escolha **GitHub Actions**
3. Faça um push para `main` (ou rode o workflow *Deploy to GitHub Pages* à mão)

O site fica em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

O repositório precisa ser **público** no plano gratuito do GitHub. Repositório privado exige GitHub Pro (ou superior).

## Rodar no computador

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173/`.

```bash
npm test
npm run build
npm run preview
```

## O que o app não faz

- Não sincroniza entre celulares/computadores (cada navegador tem a sua cópia)
- Não precisa de banco de dados na nuvem
- Imagens dos exercícios vêm de um CDN público (exercises-dataset)

Exporte um backup em **Configurações** de vez em quando.
