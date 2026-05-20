import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === 'admin@doumeinnove.cm' && password === 'Admin2025!') {
      localStorage.setItem('isAdmin', 'true')
      onLogin()
    } else {
      setErreur('Email ou mot de passe incorrect !')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 48, width: 400, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔐</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>Espace Admin</h1>
          <p style={{ color: '#6B7280', fontSize: 14 }}>Doumé Innove — Accès réservé</p>
        </div>
        {erreur && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: 12, marginBottom: 16, color: '#DC2626', fontSize: 14 }}>
            {erreur}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
              placeholder="admin@doumeinnove.cm"
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" style={{ width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}