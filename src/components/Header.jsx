import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

const Header = ({ onSearch, onToggleTheme, dark }) => {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input)

  useEffect(() => {
    onSearch?.(debounced)
  }, [debounced, onSearch])

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <input
        className="input"
        placeholder="Global search users, products, orders..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600" onClick={onToggleTheme}>
        {dark ? 'Light' : 'Dark'}
      </button>
    </header>
  )
}

export default Header
