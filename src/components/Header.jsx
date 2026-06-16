import { Search } from 'lucide-react'

export default function Header({ searchQuery, setSearchQuery }) {
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
            placeholder="Search anything here..."
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 13.5,
              color: '#6B7280', background: 'transparent',
            }}
          />
          <Search size={17} color="#9CA3AF" />
        </div>
      </div>
    </div>
  )
}
