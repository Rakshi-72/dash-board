import { useState } from 'react'
import { useToast } from '../context/ToastContext'

const SettingsPage = () => {
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@mail.com' })
  const [password, setPassword] = useState({ current: '', next: '' })
  const { push } = useToast()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <form className="card space-y-3" onSubmit={(e) => { e.preventDefault(); push('Profile updated') }}>
          <h3 className="font-semibold">Profile</h3>
          <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input className="input" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <button className="btn btn-primary">Save Profile</button>
        </form>

        <form className="card space-y-3" onSubmit={(e) => { e.preventDefault(); push('Password changed') }}>
          <h3 className="font-semibold">Password</h3>
          <input className="input" type="password" placeholder="Current password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
          <input className="input" type="password" placeholder="New password" value={password.next} onChange={(e) => setPassword({ ...password, next: e.target.value })} />
          <button className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
