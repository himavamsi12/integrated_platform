import { useState } from 'react'
import { Search, Bell, X } from 'lucide-react'

const notifications = [
  { text: 'Revenue collection at 89.09% of FY 2025-26 target as of 31-Jan-2026.', tone: '#F59E0B' },
  { text: 'Electronic City RTO reported the highest duplicate permits in Bangalore City division.', tone: '#F87171' },
  { text: 'EV registrations crossed 1.73 lakh units in 2024-25, up ~24x since 2019-20.', tone: '#34D399' },
  { text: '15+ year old vehicle count in Karnataka has crossed 1.04 crore.', tone: '#7C3AED' },
]

export default function Header({ searchQuery, setSearchQuery, setActivePage }) {
  const [showNotifs, setShowNotifs] = useState(false)

  return (
    <div style={{
      height: 68, background: '#EDEEF8', display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 24, borderBottom: '1px solid #E5E7EB',
      flexShrink: 0,
    }}>
      <h1 style={{
        fontSize: 26, fontWeight: 700, color: '#4C1D95', letterSpacing: '-0.5px',
        whiteSpace: 'nowrap',
      }}>
        Dashboard
      </h1>

      <div style={{ flex: 1, maxWidth: 420 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'white', borderRadius: 24, padding: '9px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search modules — e.g. permits, revenue, EV..."
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 13.5,
              color: '#6B7280', background: 'transparent',
            }}
          />
          {searchQuery ? (
            <X size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
          ) : (
            <Search size={17} color="#9CA3AF" />
          )}
        </div>
      </div>

      <div style={{ marginLeft: 'auto', position: 'relative' }}>
        <button
          onClick={() => setShowNotifs(v => !v)}
          style={{
            width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}
        >
          <Bell size={17} color="#6B7280" />
          <span style={{
            position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: '50%',
            background: '#EF4444', border: '1.5px solid white',
          }} />
        </button>

        {showNotifs && (
          <div style={{
            position: 'absolute', top: 46, right: 0, width: 300, background: 'white',
            borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 50, overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
              Insights & Alerts
            </div>
            {notifications.map((n, i) => (
              <div key={i} style={{ padding: '10px 16px', borderTop: i > 0 ? '1px solid #F9FAFB' : 'none', display: 'flex', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: n.tone, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>{n.text}</span>
              </div>
            ))}
            <button
              onClick={() => { setActivePage?.('overview'); setShowNotifs(false) }}
              style={{
                width: '100%', padding: '10px', border: 'none', borderTop: '1px solid #F3F4F6',
                background: '#FAFAFA', color: '#7C3AED', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              }}
            >
              View Overview Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
