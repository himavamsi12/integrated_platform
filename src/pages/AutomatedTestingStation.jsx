import { useState } from 'react'
import {
  ComposedChart, Area, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts'
import { Search, Download, MoreVertical, FileText, CheckSquare, Square } from 'lucide-react'

const passFail = [
  { date: 'May 5', pass: 195, fail: 122 },
  { date: 'May 6', pass: 208, fail: 130 },
  { date: 'May 7', pass: 232, fail: 148 },
  { date: 'May 8', pass: 278, fail: 178 },
  { date: 'May 9', pass: 340, fail: 228 },
  { date: 'May 10', pass: 315, fail: 252 },
  { date: 'May 11', pass: 285, fail: 220 },
  { date: 'May 12', pass: 248, fail: 188 },
  { date: 'May 13', pass: 218, fail: 158 },
  { date: 'May 14', pass: 182, fail: 130 },
  { date: 'May 15', pass: 158, fail: 98 },
]

const dailyMetrics = [
  { day: 'Mon', value: 26 },
  { day: 'Tue', value: 4 },
  { day: 'Wed', value: 22 },
  { day: 'Thu', value: 7 },
]

const failReasons = [
  { name: 'Braking', value: 420, color: '#60A5FA' },
  { name: 'Emission', value: 560, color: '#34D399' },
  { name: 'Alignment', value: 375, color: '#F87171' },
  { name: 'Headlight', value: 290, color: '#F59E0B' },
  { name: 'Suspension', value: 315, color: '#A78BFA' },
  { name: 'Category 2', value: 450, color: '#9CA3AF' },
  { name: 'Category 2', value: 490, color: '#3B82F6' },
]

const passfailBars = [
  { name: 'Category 1', value: 65000, color: '#60A5FA' },
  { name: 'Category 2', value: 82000, color: '#34D399' },
  { name: 'Category 2', value: 62000, color: '#F87171' },
]

const stationData = [
  { id: 1, rank: 1, station: 'ATS-12', tests: 620, pass: 81, fail: 19, avgTAT: '1.8 min' },
  { id: 2, rank: 2, station: 'ATS-18', tests: 540, pass: 76, fail: 24, avgTAT: '2.0 min' },
  { id: 3, rank: 3, station: 'ATS-05', tests: 460, pass: 72, fail: 28, avgTAT: '2.2 min' },
]

const reportData = [
  { id: 1, param: 'Brake Efficiency', standard: '>50%', reading: '62%', status: 'PASS', users: '15 Users', checked: true },
  { id: 2, param: 'Emission CO', standard: '<0.5', reading: '0.3', status: 'PASS', users: '56 Users', checked: false },
  { id: 3, param: 'Headlight Focus', standard: 'Pass', reading: 'Pass', status: 'PASS', users: '90 Users', checked: true },
  { id: 4, param: 'Headlight Focus', standard: '>50%', reading: 'Pass', status: 'PASS', users: '22 Users', checked: false },
  { id: 5, param: 'Headlight Focus', standard: 'Pass', reading: 'Pass', status: 'PASS', users: '23 Users', checked: true },
]

const Card = ({ children, style = {} }) => (
  <div style={{
    background: 'white', borderRadius: 14, padding: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style,
  }}>
    {children}
  </div>
)

const DropdownBtn = ({ label }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
    border: '1px solid #E5E7EB', borderRadius: 8, background: 'white',
    fontSize: 13, color: '#374151', cursor: 'pointer',
  }}>
    {label} <span style={{ fontSize: 10 }}>▼</span>
  </button>
)

const formatCurrency = (v) => `$${(v / 1000).toFixed(0)}k`

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#5B21B6', color: 'white', padding: '4px 10px',
        borderRadius: 6, fontSize: 13, fontWeight: 600,
      }}>
        {payload[0]?.value}
      </div>
    )
  }
  return null
}

function DashboardTab() {
  const [period, setPeriod] = useState('Day')
  const [checked, setChecked] = useState([true, true, true])
  const [headerChecked, setHeaderChecked] = useState(null)

  const toggleRow = (i) => {
    const next = [...checked]
    next[i] = !next[i]
    setChecked(next)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Station Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              <th style={{ padding: '14px 16px', width: 48 }}>
                <div style={{
                  width: 18, height: 18, border: '2px solid #60A5FA',
                  borderRadius: 4, background: '#EFF6FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <span style={{ color: '#3B82F6', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>−</span>
                </div>
              </th>
              {['Rank', 'Station', 'Tests', 'Pass%', 'Fail%', 'Avg TAT'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#6B7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stationData.map((row, i) => (
              <tr key={row.id} style={{ borderBottom: i < stationData.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div
                    onClick={() => toggleRow(i)}
                    style={{
                      width: 18, height: 18, borderRadius: 4, cursor: 'pointer',
                      background: checked[i] ? '#3B82F6' : 'white',
                      border: checked[i] ? '2px solid #3B82F6' : '2px solid #D1D5DB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {checked[i] && <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{row.rank}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{row.station}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{row.tests}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{row.pass}%</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{row.fail}%</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#F0FDF4', color: '#16A34A', fontSize: 13,
                    fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                    {row.avgTAT}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
        {/* Pass/Fail Trend */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Pass/Fail Trend</h3>
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3 }}>
              {['Day', 'Week', 'Month'].map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding: '5px 14px', border: 'none', borderRadius: 6, cursor: 'pointer',
                  background: period === p ? 'white' : 'transparent',
                  color: period === p ? '#1F2937' : '#9CA3AF', fontSize: 13, fontWeight: period === p ? 600 : 400,
                  boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={passFail} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 420]} ticks={[0, 100, 200, 300, 400]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="pass" stroke="#22C55E" fill="#DCFCE7" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#22C55E' }} />
              <Line type="monotone" dataKey="fail" stroke="#F59E0B" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F59E0B' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Metrics */}
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Daily Metrics</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={dailyMetrics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} ticks={[0, 10, 20]} />
              <Tooltip cursor={{ fill: '#F5F3FF' }} />
              <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Fail Reason Breakdown */}
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Fail Reason Breakdown</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <DropdownBtn label="Metric" />
            <DropdownBtn label="Today" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={failReasons} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} ticks={[0, 200, 400, 600]} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={38}>
                {failReasons.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
            {failReasons.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: '#6B7280' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                {item.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Pass/Fail Trend (bar) */}
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Pass/Fail Trend</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <DropdownBtn label="Metric" />
            <DropdownBtn label="Today" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={passfailBars} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${v / 1000}k`}
                ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              />
              <Tooltip formatter={(v) => [`$${(v / 1000).toFixed(0)}k`]} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {passfailBars.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
            {passfailBars.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: '#6B7280' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                {item.name}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function SearchTab() {
  const [vehicleId, setVehicleId] = useState('')
  const [name, setName] = useState('')
  const [searched, setSearched] = useState(false)
  const [reports, setReports] = useState(reportData)

  const handleSearch = () => setSearched(true)

  const toggleReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r))
  }

  const PersonAvatar = () => (
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: 'linear-gradient(135deg, #C084FC, #7C3AED)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: 24, fontWeight: 700, margin: '0 auto 6px',
    }}>D</div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Search inputs */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          value={vehicleId}
          onChange={e => setVehicleId(e.target.value)}
          placeholder="search vehicle id"
          style={{
            flex: 1, padding: '12px 18px', border: '1px solid #E5E7EB',
            borderRadius: 24, outline: 'none', fontSize: 13.5, color: '#374151',
            background: 'white',
          }}
        />
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Search  name"
          style={{
            flex: 1, padding: '12px 18px', border: '1px solid #E5E7EB',
            borderRadius: 24, outline: 'none', fontSize: 13.5, color: '#374151',
            background: 'white',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '12px 28px', background: '#7C3AED', color: 'white',
            border: 'none', borderRadius: 24, fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}
        >Search</button>
      </div>

      {/* Search Result */}
      {searched && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Search Result</h3>
              <table style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Reg No', 'KA03NA1122'],
                    ['Test ID', 'ATS-20250103-7782'],
                    ['Status', 'PASS'],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td style={{ paddingRight: 16, paddingBottom: 6, fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{label}</td>
                      <td style={{ paddingBottom: 6, fontSize: 13.5, color: '#374151' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: 'center' }}>
              <PersonAvatar />
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Deekshith</div>
            </div>
          </div>
        </Card>
      )}

      {/* Reports Table */}
      <Card style={{ padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px 14px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937' }}>Reports</h3>
          <button style={{
            padding: '8px 20px', background: '#7C3AED', color: 'white',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Download all</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6', borderTop: '1px solid #F3F4F6' }}>
              {['Parameter', 'Standard', 'Reading', 'Status', 'Users', ''].map((h, i) => (
                <th key={i} style={{
                  padding: '12px 16px', textAlign: 'left', fontSize: 13,
                  fontWeight: 500, color: '#6B7280',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((row, i) => (
              <tr key={row.id} style={{ borderBottom: i < reports.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      onClick={() => toggleReport(row.id)}
                      style={{
                        width: 17, height: 17, borderRadius: 4, cursor: 'pointer', flexShrink: 0,
                        background: row.checked ? '#3B82F6' : 'white',
                        border: row.checked ? '2px solid #3B82F6' : '2px solid #D1D5DB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {row.checked && <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div style={{
                      width: 32, height: 32, background: '#374151', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <FileText size={16} color="white" />
                    </div>
                    <span style={{ fontSize: 13.5, color: '#374151', fontWeight: 500 }}>{row.param}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13.5, color: '#6B7280' }}>Paid</td>
                <td style={{ padding: '14px 16px', fontSize: 13.5, color: '#374151' }}>{row.standard}</td>
                <td style={{ padding: '14px 16px', fontSize: 13.5, color: '#374151' }}>{row.reading}</td>
                <td style={{ padding: '14px 16px', fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{row.status}</td>
                <td style={{ padding: '14px 16px', fontSize: 13.5, color: '#6B7280' }}>{row.users}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button style={{
                      padding: '6px 14px', background: '#1F2937', color: 'white',
                      border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}>Download all</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                      <MoreVertical size={16} color="#9CA3AF" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default function AutomatedTestingStation() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
        {[['dashboard', 'Dashboard'], ['search', 'Search & Reports']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 20px', border: 'none', cursor: 'pointer',
            background: tab === id ? '#7C3AED' : 'white',
            color: tab === id ? 'white' : '#6B7280',
            borderRadius: 8, fontSize: 13.5, fontWeight: tab === id ? 600 : 400,
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'dashboard' ? <DashboardTab /> : <SearchTab />}
    </div>
  )
}
