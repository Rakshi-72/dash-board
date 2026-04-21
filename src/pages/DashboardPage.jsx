import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { api } from '../utils/mockApi'
import { salesTrend } from '../data/mockData'
import Skeleton from '../components/Skeleton'
import { useToast } from '../context/ToastContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const DashboardPage = () => {
  const [stats, setStats] = useState(null)
  const { push } = useToast()

  useEffect(() => {
    Promise.all([api.getOrders(), api.getTransactions()])
      .then(([orders, transactions]) => {
        const revenue = transactions.data.reduce((sum, tx) => sum + tx.amount, 0)
        setStats({ sales: 128, orders: orders.data.length, revenue })
      })
      .catch((err) => push(err.message, 'error'))
  }, [])

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Sales', data: salesTrend, borderColor: '#4f46e5', backgroundColor: '#4f46e533', tension: 0.4 }],
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats
          ? [
              ['Sales', stats.sales],
              ['Orders', stats.orders],
              ['Revenue', `$${stats.revenue}`],
            ].map(([k, v]) => (
              <div key={k} className="card">
                <p className="text-sm text-slate-500">{k}</p>
                <p className="text-2xl font-bold">{v}</p>
              </div>
            ))
          : Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
      </div>
      <div className="card">
        <Line data={chartData} />
      </div>
    </div>
  )
}

export default DashboardPage
