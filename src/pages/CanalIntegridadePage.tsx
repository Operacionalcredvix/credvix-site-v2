import { PageScaffold } from '../components/layout/PageScaffold'
import { usePageMetadata } from '../hooks/usePageMetadata'

export default function CanalIntegridadePage() {
  usePageMetadata('Canal de Integridade', 'Informacoes do canal de integridade da Credvix.')
  return (
    <PageScaffold
      eyebrow="Etica e transparencia"
      title="Canal de Integridade"
      description="Rota preparada. O canal real de recebimento, privacidade, anonimato e tratamento das manifestacoes sera definido antes da publicacao."
    />
  )
}
