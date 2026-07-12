import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  Car, FileText, Building2, Landmark, Shield, ClipboardList, Layers, TrendingUp, AlertTriangle,
} from 'lucide-react'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

const kpis = [
  { icon: Car, label: 'Vehicles Registered (Apr25-Jan26)', value: '16,22,294', color: '#7C3AED', page: 'vehicle-registration' },
  { icon: FileText, label: 'Driving Licenses Issued 2024-25', value: '14,37,386', color: '#60A5FA', page: 'driving-license' },
  { icon: Landmark, label: 'Revenue Collected 2025-26*', value: '₹10,594.64 Cr', color: '#F59E0B', page: 'tax-revenue' },
  { icon: TrendingUp, label: 'EV Registrations 2024-25', value: '1,73,841', color: '#34D399', page: 'tax-revenue' },
]

const revenueTrend = [
  { year: '2020-21', v: 5625 }, { year: '2021-22', v: 6747 }, { year: '2022-23', v: 9487 },
  { year: '2023-24', v: 11106 }, { year: '2024-25', v: 11744 }, { year: '2025-26*', v: 10594 },
]

const modules = [
  { id: 'rto-permits',    label: 'RTO Performance & Permits', desc: 'Division rankings, duplicate permits, permit-type trends', icon: Building2, color: '#7C3AED' },
  { id: 'economic-impact',label: 'Economic Impact (GSDP)',    desc: 'Road transport contribution to state GDP',                icon: Landmark,  color: '#F59E0B' },
  { id: 'vehicle-registration', label: 'Vehicle Registration', desc: 'Monthly registrations, categories, divisions',          icon: Car,       color: '#60A5FA' },
  { id: 'driving-license', label: 'Driving License',           desc: 'DL issuance, gender split, conductor licenses',         icon: FileText,  color: '#34D399' },
  { id: 'enforcement',     label: 'Enforcement & Compliance',  desc: 'Challans, offenses, recent violations',                 icon: ClipboardList, color: '#F87171' },
  { id: 'road-safety',     label: 'Road Safety & Accident',    desc: 'Accident trend, hotspots, reports',                     icon: Shield,    color: '#A78BFA' },
  { id: 'puc-pucc',        label: 'PUC / PUCC',                desc: 'Certificate issuance, PUCC center compliance',          icon: Layers,    color: '#06B6D4' },
]

const alerts = [
  { text: 'Revenue collection at 89.09% of ₹15,000 Cr FY 2025-26 target as of 31-Jan-2026.', tone: '#F59E0B' },
  { text: 'EV registrations grew from 7,157 (2019-20) to 1,73,841 (2024-25) — a ~24x increase.', tone: '#34D399' },
  { text: 'Road Transport remains Karnataka’s top transport-sector GSDP contributor at ₹50,330 Cr (2020-21).', tone: '#7C3AED' },
  { text: 'Sirsi RTO recorded the highest cumulative duplicate permit issues in the Belagavi division (2022-25).', tone: '#F87171' },
]

export default function Overview({ setActivePage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Source banner */}
      <Card style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Karnataka Integrated Transport Platform</div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
            Source: Govt. of Karnataka · Commissioner for Transport & Road Safety, Bengaluru · Bulletin No.01/2026 (Apr 2025 – Jan 2026)
          </div>
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#7C3AED', background: '#F5F3FF', padding: '5px 12px', borderRadius: 20 }}>
          Live Data Snapshot
        </span>
      </Card>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ cursor: 'pointer' }} onClick={() => setActivePage?.(k.page)}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: `${k.color}1A`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
            }}>
              <k.icon size={18} color={k.color} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1F2937' }}>{k.value}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, lineHeight: 1.3 }}>{k.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        {/* Revenue trend */}
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>Revenue Collected — 5 Year Trend (₹ Crores)</h3>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>* 2025-26 figure as on 31-01-2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueTrend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')} Cr`, 'Collected']} />
              <Bar dataKey="v" fill="#7C3AED" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '16px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} color="#F59E0B" />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Insights & Alerts</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {alerts.map((a, i) => (
              <div key={i} style={{
                padding: '10px 20px', borderTop: '1px solid #F9FAFB', display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: a.tone, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Module quick links */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Modules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {modules.map(m => (
            <Card key={m.id} style={{ cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}
              onClick={() => setActivePage?.(m.id)}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: `${m.color}1A`, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <m.icon size={17} color={m.color} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937' }}>{m.label}</div>
                <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 3, lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
