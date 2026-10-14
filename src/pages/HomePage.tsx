import { Link } from 'react-router-dom'
import { PageScaffold } from '../components/layout/PageScaffold'
import { usePageMetadata } from '../hooks/usePageMetadata'

export default function HomePage() {
  usePageMetadata('Home', 'Conheca a Credvix e encontre nossas unidades e oportunidades.')

  return (
    <PageScaffold
      eyebrow="Credvix V2"
      title="Home"
      description="Pagina institucional inicial. O design definitivo sera implementado a partir do material aprovado."
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/lojas" className="inline-flex min-h-11 items-center rounded-xl bg-action px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
          Ver lojas
        </Link>
        <Link to="/vagas" className="inline-flex min-h-11 items-center rounded-xl border border-stroke bg-surface px-5 py-3 text-sm font-semibold text-ink hover:border-action">
          Ver vagas
        </Link>
      </div>
    </PageScaffold>
  )
}
