import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../utils/mockApi'
import Skeleton from '../components/Skeleton'
import { useToast } from '../context/ToastContext'

const UsersPage = () => {
  const [users, setUsers] = useState(null)
  const { search } = useOutletContext()
  const { push } = useToast()

  useEffect(() => {
    api.getUsers().then((res) => setUsers(res.data)).catch((e) => push(e.message, 'error'))
  }, [])

  const filtered = useMemo(() => {
    if (!users) return []
    return users.filter((u) => [u.name, u.email, u.role].join(' ').toLowerCase().includes(search.toLowerCase()))
  }, [users, search])

  const toggleBlock = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u)))
    push('User status updated')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">User Management</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b dark:border-slate-700"><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {users
              ? filtered.map((u) => (
                  <tr key={u.id} className="border-b dark:border-slate-700">
                    <td className="py-2">{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td>
                    <td><button className="btn btn-primary" onClick={() => toggleBlock(u.id)}>{u.status === 'active' ? 'Block' : 'Unblock'}</button></td>
                  </tr>
                ))
              : Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan="5"><Skeleton className="my-2 h-8" /></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
