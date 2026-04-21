import { useEffect, useMemo, useState } from 'react'
import { api } from '../utils/mockApi'

const PaymentsPage = () => {
  const [txs, setTxs] = useState([])
  const [status, setStatus] = useState('all')

  useEffect(() => {
    api.getTransactions().then((res) => setTxs(res.data))
  }, [])

  const filtered = useMemo(() => txs.filter((tx) => status === 'all' || tx.status === status), [txs, status])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Payments & Transactions</h2>
      <div className="card flex items-center gap-2">
        <span className="text-sm">Filter:</span>
        <select className="input max-w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option><option value="success">Success</option><option value="pending">Pending</option>
        </select>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b dark:border-slate-700"><th>ID</th><th>Order</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-b dark:border-slate-700"><td className="py-2">{tx.id}</td><td>{tx.orderId}</td><td>${tx.amount}</td><td>{tx.method}</td><td>{tx.status}</td><td>{tx.date}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentsPage
