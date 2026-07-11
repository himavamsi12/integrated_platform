import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line,
} from 'recharts'
import DetailModal from '../components/DetailModal'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

const challanTrend = [
  { month: 'Jan', issued: 320, collected: 280 },
  { month: 'Feb', issued: 380, collected: 340 },
  { month: 'Mar', issued: 290, collected: 260 },
  { month: 'Apr', issued: 420, collected: 380 },
  { month: 'May', issued: 360, collected: 320 },
  { month: 'Jun', issued: 440, collected: 400 },
]

const offenseData = [
  { name: 'Over Speed', value: 520, color: '#F87171' },
  { name: 'Signal Jump', value: 380, color: '#60A5FA' },
  { name: 'Wrong Lane', value: 290, color: '#34D399' },
  { name: 'Drunk Drive', value: 180, color: '#F59E0B' },
  { name: 'No Helmet', value: 450, color: '#A78BFA' },
]

const violations = [
  { veh: 'KA01AB1234', off: 'Over Speed', loc: 'MG Road', date: '15 Jun', fine: '₹2,000', status: 'Paid', sc: '#22C55E' },
  { veh: 'KA02CD5678', off: 'Signal Jump', loc: 'Ring Road', date: '15 Jun', fine: '₹1,000', status: 'Pending', sc: '#F59E0B' },
  { veh: 'KA03EF9012', off: 'Drunk Drive', loc: 'NH-48', date: '14 Jun', fine: '₹10,000', status: 'Paid', sc: '#22C55E' },
  { veh: 'KA04GH3456', off: 'No Helmet', loc: 'Old Town', date: '14 Jun', fine: '₹500', status: 'Pending', sc: '#F59E0B' },
]

export default function EnforcementCompliance() {
  const [selectedOffense, setSelectedOffense] = useState(null)
  const [selectedViolation, setSelectedViolation] = useState(null)
  const offenseTotal = offenseData.reduce((s, o) => s + o.value, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card style={{ padding: 0 }}>
        <div style={{ display: 'flex' }}>
          {[
            { value: '1,842', label: 'Challans Issued Today' },
            { value: '₹9,21,000', label: 'Revenue Collected' },
            { value: '87%', label: 'Collection Rate' },
            { value: '234', label: 'Pending Challans' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '22px 16px',
              borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Challan Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={challanTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="issued" stroke="#7C3AED" strokeWidth={2.5} dot={false} name="Issued" />
              <Line type="monotone" dataKey="collected" stroke="#22C55E" strokeWidth={2.5} dot={false} name="Collected" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED', display: 'inline-block' }} /> Issued
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> Collected
            </span>
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Offense Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={offenseData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40} onClick={setSelectedOffense} cursor="pointer">
                {offenseData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Violations</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              {['Vehicle No', 'Offense', 'Location', 'Date', 'Fine Amount', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 12.5, fontWeight: 500, color: '#6B7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {violations.map((row, i) => (
              <tr key={i} onClick={() => setSelectedViolation(row)} style={{ borderBottom: '1px solid #F9FAFB', cursor: 'pointer' }}>
                <td style={{ padding: '12px', fontSize: 13.5, color: '#374151' }}>{row.veh}</td>
                <td style={{ padding: '12px', fontSize: 13.5, color: '#374151' }}>{row.off}</td>
                <td style={{ padding: '12px', fontSize: 13.5, color: '#374151' }}>{row.loc}</td>
                <td style={{ padding: '12px', fontSize: 13.5, color: '#374151' }}>{row.date}</td>
                <td style={{ padding: '12px', fontSize: 13.5, color: '#374151' }}>{row.fine}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ color: row.sc, fontSize: 13, fontWeight: 600 }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DetailModal
        open={!!selectedOffense}
        onClose={() => setSelectedOffense(null)}
        title={selectedOffense?.name}
        subtitle="Offense Breakdown"
        accent={selectedOffense?.color}
        rows={selectedOffense ? [
          ['Cases Recorded', selectedOffense.value.toLocaleString('en-IN')],
          ['Share of All Offenses', `${((selectedOffense.value / offenseTotal) * 100).toFixed(1)}%`],
        ] : []}
      />

      <DetailModal
        open={!!selectedViolation}
        onClose={() => setSelectedViolation(null)}
        title={selectedViolation?.veh}
        subtitle="Violation Record"
        accent={selectedViolation?.sc}
        rows={selectedViolation ? [
          ['Offense', selectedViolation.off],
          ['Location', selectedViolation.loc],
          ['Date', selectedViolation.date],
          ['Fine Amount', selectedViolation.fine],
          ['Status', selectedViolation.status],
        ] : []}
      />
    </div>
  )
}
