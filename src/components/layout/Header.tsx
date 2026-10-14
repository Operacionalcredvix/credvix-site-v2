import { NavLink } from 'react-router-dom'
import { navigation } from '../../app/navigation'

export function Header() {
  return (
    <header className="border-b border-stroke bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <NavLink
          to="/"
          aria-label="Credvix - pagina inicial"
          className="w-fit font-heading text-xl font-extrabold tracking-tight text-ink"
        >
          CRED<span className="text-action">VIX</span>
        </NavLink>
        <nav aria-label="Navegacao principal" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {navigation.map(({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `rounded-sm text-sm transition-colors hover:text-action ${
                  isActive ? 'font-bold text-action' : 'font-medium text-muted'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
