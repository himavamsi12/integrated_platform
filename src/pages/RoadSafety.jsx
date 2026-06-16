import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell,
} from 'recharts'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

const accidentTrend = [
  { month: 'Jan', accidents: 42, fatalities: 8 },
  { month: 'Feb', accidents: 38, fatalities: 6 },
  { month: 'Mar', accidents: 55, fatalities: 12 },
  { month: 'Apr', accidents: 48, fatalities: 9 },
  { month: 'May', accidents: 35, fatalities: 5 },
  { month: 'Jun', accidents: 44, fatalities: 7 },
]

const hotspots = [
  { name: 'NH-48 Bypass', value: 24, color: '#F87171' },
  { name: 'MG Road', value: 18, color: '#F59E0B' },
  { name: 'Ring Road', value: 15, color: '#A78BFA' },
  { name: 'Old Airport', value: 12, color: '#60A5FA' },
  { name: 'Electronic City', value: 9, color: '#34D399' },
]

export default function RoadSafety() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card style={{ padding: 0 }}>
        <div style={{ display: 'flex' }}>
          {[
            { value: '44', label: 'Accidents This Month' },
            { value: '7', label: 'Fatalities' },
            { value: '28', label: 'Serious Injuries' },
            { value: '62%', label: 'Hit & Run Cases' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '22px 16px',
              borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: i === 1 ? '#EF4444' : '#1F2937', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Accident Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={accidentTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="accidents" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3 }} name="Accidents" />
              <Line type="monotone" dataKey="fatalities" stroke="#F87171" strokeWidth={2.5} dot={{ r: 3 }} name="Fatalities" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {[{ c: '#7C3AED', l: 'Accidents' }, { c: '#F87171', l: 'Fatalities' }].map(({ c, l }) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} /> {l}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Accident Hotspots</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hotspots} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11.5, fill: '#374151' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={18}>
                {hotspots.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Accident Reports</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              {['Report ID', 'Location', 'Date/Time', 'Vehicles', 'Casualties', 'Severity'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12.5, fontWeight: 500, color: '#6B7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'ACC-001', loc: 'NH-48 Km 24', dt: '15 Jun 08:42', veh: '3', cas: '2 injured', sev: 'Serious', sc: '#F59E0B' },
              { id: 'ACC-002', loc: 'MG Road Jn', dt: '15 Jun 11:15', veh: '2', cas: '1 fatal', sev: 'Fatal', sc: '#EF4444' },
              { id: 'ACC-003', loc: 'Ring Road', dt: '14 Jun 22:30', veh: '1', cas: 'None', sev: 'Minor', sc: '#22C55E' },
              { id: 'ACC-004', loc: 'Electronic City', dt: '14 Jun 17:50', veh: '4', cas: '3 injured', sev: 'Serious', sc: '#F59E0B' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F9FAFB' }}>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#7C3AED', fontWeight: 600 }}>{row.id}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.loc}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.dt}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.veh}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.cas}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ color: row.sc, fontSize: 13, fontWeight: 600 }}>{row.sev}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
