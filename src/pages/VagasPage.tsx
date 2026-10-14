import { PageScaffold } from '../components/layout/PageScaffold'
import { usePageMetadata } from '../hooks/usePageMetadata'

export default function VagasPage() {
  usePageMetadata('Vagas', 'Confira oportunidades de carreira na Credvix.')
  return (
    <PageScaffold
      eyebrow="Carreiras"
      title="Vagas"
      description="Rota preparada para vagas e candidaturas; o envio de curriculos so sera ativado apos validar o fluxo e o armazenamento."
    />
  )
}
