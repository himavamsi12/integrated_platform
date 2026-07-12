import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ComposedChart, Line,
} from 'recharts'
import ExportButton from '../components/ExportButton'
import DetailModal from '../components/DetailModal'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

// Duplicate Permit Issues 2022-2025, by division (real bulletin data)
const divisions = {
  Belagavi: [
    { rto: 'Belagavi', 2022: 16, 2023: 24, 2024: 0, 2025: 0 },
    { rto: 'Chikkodi', 2022: 6, 2023: 2, 2024: 17, 2025: 19 },
    { rto: 'Gokak', 2022: 97, 2023: 39, 2024: 60, 2025: 67 },
    { rto: 'Bailhongal', 2022: 115, 2023: 93, 2024: 2, 2025: 4 },
    { rto: 'Ramadurga', 2022: 17, 2023: 19, 2024: 1, 2025: 2 },
    { rto: 'Athani', 2022: 0, 2023: 0, 2024: 12, 2025: 19 },
    { rto: 'Dharwad West', 2022: 13, 2023: 18, 2024: 108, 2025: 97 },
    { rto: 'Haveri', 2022: 35, 2023: 0, 2024: 52, 2025: 84 },
    { rto: 'Ranibennur', 2022: 10, 2023: 5, 2024: 38, 2025: 29 },
    { rto: 'Gadag', 2022: 13, 2023: 14, 2024: 53, 2025: 29 },
    { rto: 'Jamakhandi', 2022: 27, 2023: 36, 2024: 12, 2025: 30 },
    { rto: 'Karwar', 2022: 4, 2023: 3, 2024: 11, 2025: 10 },
    { rto: 'Sirsi', 2022: 118, 2023: 124, 2024: 9, 2025: 25 },
    { rto: 'Honnavara', 2022: 12, 2023: 13, 2024: 29, 2025: 37 },
    { rto: 'Dandeli', 2022: 22, 2023: 20, 2024: 3, 2025: 8 },
    { rto: 'Bagalkot', 2022: 5, 2023: 10, 2024: 29, 2025: 27 },
  ],
  'Bangalore City': [
    { rto: 'Central', 2022: 110, 2023: 117, 2024: 115, 2025: 11 },
    { rto: 'West', 2022: 132, 2023: 60, 2024: 74, 2025: 63 },
    { rto: 'East', 2022: 119, 2023: 83, 2024: 83, 2025: 83 },
    { rto: 'North', 2022: 44, 2023: 62, 2024: 62, 2025: 84 },
    { rto: 'South', 2022: 87, 2023: 76, 2024: 82, 2025: 96 },
    { rto: 'Jnanabharathi', 2022: 29, 2023: 32, 2024: 55, 2025: 58 },
    { rto: 'Devanahalli', 2022: 11, 2023: 13, 2024: 26, 2025: 15 },
    { rto: 'Yelahanka', 2022: 65, 2023: 108, 2024: 56, 2025: 57 },
    { rto: 'Electronic City', 2022: 16, 2023: 54, 2024: 97, 2025: 140 },
    { rto: 'KR Puram', 2022: 4, 2023: 3, 2024: 71, 2025: 85 },
    { rto: 'Chandapura', 2022: 115, 2023: 107, 2024: 29, 2025: 26 },
  ],
  'Bangalore Rural': [
    { rto: 'Kolar', 2022: 43, 2023: 30, 2024: 33, 2025: 40 },
    { rto: 'KGF', 2022: 9, 2023: 25, 2024: 23, 2025: 9 },
    { rto: 'Koppal', 2022: 9, 2023: 19, 2024: 57, 2025: 77 },
    { rto: 'Chikkaballapura', 2022: 28, 2023: 39, 2024: 22, 2025: 25 },
    { rto: 'Ramanagara', 2022: 12, 2023: 14, 2024: 46, 2025: 62 },
    { rto: 'Nelamangala', 2022: 59, 2023: 61, 2024: 47, 2025: 71 },
  ],
  Mysuru: [
    { rto: 'Mysuru West', 2022: 115, 2023: 95, 2024: 80, 2025: 118 },
    { rto: 'Chamaraj Nagar', 2022: 34, 2023: 20, 2024: 22, 2025: 18 },
    { rto: 'Mandya', 2022: 74, 2023: 58, 2024: 60, 2025: 53 },
    { rto: 'Madeikeri', 2022: 111, 2023: 97, 2024: 18, 2025: 17 },
    { rto: 'Nagamangala', 2022: 76, 2023: 35, 2024: 3, 2025: 6 },
    { rto: 'Mysore East', 2022: 10, 2023: 13, 2024: 20, 2025: 31 },
    { rto: 'Sakaleshpura', 2022: 19, 2023: 18, 2024: 12, 2025: 15 },
  ],
  Shimoga: [
    { rto: 'Shimoga', 2022: 7, 2023: 15, 2024: 56, 2025: 41 },
    { rto: 'Sagar', 2022: 32, 2023: 21, 2024: 16, 2025: 22 },
    { rto: 'Chitradurga', 2022: 48, 2023: 65, 2024: 27, 2025: 46 },
    { rto: 'Davanagere', 2022: 24, 2023: 50, 2024: 70, 2025: 94 },
    { rto: 'Chickmagalur', 2022: 49, 2023: 47, 2024: 38, 2025: 43 },
    { rto: 'Mangalore', 2022: 40, 2023: 63, 2024: 63, 2025: 70 },
    { rto: 'Udupi', 2022: 21, 2023: 15, 2024: 58, 2025: 76 },
    { rto: 'Puttur', 2022: 0, 2023: 0, 2024: 18, 2025: 37 },
    { rto: 'Bantwala', 2022: 7, 2023: 11, 2024: 32, 2025: 36 },
    { rto: 'Tarikere', 2022: 5, 2023: 3, 2024: 26, 2025: 50 },
  ],
  Gulbarga: [
    { rto: 'Kalburgi', 2022: 114, 2023: 37, 2024: 113, 2025: 132 },
    { rto: 'Yadagiri', 2022: 17, 2023: 28, 2024: 28, 2025: 21 },
    { rto: 'Bellary', 2022: 10, 2023: 15, 2024: 11, 2025: 18 },
    { rto: 'Hospet', 2022: 106, 2023: 84, 2024: 25, 2025: 54 },
    { rto: 'Raichur', 2022: 78, 2023: 46, 2024: 96, 2025: 93 },
    { rto: 'Koppal', 2022: 9, 2023: 19, 2024: 57, 2025: 77 },
    { rto: 'Bidar', 2022: 5, 2023: 4, 2024: 28, 2025: 13 },
    { rto: 'Bhalki', 2022: 32, 2023: 18, 2024: 4, 2025: 11 },
    { rto: 'Basavakalyan', 2022: 18, 2023: 22, 2024: 22, 2025: 14 },
  ],
}

// Permit Details 2025 - monthly totals by permit category (real bulletin data)
const permitMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const permitSeries = {
  'Tourist Permit':          [137, 457, 554, 500, 529, 423, 608, 614, 548, 533, 758, 765],
  'Contract Carriage Permit':[2808, 3240, 1712, 2650, 2317, 1739, 1739, 1739, 1739, 1739, 1739, 1739],
  'Goods Permit':            [474, 404, 492, 420, 463, 458, 470, 432, 467, 462, 452, 495],
  'National Permit':         [3, 0, 1, 2, 2, 2, 2, 7, 10, 2, 2, 5],
  'Private Service Vehicle': [160, 204, 146, 100, 100, 147, 247, 170, 362, 127, 249, 180],
}
const permitColors = {
  'Tourist Permit': '#7C3AED',
  'Contract Carriage Permit': '#60A5FA',
  'Goods Permit': '#34D399',
  'National Permit': '#F59E0B',
  'Private Service Vehicle': '#F87171',
}
const permitChartData = permitMonths.map((m, i) => {
  const row = { month: m }
  Object.keys(permitSeries).forEach(k => { row[k] = permitSeries[k][i] })
  return row
})

export default function RTOPermits() {
  const [division, setDivision] = useState('Belagavi')
  const [activePermits, setActivePermits] = useState(Object.keys(permitSeries))
  const [selectedRto, setSelectedRto] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  const rows = useMemo(() => {
    return divisions[division]
      .map(r => ({ ...r, total: r[2022] + r[2023] + r[2024] + r[2025] }))
      .sort((a, b) => b.total - a.total)
  }, [division])

  const highest = rows[0]
  const lowest = rows[rows.length - 1]
  const total = rows.reduce((s, r) => s + r.total, 0)
  const avg = rows.length ? total / rows.length : 0

  const togglePermit = (name) => {
    setActivePermits(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name])
  }

  const openRto = (r) => {
    const rank = rows.findIndex(x => x.rto === r.rto) + 1
    setSelectedRto({ ...r, rank })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header stats */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '10px 20px 6px', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>
            Duplicate Permit Issues 2022-2025 · Source: Karnataka STA, Bulletin No.01/2026
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          {[
            { value: total.toLocaleString('en-IN'), label: `Total Duplicate Permits · ${division}` },
            { value: highest ? `${highest.rto} (${highest.total})` : '-', label: 'Highest RTO (4-yr total)' },
            { value: lowest ? `${lowest.rto} (${lowest.total})` : '-', label: 'Lowest RTO (4-yr total)' },
            { value: rows.length, label: 'RTO Offices in Division' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '18px 16px',
              borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize: 19, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Division selector + chart */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Duplicate Permits by RTO — {division} Division</h3>
          <ExportButton
            filename={`duplicate-permits-${division.replace(/\s+/g, '-').toLowerCase()}.csv`}
            headers={['RTO Office', '2022', '2023', '2024', '2025', 'Total']}
            rows={rows.map(r => [r.rto, r[2022], r[2023], r[2024], r[2025], r.total])}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {Object.keys(divisions).map(d => (
            <button key={d} onClick={() => setDivision(d)} style={{
              padding: '6px 14px', border: 'none', borderRadius: 20, cursor: 'pointer',
              background: division === d ? '#7C3AED' : '#F3F4F6',
              color: division === d ? 'white' : '#6B7280',
              fontSize: 12.5, fontWeight: division === d ? 600 : 400,
            }}>{d}</button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={rows} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="rto" width={110} interval={0} tick={{ fontSize: 10.5, fill: '#374151' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={v => [v, 'Total (2022-25)']} />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} maxBarSize={16} onClick={openRto} cursor="pointer">
              {rows.map((r, i) => (
                <Cell key={i} fill={i === 0 ? '#EF4444' : i === rows.length - 1 ? '#22C55E' : '#7C3AED'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {[['#EF4444', 'Highest'], ['#7C3AED', 'Mid-range'], ['#22C55E', 'Lowest']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 11.5, color: '#C4C9D2', marginTop: 6 }}>Click a bar to view that RTO's year-by-year breakdown</p>
      </Card>

      {/* Permit type monthly trend */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>Permit Issuance Trend 2025 (by Type)</h3>
            <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>Click a legend item to toggle it on the chart</p>
          </div>
          <ExportButton
            filename="permit-trend-2025.csv"
            headers={['Month', ...Object.keys(permitSeries)]}
            rows={permitChartData.map(row => [row.month, ...Object.keys(permitSeries).map(k => row[k])])}
          />
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={permitChartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            onClick={(e) => e?.activeLabel && setSelectedMonth(e.activeLabel)} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip />
            {activePermits.map(name => (
              <Line key={name} type="monotone" dataKey={name} stroke={permitColors[name]} strokeWidth={2.3} dot={{ r: 3, cursor: 'pointer' }} name={name} />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
        <p style={{ fontSize: 11.5, color: '#C4C9D2', marginTop: 6 }}>Click a point on the chart to see that month's full permit breakdown</p>
        <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
          {Object.keys(permitSeries).map(name => {
            const on = activePermits.includes(name)
            return (
              <button key={name} onClick={() => togglePermit(name)} style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer',
                background: 'none', border: 'none', color: on ? '#374151' : '#C4C9D2', padding: 0,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
                  background: on ? permitColors[name] : '#E5E7EB',
                }} />
                {name}
              </button>
            )
          })}
        </div>
      </Card>

      <DetailModal
        open={!!selectedRto}
        onClose={() => setSelectedRto(null)}
        title={selectedRto?.rto}
        subtitle={`${division} Division · Duplicate Permit Issues`}
        accent={selectedRto && rows[0]?.rto === selectedRto.rto ? '#EF4444' : rows[rows.length - 1]?.rto === selectedRto?.rto ? '#22C55E' : '#7C3AED'}
        rows={selectedRto ? [
          ['2022', selectedRto[2022]],
          ['2023', selectedRto[2023]],
          ['2024', selectedRto[2024]],
          ['2025', selectedRto[2025]],
          ['4-Year Total', selectedRto.total],
          ['Rank in Division', `#${selectedRto.rank} of ${rows.length}`],
          ['vs. Division Average', `${selectedRto.total >= avg ? '+' : ''}${(selectedRto.total - avg).toFixed(0)} (avg ${avg.toFixed(0)})`],
        ] : []}
      />

      <DetailModal
        open={!!selectedMonth}
        onClose={() => setSelectedMonth(null)}
        title={`${selectedMonth} 2025 — Permit Issuance`}
        subtitle="All permit categories for the selected month"
        rows={selectedMonth ? Object.keys(permitSeries).map(name => [
          name, permitSeries[name][permitMonths.indexOf(selectedMonth)].toLocaleString('en-IN'),
        ]) : []}
      />
    </div>
  )
}
