/**
 * Instalador incremental do banner final do Canal de Integridade.
 * Preserva todas as alteracoes ja feitas no CanalIntegridadePage.tsx,
 * incluindo o IntegrityTrackingSection criado e ajustado manualmente.
 * Execute uma vez na raiz do projeto: node aplicar-banner-integridade.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const page = resolve(process.cwd(), 'src/pages/CanalIntegridadePage.tsx')
const component = resolve(process.cwd(), 'src/components/integridade/IntegridadeCtaBanner.tsx')

if (!existsSync(page) || !existsSync(component)) {
  console.error('Execute este instalador na raiz do projeto credvix-site-v2, depois de extrair o ZIP.')
  process.exitCode = 1
} else {
  const current = readFileSync(page, 'utf8')
  const lineBreak = current.includes('\r\n') ? '\r\n' : '\n'
  const importLine = "import { IntegridadeCtaBanner } from '../components/integridade/IntegridadeCtaBanner'"

  if (current.includes('<IntegridadeCtaBanner')) {
    console.log('Banner ja esta instalado. Nenhuma alteracao necessaria.')
  } else {
    const fragments = [...current.matchAll(/^([ \t]*)<\/>[ \t]*$/gm)]
    if (fragments.length !== 1 || !current.includes('export default function CanalIntegridadePage')) {
      console.error('Formato da pagina diferente do esperado. Nenhuma alteracao foi feita.')
      console.error('Instalacao manual: importar IntegridadeCtaBanner e renderizar <IntegridadeCtaBanner /> apos <IntegrityTrackingSection />.')
      process.exitCode = 1
    } else {
      const closing = fragments[0][0]
      const indentation = fragments[0][1]
      const insertion = `${indentation}  <IntegridadeCtaBanner />${lineBreak}${closing}`
      let updated = current.replace(closing, insertion)
      if (!updated.includes(importLine)) updated = `${importLine}${lineBreak}${updated}`
      writeFileSync(page, updated, 'utf8')
      console.log('Banner incluido no CanalIntegridadePage.tsx depois das secoes existentes.')
      console.log('Nenhum outro componente, rota ou pagina foi alterado.')
    }
  }
}
