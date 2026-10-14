import { PageScaffold } from '../components/layout/PageScaffold'
import { usePageMetadata } from '../hooks/usePageMetadata'

export default function LojasPage() {
  usePageMetadata('Lojas', 'Encontre uma unidade da Credvix perto de voce.')
  return (
    <PageScaffold
      eyebrow="Unidades"
      title="Nossas Lojas"
      description="Rota preparada para o layout aprovado e a futura consulta das lojas no Supabase."
    />
  )
}
