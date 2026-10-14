# Credvix Site V2

Rebuild independente do site institucional Credvix em **Vite + React + TypeScript + Tailwind CSS v4**.

## Pre-requisitos

- Node.js 22.12+ (recomendado Node 22 LTS ou superior compativel com o Vite 7)
- npm
- Git

## Executar localmente

```bash
npm install
npm run dev
```

Acesse a URL informada pelo Vite (normalmente `http://localhost:5173`).

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

O build final e gerado em `dist/`.

## Rotas

- `/` - Home
- `/lojas` - Lojas
- `/vagas` - Vagas
- `/canal-de-integridade` - Canal de Integridade

Rotas antigas `/index.html`, `/lojas.html` e `/vagas.html` tem redirecionamento no React **mas ainda nao redirecionamento HTTP 301**, a preparar antes de lancamento.

## Estrutura

```text
src/
  app/            # Rotas, navegacao e providers
  components/
    layout/        # Header, Footer, Layout e scaffold
  hooks/           # Hooks compartilhados
  pages/           # Home, Lojas, Vagas, Integridade, NotFound
  styles/          # Design tokens e estilos globais
public/
  .htaccess        # Rewrite de SPA para Hostinger/Apache
```

## Bibliotecas ja declaradas

- React + TypeScript
- Tailwind CSS v4 / `@tailwindcss/vite`
- React Router DOM
- TanStack Query
- React Hook Form + Zod + `@hookform/resolvers`
- Lucide React
- Rotas lazy + Suspense (exceto Home, carregada imediatamente)

## Tokens

Valores centrais em `src/styles/globals.css`, baseados no documento `Credvix_Design_System_Proposta_v0.1.md`. A identidade institucional ainda depende de validacao. O starter evita layouts inventados: as quatro paginas sao scaffolds aguardando os designs aprovados.

## Supabase

O site legado utiliza tabelas `public.lojas`, `public.vagas`, `public.candidatos`, `public.auditoria` e storage de curriculos, conforme README existente. Nesta V2, nenhuma operacao de banco esta ativa ainda. **Nao copie credenciais antigas para o repositorio nem use chave `service_role` no navegador.** Antes de integrar, validar schema real, politicas RLS, permissao publica e fluxo de upload.

## GitHub: novo repositorio

1. Crie o repo **vazio** `credvix-site-v2` na conta/organizacao desejada, sem README, sem gitignore e sem licenca automatica.
2. Dentro desta pasta execute:

```bash
git init
git add .
git commit -m "chore: iniciar Credvix V2 com Vite React TS e Tailwind"
git branch -M main
git remote add origin https://github.com/Operacionalcredvix/credvix-site-v2.git
git push -u origin main
```

Se o repositorio for criado em outra conta, atualize o remoto.

## Hospedagem Hostinger (somente quando a V2 estiver pronta)

- Mantenha a V1 no ar durante todo o desenvolvimento.
- Faca backup dos arquivos e das configuracoes atuais de `public_html`.
- Gere `npm run build`.
- Envie **o conteudo da pasta `dist/`** (nao a pasta inteira) para a raiz correta da hospedagem.
- Confirme que `.htaccess` esta presente na pasta de destino e que Apache permite `mod_rewrite`.
- Antes de substituir o site, prepare redirecionamentos 301 HTTP, `sitemap.xml`, robots, canonical, metadados por pagina, SEO com HTML prerenderizado/SSR se necessario, preservacao das URLs anteriores (`farol.html`, outras), testes de formularios e plano de rollback.

## Status atual

- [x] Estrutura Vite + React + TS + Tailwind v4 configurada
- [x] Quatro rotas + pagina 404
- [x] Code splitting e Suspense
- [x] Providers / TanStack Query
- [x] Tokens iniciais do Design System
- [x] Rewrite SPA para Hostinger
- [ ] Layout aprovado de cada pagina
- [ ] Integracao de lojas e vagas via Supabase
- [ ] Candidaturas e upload (validacao de ponta a ponta)
- [ ] Canal de Integridade real e confiavel
- [ ] QA, acessibilidade, SEO e redirecionamentos antes do lancamento

> O ambiente de preparacao deste pacote nao tinha acesso ao registry.npmjs.org. Portanto `npm install`, `tsc` e `vite build` nao puderam ser executados aqui. Execute localmente para verificar o build antes de integrar os designs.
