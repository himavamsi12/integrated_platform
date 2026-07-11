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

const pucTrend = [
  { month: 'Jan', issued: 1820, expired: 420 },
  { month: 'Feb', issued: 2100, expired: 380 },
  { month: 'Mar', issued: 1950, expired: 460 },
  { month: 'Apr', issued: 2300, expired: 320 },
  { month: 'May', issued: 2150, expired: 410 },
  { month: 'Jun', issued: 2480, expired: 290 },
]

const categoryData = [
  { name: '2-Wheeler', value: 1240, color: '#7C3AED' },
  { name: '4-Wheeler', value: 860, color: '#60A5FA' },
  { name: 'Commercial', value: 320, color: '#34D399' },
  { name: 'Bus/Truck', value: 60, color: '#F59E0B' },
]

const pucCenters = [
  { name: 'Green Auto PUC', loc: 'JP Nagar', issued: 280, failed: 12, comp: '95.7%' },
  { name: 'EcoCheck Center', loc: 'Koramangala', issued: 245, failed: 8, comp: '96.7%' },
  { name: 'AutoTest PUCC', loc: 'Marathahalli', issued: 210, failed: 15, comp: '92.9%' },
  { name: 'ClearAir Testing', loc: 'Whitefield', issued: 195, failed: 6, comp: '96.9%' },
]

export default function PUCPUCC() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCenter, setSelectedCenter] = useState(null)
  const categoryTotal = categoryData.reduce((s, c) => s + c.value, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card style={{ padding: 0 }}>
        <div style={{ display: 'flex' }}>
          {[
            { value: '2,480', label: 'PUC Issued Today' },
            { value: '290', label: 'Expired/Failed' },
            { value: '148', label: 'PUCC Centers Active' },
            { value: '₹12,40,000', label: 'Revenue' },
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
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>PUC Certificate Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={pucTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="issued" stroke="#7C3AED" strokeWidth={2.5} dot={false} name="Issued" />
              <Line type="monotone" dataKey="expired" stroke="#F87171" strokeWidth={2.5} dot={false} name="Expired" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {[{ c: '#7C3AED', l: 'Issued' }, { c: '#F87171', l: 'Expired' }].map(({ c, l }) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} /> {l}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>By Vehicle Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={42} onClick={setSelectedCategory} cursor="pointer">
                {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Top PUCC Centers</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              {['Center Name', 'Location', 'Certificates Issued', 'Failed Count', 'Compliance %'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12.5, fontWeight: 500, color: '#6B7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pucCenters.map((row, i) => (
              <tr key={i} onClick={() => setSelectedCenter(row)} style={{ borderBottom: '1px solid #F9FAFB', cursor: 'pointer' }}>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.loc}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#374151' }}>{row.issued}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#F87171', fontWeight: 600 }}>{row.failed}</td>
                <td style={{ padding: '12px 14px', fontSize: 13.5, color: '#22C55E', fontWeight: 600 }}>{row.comp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DetailModal
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.name}
        subtitle="PUC Certificates by Vehicle Category"
        accent={selectedCategory?.color}
        rows={selectedCategory ? [
          ['Certificates Issued', selectedCategory.value.toLocaleString('en-IN')],
          ['Share of Total', `${((selectedCategory.value / categoryTotal) * 100).toFixed(1)}%`],
        ] : []}
      />

      <DetailModal
        open={!!selectedCenter}
        onClose={() => setSelectedCenter(null)}
        title={selectedCenter?.name}
        subtitle="PUCC Center Detail"
        rows={selectedCenter ? [
          ['Location', selectedCenter.loc],
          ['Certificates Issued', selectedCenter.issued],
          ['Failed Count', selectedCenter.failed],
          ['Compliance %', selectedCenter.comp],
        ] : []}
      />
    </div>
  )
}
