import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../utils/mockApi'
import { useToast } from '../context/ToastContext'

const emptyProduct = { name: '', category: '', price: '', image: '' }

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const { search } = useOutletContext()
  const { push } = useToast()

  useEffect(() => {
    api.getProducts().then((res) => setProducts(res.data)).catch((e) => push(e.message, 'error'))
  }, [])

  const filtered = useMemo(() => products.filter((p) => [p.name, p.category].join(' ').toLowerCase().includes(search.toLowerCase())), [products, search])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.category) return push('Name and category are required', 'error')
    if (editingId) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price) } : p)))
      push('Product updated')
    } else {
      setProducts((prev) => [...prev, { id: Date.now(), ...form, price: Number(form.price || 0) }])
      push('Product added')
    }
    setForm(emptyProduct)
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Product Management</h2>
      <form onSubmit={submit} className="card grid gap-3 md:grid-cols-4">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="input" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button className="btn btn-primary md:col-span-4">{editingId ? 'Update' : 'Add'} Product</button>
        {form.image && <img src={form.image} alt="preview" className="h-28 w-28 rounded object-cover md:col-span-4" />}
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} className="mb-3 h-32 w-full rounded object-cover" />
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-slate-500">{p.category}</p>
            <p className="mb-3 font-bold">${p.price}</p>
            <div className="flex gap-2">
              <button className="btn bg-amber-100 hover:bg-amber-200" onClick={() => { setForm(p); setEditingId(p.id) }}>Edit</button>
              <button className="btn bg-rose-100 hover:bg-rose-200" onClick={() => { setProducts((prev) => prev.filter((x) => x.id !== p.id)); push('Product deleted') }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
