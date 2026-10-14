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

## Etapa 01 - Header (implementada)

A versao desta pasta inclui o **Header** baseado na referencia visual da Home em Figma:

- `src/components/layout/Header.tsx`: capsula branca, navegacao, CTA, menu adaptativo.
- `src/components/layout/SocialLinks.tsx`: SVGs de marcas para Instagram, Facebook e LinkedIn (Lucide nao fornece logos de marca); todo icone de interface continua em `lucide-react`.
- `public/brand/logo-credvix.svg` e `logo-help.svg`: os **SVGs originais fornecidos**, sem reconstrucoes.
- `src/app/navigation.ts`: menu com a ancora futura de Quem Somos e as paginas Lojas, Vagas e Canal de Integridade. (Solucoes foi removido a pedido.)
- `src/styles/globals.css`: mapeamento da cor amber do Design System para CTA.

**A Hero ainda nao foi implementada.** Os dois links de ancora terao seus destinos internos quando construirmos as secoes da Home. A pagina Home permanece como scaffold tecnico.

### Instalacao do Vite, Tailwind e bibliotecas

Tudo esta **declarado no `package.json`**, e a integracao oficial Vite/Tailwind v4 esta em `vite.config.ts` e `src/styles/globals.css`. Execute **na raiz do projeto**:

```bash
npm install
npm run dev
```

O comando `npm install` instala Vite, React, TypeScript, Tailwind CSS, @tailwindcss/vite, Lucide e as bibliotecas declaradas. **Nao e necessario rodar `npm create vite` novamente** porque este projeto ja possui o scaffold e a configuracao. Para verificar a versao:

```bash
npm ls vite tailwindcss @tailwindcss/vite react lucide-react
npm run typecheck
npm run build
```

Obs.: nao foi possivel rodar `npm install` no ambiente de entrega por indisponibilidade de rede DNS para o registro npm. Os arquivos e suas configuracoes foram revisados; execute os comandos acima localmente.

### Referencias usadas

- PNG da Home enviado no projeto (referencia, sem exigir pixel perfect).
- SVGs de Credvix e Help! enviados no projeto.
- Design System oficial desta etapa: `Credvix_Design_System_Proposta_v0.1.md` (confirmado pelo usuario).

## Etapa 01B - Ajustes do Header e CTA reutilizavel

- `src/components/ui/CtaButton.tsx`: CTA React reutilizavel, navegacao interna/externa ou botao de acao.
- `src/components/ui/CtaButton.module.css`: medidas do **Button.svg enviado**; elemento interativo em HTML/CSS, com icone Lucide.
- `src/components/layout/Header.tsx`: uso do novo `CtaButton` (sem componente local duplicado).
- `src/app/navigation.ts`: `Solucoes` removido do Header (desktop e mobile).
- `src/components/layout/SocialLinks.tsx`: icone do Facebook corrigido; o `f` aparece recortado dentro do circulo.

### Como reutilizar o CTA

```tsx
import { ArrowRight, Send } from 'lucide-react'
import { CtaButton } from './components/ui/CtaButton'

// Exato visual de referencia: texto, borda fina, circulo amber com seta.
<CtaButton to="/lojas" label="Encontrar uma loja" />

// Outra pagina, outro texto, outra cor de capsula e outro icone.
<CtaButton to="/vagas" label="Ver vagas" variant="orange" icon={ArrowRight} />

// Serve tambem como um botao real, inclusive para formularios.
<CtaButton type="submit" label="Enviar candidatura" variant="dark" icon={Send} />

// Cores completamente configuraveis (qualquer CSS color valido).
<CtaButton
  href="https://exemplo.com"
  label="Saiba mais"
  colors={{
    labelBackground: '#FFFFFF',
    labelText: '#171411',
    labelBorder: '#C94F08',
    circleBackground: '#C94F08',
    circleIcon: '#FFFFFF',
  }}
/>
```

**Medidas da referencia:** texto/capsula 163 x 48 px, circulo 48 x 48 px, total 211 x 48 px para a frase padrao. Botao em HTML/CSS, nao e uma imagem SVG. O icone interno e um SVG produzido pelo Lucide. `compact` mostra somente o circulo em espacos estreitos, mantendo o nome acessivel.

### Atualizacao do projeto com os ZIPs

- **Pacote completo:** ponto de partida para quem ainda nao criou o projeto local. Possui `package.json` (incluindo Vite e Tailwind) e todos os arquivos da V2.
- **Pacote patch:** para quem ja tem a V2 no computador. Extraia **dentro da raiz** de `credvix-site-v2/`, mantendo a mesma estrutura `src/`, e permita sobrescrever os arquivos de mesmo nome. Isso preserva o seu `.git`, `node_modules` e arquivos locais.
- O ZIP **nao instala nada automaticamente** e **nao envia ao GitHub**. `npm install` instala dependencias descritas no `package.json` (uma vez ou quando elas mudarem); `npm run dev` inicia servidor local.
- Ao aplicar o patch, como nenhuma dependencia foi adicionada, **nao e necessario repetir `npm install`**. Com o servidor Vite aberto, normalmente o navegador atualiza automaticamente (HMR).
- Para salvar no GitHub: `git status`, `git add .`, `git commit -m "feat: criar CTA reutilizavel e corrigir header"`, `git push`.

O Design System validado pelo usuario e o `Credvix_Design_System_Proposta_v0.1.md`; ele continua sendo a fonte de tokens desta V2.

## Etapa 02 — Hero da Home

- `src/components/home/Hero.tsx` — componente **exclusivo da Home**, com título, descrição, CTA compartilhado e legenda com `MapPin` do Lucide.
- `src/components/home/Hero.module.css` — tipografia Montserrat / Inter e layout desktop-first ajustável conforme largura e altura da viewport.
- `public/home/marca-modelo.svg` — **arte SVG original fornecida**, contendo a modelo e os elementos gráficos. Usada como imagem otimizada para prioridade visual da primeira dobra (sem recriar a marca em CSS).
- `src/pages/HomePage.tsx` — substitui o scaffold por `<Hero />`; as seções seguintes serão incluídas aqui nas próximas etapas.
- `src/components/ui/CtaButton.*` — adiciona a variante `amber`: botão preenchido em `#F99503` com texto/ícone `#171411`, mantendo todas as variantes anteriores.

**Header e Footer continuam em `src/components/layout/` e não foram alterados.**

O arquivo SVG é relativamente grande (~1,9 MB) porque contém uma imagem raster embutida. Foi preservado sem perdas para garantir fidelidade à marca. Antes da publicação definitiva, avaliar uma versão exportada mais leve e testada visualmente.

### Como aplicar esta etapa

Extraia o ZIP *patch* dentro da pasta local `credvix-site-v2/`, com a estrutura `src/` e `public/` e permita sobrescrever os arquivos correspondentes. Não é preciso reinstalar Vite, React ou Tailwind: não houve alterações nas dependências.

```bash
npm run dev
npm run typecheck
npm run build
```

O arquivo `package.json` continua declarando **Vite 7, React 19, TypeScript e Tailwind CSS 4**, e `vite.config.ts` continua registrando o plugin `@tailwindcss/vite`.
