import { Home, FileText, Layers, ClipboardList, TrendingUp, Shield, Car, MoreVertical } from 'lucide-react'

const navItems = [
  { id: 'automated-testing', label: 'Automated Testing Station', icon: Home },
  { id: 'driving-license', label: 'Driving License', icon: FileText },
  { id: 'enforcement', label: 'Enforcement & Compliance Dashboard', icon: ClipboardList },
  { id: 'tax-revenue', label: 'Tax & Revenue Monitoring', icon: TrendingUp },
  { id: 'road-safety', label: 'Road Safety & Accident', icon: Shield },
  { id: 'vehicle-registration', label: 'Vehicle Registration', icon: Car },
  { id: 'puc-pucc', label: 'PUC / PUCC', icon: Layers },
]

const MLogo = () => (
  <div style={{
    width: 52, height: 52,
    background: 'linear-gradient(145deg, #7C3AED 0%, #6D28D9 100%)',
    borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(124,58,237,0.35)',
  }}>
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
      <path d="M2 24V5L15 18L28 5V24" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const UserAvatar = () => (
  <div style={{
    width: 38, height: 38, borderRadius: '50%',
    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: 700, fontSize: 15, flexShrink: 0,
  }}>D</div>
)

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div style={{
      width: 196, minHeight: '100vh', background: 'white',
      display: 'flex', flexDirection: 'column',
      boxShadow: '2px 0 8px rgba(0,0,0,0.06)', position: 'relative', zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 28px' }}>
        <MLogo />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingBottom: 12 }}>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '11px 16px', border: 'none', cursor: 'pointer',
                background: isActive ? '#7C3AED' : 'transparent',
                color: isActive ? 'white' : '#6B7280',
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                textAlign: 'left', transition: 'all 0.15s', lineHeight: 1.3,
              }}
            >
              <Icon size={17} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* User profile */}
      <div style={{
        margin: '8px 10px 12px', padding: '10px 12px', borderRadius: 12,
        background: '#1F2937', display: 'flex', alignItems: 'center', gap: 10,
        cursor: 'pointer',
      }}>
        <UserAvatar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Deekshit</div>
          <div style={{ color: '#9CA3AF', fontSize: 11, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Deekshit@gmail.com
          </div>
        </div>
        <MoreVertical size={15} color="#6B7280" />
      </div>
    </div>
  )
}
