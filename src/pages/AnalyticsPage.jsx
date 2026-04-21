import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { revenueByCategory, salesTrend } from '../data/mockData'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const AnalyticsPage = () => {
  const [range, setRange] = useState('7d')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <select className="input max-w-32" value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="7d">Last 7d</option>
          <option value="30d">Last 30d</option>
          <option value="90d">Last 90d</option>
        </select>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card"><Bar data={{ labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], datasets: [{ label: `Sales (${range})`, data: salesTrend, backgroundColor: '#6366f1' }] }} /></div>
        <div className="card"><Doughnut data={{ labels: ['Electronics', 'Furniture', 'Wearables', 'Other'], datasets: [{ data: revenueByCategory, backgroundColor: ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981'] }] }} /></div>
      </div>
    </div>
  )
}

export default AnalyticsPage
