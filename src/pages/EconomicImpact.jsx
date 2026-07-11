import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import ExportButton from '../components/ExportButton'
import DetailModal from '../components/DetailModal'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

// Gross State Domestic Product - At Current Price (₹ Crores) — real bulletin data
const gsdp = [
  { name: 'Crops', y19: 105527, y20: 121571, y21: 74853 },
  { name: 'Livestock', y19: 31685, y20: 42512, y21: 31271 },
  { name: 'Forestry & Logging', y19: 10418, y20: 13360, y21: 8951 },
  { name: 'Fishing', y19: 4868, y20: 5348, y21: 2988 },
  { name: 'Mining and Quarrying', y19: 8968, y20: 8745, y21: 9023 },
  { name: 'Manufacturing', y19: 211302, y20: 200021, y21: 167979 },
  { name: 'Electricity, Gas, Water & Remediation', y19: 21158, y20: 22774, y21: 18345 },
  { name: 'Construction', y19: 82047, y20: 83243, y21: 60441 },
  { name: 'Trade and Repair Services', y19: 138298, y20: 152905, y21: 80434 },
  { name: 'Hotel and Restaurants', y19: 22414, y20: 23543, y21: 7147 },
  { name: 'Railways', y19: 3108, y20: 4358, y21: 2344 },
  { name: 'Road Transport', y19: 47055, y20: 55154, y21: 50330 },
  { name: 'Water Transport', y19: 416, y20: 375, y21: 279 },
  { name: 'Air Transport', y19: 1337, y20: 2324, y21: 805 },
  { name: 'Services Incidental to Transport', y19: 1211, y20: 1241, y21: 534 },
  { name: 'Storage', y19: 1630, y20: 1591, y21: 1037 },
  { name: 'Communication', y19: 15657, y20: 17760, y21: 13453 },
  { name: 'Financial Services', y19: 61539, y20: 65933, y21: 55911 },
  { name: 'Real Estate, Dwellings & Prof. Services', y19: 448553, y20: 514556, y21: 342150 },
  { name: 'Public Administration', y19: 34648, y20: 38100, y21: 26080 },
  { name: 'Other Service', y19: 86880, y20: 101426, y21: 51829 },
]

const transportModes = gsdp.filter(g =>
  ['Railways', 'Road Transport', 'Water Transport', 'Air Transport', 'Services Incidental to Transport', 'Storage'].includes(g.name))

// Latest EV snapshot (Karnataka, as on 31-01-2026) — real bulletin data
const evNonTransport = [
  { name: 'Two Wheelers', total: 591349, newJan: 15626 },
  { name: 'Cars', total: 50146, newJan: 2065 },
  { name: 'Other Vehicles', total: 172, newJan: 3 },
]
const evTransport = [
  { name: 'Other (Transport)', total: 26669, newJan: 1033 },
  { name: 'Three-Wheeler Passenger', total: 17728, newJan: 507 },
  { name: 'Three-Wheeler Goods', total: 11313, newJan: 166 },
  { name: 'Motor Cabs', total: 9235, newJan: 127 },
  { name: 'Bus', total: 2065, newJan: 96 },
  { name: 'Four Wheeler', total: 1597, newJan: 25 },
]

export default function EconomicImpact() {
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedEv, setSelectedEv] = useState(null)
  const allRanked = useMemo(() => [...gsdp].sort((a, b) => b.y21 - a.y21), [])
  const topIndustries = useMemo(() => allRanked.slice(0, 10), [allRanked])
  const roadTransportRank = useMemo(() => allRanked.findIndex(g => g.name === 'Road Transport') + 1, [allRanked])

  const openIndustry = (g) => {
    const rank = allRanked.findIndex(x => x.name === g.name) + 1
    const growth = ((g.y20 - g.y19) / g.y19 * 100).toFixed(1)
    setSelectedIndustry({ ...g, rank, growth })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '10px 20px 6px', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>
            Gross State Domestic Product — At Current Prices (₹ Crores) · Karnataka
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          {[
            { value: '₹50,330 Cr', label: 'Road Transport GSDP (2020-21)' },
            { value: `#${roadTransportRank}`, label: 'Rank Among All 21 Industries' },
            { value: '#1', label: 'Rank Among Transport Modes' },
            { value: '+17.2%', label: 'Road Transport Growth 2018-19 → 2019-20' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '18px 16px',
              borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top 10 industries */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Top 10 Industries by GSDP — FY 2020-2021</h3>
          <ExportButton
            filename="gsdp-top-industries-2020-21.csv"
            headers={['Industry', '2018-19', '2019-20', '2020-21']}
            rows={topIndustries.map(g => [g.name, g.y19, g.y20, g.y21])}
          />
        </div>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>Road Transport is the only transport-sector industry in the state's overall top 10</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topIndustries} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
            <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')} Cr`, 'GSDP 2020-21']} />
            <Bar dataKey="y21" radius={[0, 4, 4, 0]} maxBarSize={16} onClick={openIndustry} cursor="pointer">
              {topIndustries.map((g, i) => <Cell key={i} fill={g.name === 'Road Transport' ? '#7C3AED' : '#93C5FD'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize: 11.5, color: '#C4C9D2', marginTop: 6 }}>Click a bar for the industry's 3-year breakdown</p>
      </Card>

      {/* Transport modes comparison */}
      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>Transport Modes — GSDP Comparison (₹ Crores)</h3>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>Road Transport dwarfs every other transport mode combined</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={transportModes} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v, n) => [`₹${v.toLocaleString('en-IN')} Cr`, n === 'y19' ? '2018-19' : n === 'y20' ? '2019-20' : '2020-21']} />
            <Bar dataKey="y19" fill="#DDD6FE" radius={[3, 3, 0, 0]} maxBarSize={16} name="2018-19" onClick={openIndustry} cursor="pointer" />
            <Bar dataKey="y20" fill="#A78BFA" radius={[3, 3, 0, 0]} maxBarSize={16} name="2019-20" onClick={openIndustry} cursor="pointer" />
            <Bar dataKey="y21" fill="#7C3AED" radius={[3, 3, 0, 0]} maxBarSize={16} name="2020-21" onClick={openIndustry} cursor="pointer" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {[['#DDD6FE', '2018-19'], ['#A78BFA', '2019-20'], ['#7C3AED', '2020-21']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
            </span>
          ))}
        </div>
      </Card>

      {/* Latest EV snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>EV Snapshot (Non-Transport) — as on 31-01-2026</h3>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>Source: Parivahan, Karnataka</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={evNonTransport} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [v.toLocaleString('en-IN'), 'Total EVs']} />
              <Bar dataKey="total" fill="#34D399" radius={[4, 4, 0, 0]} maxBarSize={44} onClick={setSelectedEv} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>EV Snapshot (Transport) — as on 31-01-2026</h3>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>Newly registered in Jan 2026 shown in tooltip</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={evTransport} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 9.5, fill: '#374151' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v, n, p) => [`${v.toLocaleString('en-IN')} (+${p.payload.newJan} in Jan'26)`, 'Total']} />
              <Bar dataKey="total" fill="#60A5FA" radius={[0, 4, 4, 0]} maxBarSize={16} onClick={setSelectedEv} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <DetailModal
        open={!!selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
        title={selectedIndustry?.name}
        subtitle="GSDP — At Current Prices (₹ Crores)"
        accent={selectedIndustry?.name === 'Road Transport' ? '#7C3AED' : '#60A5FA'}
        rows={selectedIndustry ? [
          ['2018-19', `₹${selectedIndustry.y19.toLocaleString('en-IN')} Cr`],
          ['2019-20', `₹${selectedIndustry.y20.toLocaleString('en-IN')} Cr`],
          ['2020-21', `₹${selectedIndustry.y21.toLocaleString('en-IN')} Cr`],
          ['Growth 18-19 → 19-20', `${selectedIndustry.growth >= 0 ? '+' : ''}${selectedIndustry.growth}%`],
          ['Rank Among 21 Industries', `#${selectedIndustry.rank}`],
        ] : []}
      />

      <DetailModal
        open={!!selectedEv}
        onClose={() => setSelectedEv(null)}
        title={selectedEv?.name}
        subtitle="EV Registration Snapshot · Karnataka"
        accent="#34D399"
        rows={selectedEv ? [
          ['Total as on 31-12-2025 / 31-01-2026', selectedEv.total.toLocaleString('en-IN')],
          ['Newly Registered — Jan 2026', `+${selectedEv.newJan.toLocaleString('en-IN')}`],
          ['Monthly Growth Rate', `${((selectedEv.newJan / (selectedEv.total - selectedEv.newJan)) * 100).toFixed(2)}%`],
        ] : []}
      />
    </div>
  )
}
