/**
 * Credvix V2 - bloqueia temporariamente a pagina de acompanhamento.
 * Edicao pontual e idempotente: App.tsx e IntegridadeCtaBanner.tsx.
 * Nao regrava outros componentes nem as alteracoes manuais no Canal.
 * Executar na raiz do projeto: node aplicar-bloqueio-acompanhamento.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const appPath = resolve(process.cwd(), 'src/app/App.tsx')
const bannerPath = resolve(process.cwd(), 'src/components/integridade/IntegridadeCtaBanner.tsx')
const blockedPath = '/canal-de-integridade/acompanhar'
const fallbackPath = '/canal-de-integridade'

function abort(message) {
  console.error(`Nao foi possivel aplicar com seguranca: ${message}`)
  process.exit(1)
}

if (!existsSync(appPath) || !existsSync(bannerPath)) {
  abort('arquivos App.tsx ou IntegridadeCtaBanner.tsx nao encontrados. Execute na raiz de credvix-site-v2.')
}

const app = readFileSync(appPath, 'utf8')
const banner = readFileSync(bannerPath, 'utf8')
const appNL = app.includes('\r\n') ? '\r\n' : '\n'
const bannerNL = banner.includes('\r\n') ? '\r\n' : '\n'

if (!/\bNavigate\b/.test(app) || !app.includes('path="/canal-de-integridade"')) {
  abort('roteador diferente do esperado; nenhum arquivo foi alterado.')
}

const buttonRe = /<CtaButton\b[\s\S]*?\/>/g
const existingButtons = [...banner.matchAll(buttonRe)]
let newBanner = banner
const targetButtons = existingButtons.filter(match => match[0].includes(`to="${blockedPath}"`))
if (targetButtons.length > 1) abort('mais de um CTA usa a rota; revise manualmente.')
if (targetButtons.length === 1) {
  const original = targetButtons[0][0]
  const updated = original.replace(
    `to="${blockedPath}"`,
    `type="button"${bannerNL}              disabled`,
  )
  newBanner = banner.replace(original, updated)
} else if (!existingButtons.some(match => /\bdisabled\b/.test(match[0]) && match[0].includes('label="Acompanhar relato"'))) {
  abort('nao encontrei o CTA esperado; nenhum arquivo foi alterado.')
}

let newApp = app
const lines = app.split(/\r?\n/)
const directRoutes = lines
  .map((line, i) => ({ line, i }))
  .filter(item => /\bpath=(['"])\/canal-de-integridade\/acompanhar\1/.test(item.line))

if (directRoutes.length > 1) abort('foram encontradas varias rotas de acompanhamento; revise manualmente.')

if (directRoutes.length === 0) {
  const marker = lines.findIndex(line => line.includes('path="/canal-de-integridade"'))
  if (marker === -1) abort('nao encontrei a rota principal do Canal.')
  const prefix = lines[marker].match(/^\s*/)[0]
  lines.splice(marker + 1, 0,
    `${prefix}{/* Acompanhamento desativado temporariamente. */}`,
    `${prefix}<Route path="${blockedPath}" element={<Navigate to="${fallbackPath}" replace />} />`,
  )
  newApp = lines.join(appNL)
} else {
  const { line, i } = directRoutes[0]
  if (line.includes(`<Navigate to="${fallbackPath}" replace />`)) {
    // Ja bloqueada: nao fazer nada.
  } else {
    if (!line.includes('<Route') || !line.includes('/>')) {
      abort('a rota existente nao esta em uma linha simples; nenhum arquivo foi alterado.')
    }
    const match = line.match(/element=\{<([A-Za-z_$][\w$]*)\s*\/>\}/)
    if (!match) abort('a rota existente nao usa o formato esperado; nenhum arquivo foi alterado.')
    const oldComponent = match[1]
    const indent = line.match(/^\s*/)[0]
    lines[i] = `${indent}<Route path="${blockedPath}" element={<Navigate to="${fallbackPath}" replace />} />`
    // Se a pagina antiga foi importada somente por essa rota, retire o import nao usado.
    const candidateRe = new RegExp(`^\\s*(?:const\\s+${oldComponent}\\s*=\\s*lazy\\([^\\n]+|import\\s+${oldComponent}\\s+from\\s+[^\\n]+)\\r?\\n?`, 'gm')
    let resulting = lines.join(appNL)
    if (!new RegExp(`\\b${oldComponent}\\b`).test(resulting)) {
      resulting = resulting.replace(candidateRe, '')
    }
    newApp = resulting
  }
}

// So grava depois de TODAS as verificacoes para evitar estado parcial por incompatibilidade.
if (newApp !== app) writeFileSync(appPath, newApp, 'utf8')
if (newBanner !== banner) writeFileSync(bannerPath, newBanner, 'utf8')
console.log('OK: /canal-de-integridade/acompanhar redireciona para /canal-de-integridade.')
console.log('OK: CTA "Acompanhar relato" continua visivel, mas esta desativado.')
console.log('Arquivos avaliados: src/app/App.tsx e src/components/integridade/IntegridadeCtaBanner.tsx')
