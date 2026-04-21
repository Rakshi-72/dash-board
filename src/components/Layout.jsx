import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  const [search, setSearch] = useState('')
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('last-page', location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === '/') {
      const last = localStorage.getItem('last-page')
      if (last && last !== '/') navigate(last)
    }
  }, [])

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1">
        <Header onSearch={setSearch} onToggleTheme={() => setDark((x) => !x)} dark={dark} />
        <div className="p-4">
          <Outlet context={{ search }} />
        </div>
      </main>
    </div>
  )
}

export default Layout
