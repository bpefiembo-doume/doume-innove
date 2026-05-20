import { useState, useEffect } from 'react'
import { getProjets } from '../api'

export default function Admin({ onLogout }) {
  const [projets, setProjets] = useState([])
  const [onglet, setOnglet] = useState('projets')
  const [stats, setStats] = useState({ total: 0, financement: 0, finances: 0 })

  useEffect(() => {
    getProjets()
      .then(res => {
        const data = res.data
        setProjets(data)
        setStats({
          total: data.length,
          financement: data.filter(p => p.status === 'En recherche de financement').length,
          finances: data.filter(p => p.status === 'Finance').length,
        })
      })
      .catch(() => {})
  }, [])

  const approuver = (id) => {
    setProjets(projets.map(p => p.id === id ? { ...p, status: 'Finance' } : p))
  }

  const rejeter = (id) => {
    setProjets(projets.map(p => p.id === id ? { ...p, status: 'En recherche de financement' } : p))
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#F9FAFB', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ background: '#16A34A', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>🛡️ Admin — Doumé Innove</div>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
          Déconnexion
        </button>
      </header>

      {/* STATS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { label: 'Total Projets', value: stats.total, color: '#16A34A' },
          { label: 'En recherche', value: stats.financement, color: '#F97316' },
          { label: 'Financés', value: stats.finances, color: '#3B82F6' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ONGLETS */}
      <div style={{ display: 'flex', gap: 8, padding: '0 24px', maxWidth: 900, margin: '0 auto 24px' }}>
        <button onClick={() => setOnglet('projets')} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: onglet === 'projets' ? '#16A34A' : '#E5E7EB', color: onglet === 'projets' ? '#fff' : '#374151', fontWeight: 600, cursor: 'pointer' }}>
          📋 Projets
        </button>
      </div>

      {/* LISTE PROJETS */}
      {onglet === 'projets' && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 48px' }}>
          {projets.map(p => (
            <div key={p.id} style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>👤 {p.entrepreneur} — 📍 {p.location}</p>
                <span style={{ background: p.status === 'Finance' ? '#F0FDF4' : '#FFF7ED', color: p.status === 'Finance' ? '#16A34A' : '#F97316', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  {p.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => approuver(p.id)} style={{ background: '#16A34A', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  ✅ Approuver
                </button>
                <button onClick={() => rejeter(p.id)} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  ❌ Rejeter
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  )
}