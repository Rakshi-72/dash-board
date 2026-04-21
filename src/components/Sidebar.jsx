import { NavLink } from 'react-router-dom'

const links = [
  ['/', 'Dashboard'],
  ['/users', 'Users'],
  ['/products', 'Products'],
  ['/orders', 'Orders'],
  ['/payments', 'Payments'],
  ['/analytics', 'Analytics'],
  ['/settings', 'Settings'],
]

const Sidebar = () => (
  <aside className="w-full border-b border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 md:h-screen md:w-64 md:border-b-0 md:border-r">
    <h1 className="mb-3 text-xl font-bold text-indigo-600">AdminPro</h1>
    <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
      {links.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
)

export default Sidebar
