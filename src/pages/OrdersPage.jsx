import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../utils/mockApi'
import { useToast } from '../context/ToastContext'

const statuses = ['pending', 'shipped', 'delivered', 'cancelled']

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const { search } = useOutletContext()
  const { push } = useToast()

  useEffect(() => {
    api.getOrders().then((res) => setOrders(res.data)).catch((e) => push(e.message, 'error'))
  }, [])

  const filtered = useMemo(() => orders.filter((o) => [o.id, o.user, o.status].join(' ').toLowerCase().includes(search.toLowerCase())), [orders, search])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b dark:border-slate-700"><th>ID</th><th>User</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="cursor-pointer border-b hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/30" onClick={() => setSelected(o)}>
                  <td className="py-2">{o.id}</td><td>{o.user}</td><td>${o.total}</td>
                  <td>
                    <select
                      className="input"
                      value={o.status}
                      onChange={(e) => {
                        setOrders((prev) => prev.map((item) => (item.id === o.id ? { ...item, status: e.target.value } : item)))
                        push('Order status updated')
                      }}
                    >
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Order Details</h3>
          {selected ? (
            <div className="space-y-1 text-sm">
              <p><strong>ID:</strong> {selected.id}</p>
              <p><strong>User:</strong> {selected.user}</p>
              <p><strong>Total:</strong> ${selected.total}</p>
              <p><strong>Date:</strong> {selected.date}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>
          ) : <p className="text-slate-500">Select an order to view details.</p>}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
