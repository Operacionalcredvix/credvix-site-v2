import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-stroke bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Credvix.</p>
        <Link className="w-fit hover:text-action" to="/canal-de-integridade">
          Canal de Integridade
        </Link>
      </div>
    </footer>
  )
}
