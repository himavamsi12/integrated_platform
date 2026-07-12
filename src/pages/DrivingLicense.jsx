import { useState } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts'
import DetailModal from '../components/DetailModal'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

// DL issued 2024-25 – from PDF
const dlGrowth = [
  { year: '2022', total: 20990707 },
  { year: '2023', total: 22343999 },
  { year: '2024', total: 25207926 },
  { year: '2025', total: 26786228 },
]

// Professional vs Non-Professional 2024-25
const dlCategories = [
  { name: 'Non-Professional (Male)',   value: 1157922, color: '#7C3AED' },
  { name: 'Non-Professional (Female)', value: 235202,  color: '#A78BFA' },
  { name: 'Professional (Male)',       value: 43924,   color: '#60A5FA' },
  { name: 'Professional (Female)',     value: 290,     color: '#C4B5FD' },
]

// Top RTOs by DL Issued (professional) 2024-25
const topRTOs = [
  { rto: 'Bangalore Central',  total: 43025 },
  { rto: 'Bangalore East',     total: 42875 },
  { rto: 'Bangalore South',    total: 44960 },
  { rto: 'Bangalore North',    total: 36081 },
  { rto: 'Tumkur',             total: 40906 },
  { rto: 'Mysuru West',        total: 39835 },
  { rto: 'Mangalore',          total: 47477 },
  { rto: 'Belagavi',           total: 48061 },
]

// Conductor License 2024-25
const conductorLic = [
  { year: '2023-24', male: 33553, female: 3231 },
  { year: '2024-25', male: 24232, female: 2941 },
]

export default function DrivingLicense() {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedRto, setSelectedRto] = useState(null)

  const openYear = (d) => {
    const idx = dlGrowth.findIndex(y => y.year === d.year)
    const prev = dlGrowth[idx - 1]
    setSelectedYear({ ...d, growth: prev ? (((d.total - prev.total) / prev.total) * 100).toFixed(2) : null })
  }
  const openRto = (r) => {
    const rank = [...topRTOs].sort((a, b) => b.total - a.total).findIndex(x => x.rto === r.rto) + 1
    setSelectedRto({ ...r, rank })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Top Stats – DL Issued 2024-25 */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding:'8px 20px 6px', borderBottom:'1px solid #F3F4F6' }}>
          <span style={{ fontSize:11.5, color:'#9CA3AF', fontWeight:500 }}>
            Karnataka State · Driving Licenses Issued 2024-25 (01-04-2024 to 31-03-2025)
          </span>
        </div>
        <div style={{ display:'flex' }}>
          {[
            { value: '14,37,386', label: 'Total DL Issued' },
            { value: '44,214',    label: 'Professional DL' },
            { value: '13,93,172', label: 'Non-Professional DL' },
            { value: '2,35,492',  label: 'Female DL Issued' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex:1, textAlign:'center', padding:'20px 16px',
              borderRight: i < arr.length-1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize:28, fontWeight:700, color:'#1F2937', marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:13, color:'#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* DL Growth Chart + Gender Distribution */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:18 }}>
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:4 }}>
            Total Driving Licenses – Karnataka (Cumulative)
          </h3>
          <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:14 }}>All valid DLs as on 31st March each year · Y-axis in Millions (M)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dlGrowth} margin={{ top:5, right:10, left:10, bottom:0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize:12, fill:'#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={v => [v.toLocaleString('en-IN'), 'Total DLs']} />
              <Bar dataKey="total" fill="#7C3AED" radius={[5,5,0,0]} maxBarSize={48} onClick={openYear} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:16, marginTop:8, flexWrap:'wrap' }}>
            {[
              { yr:'2022', val:'2,09,90,707' },
              { yr:'2023', val:'2,23,43,999' },
              { yr:'2024', val:'2,52,07,926' },
              { yr:'2025', val:'2,67,86,228' },
            ].map(({ yr, val }) => (
              <div key={yr} style={{ fontSize:11.5, color:'#6B7280' }}>
                <span style={{ fontWeight:600, color:'#1F2937' }}>{yr}:</span> {val}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#1F2937', marginBottom:12 }}>Professional vs Non-Professional</h3>
          <div style={{ position:'relative', width:'100%', height:160 }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={dlCategories} cx="50%" cy="50%"
                  innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={2} stroke="white">
                  {dlCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)',
              fontSize:16, fontWeight:700, color:'#1F2937', textAlign:'center', lineHeight:1.2,
            }}>
              14.37L<div style={{ fontSize:10, color:'#9CA3AF', fontWeight:400 }}>Total</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
            {dlCategories.map(item => (
              <div key={item.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'#6B7280' }}>
                  <span style={{ width:7,height:7,borderRadius:'50%',background:item.color,display:'inline-block' }}/>
                  {item.name}
                </span>
                <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{item.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pendency & SLA – using real stats */}
      <div>
        <h2 style={{ fontSize:18, fontWeight:700, color:'#1F2937', marginBottom:4 }}>Key DL Statistics</h2>
        <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:12 }}>
          Male/Female figures are new DLs issued in FY 2024-25 only · Total is the cumulative count of all DLs ever issued
        </p>
        <Card style={{ padding:0 }}>
          <div style={{ display:'flex' }}>
            {[
              { value:'12,01,894', label:'Male DL Issued (2024-25)' },
              { value:'2,35,492',  label:'Female DL Issued (2024-25)' },
              { value:'2,67,86,228', label:'Total DLs Issued (Cumulative, as of 31-03-2025)' },
              { value:'97.7%',     label:'DL Growth vs Last Year' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                flex:1, textAlign:'center', padding:'22px 16px',
                borderRight: i < arr.length-1 ? '1px solid #F3F4F6' : 'none',
              }}>
                <div style={{ fontSize:22, fontWeight:700, color:'#1F2937', marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:12.5, color:'#9CA3AF' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top RTOs */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:14 }}>Top RTOs – DL Issued (Non-Professional) 2024-25</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topRTOs} layout="vertical" margin={{ top:0, right:40, left:80, bottom:0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize:10.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="rto" tick={{ fontSize:10.5, fill:'#374151' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => [v.toLocaleString('en-IN'), 'DL Issued']} />
              <Bar dataKey="total" fill="#7C3AED" radius={[0,4,4,0]} maxBarSize={18} onClick={openRto} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:14 }}>Conductor License Issued 2024-25</h3>
          <div style={{ display:'flex', gap:18, marginBottom:14 }}>
            {[
              { label:'Total Issued 2024-25', value:'27,179', color:'#7C3AED' },
              { label:'Male', value:'24,232', color:'#60A5FA' },
              { label:'Female', value:'2,941', color:'#C4B5FD' },
            ].map(c => (
              <div key={c.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:700, color:c.color }}>{c.value}</div>
                <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{c.label}</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={155}>
            <BarChart data={conductorLic} margin={{ top:5, right:5, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize:11.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip />
              <Bar dataKey="male" fill="#7C3AED" radius={[3,3,0,0]} maxBarSize={26} name="Male" />
              <Bar dataKey="female" fill="#C4B5FD" radius={[3,3,0,0]} maxBarSize={26} name="Female" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:14, marginTop:6 }}>
            {[['#7C3AED','Male'],['#C4B5FD','Female']].map(([c,l]) => (
              <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#6B7280' }}>
                <span style={{ width:8,height:8,borderRadius:'50%',background:c,display:'inline-block' }}/>{l}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* DL Revenue Section */}
      <div>
        <h2 style={{ fontSize:18, fontWeight:700, color:'#1F2937', marginBottom:12 }}>Transport Revenue</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
          {[
            { label:'Revenue Collected 2024-25', value:'₹11,744.67 Cr', sub:'97.67% of ₹12,500 Cr target', color:'#7C3AED',
              spark: [4608,5262,5954,6205,6348,5625,6747,9487,11106,11744].map(v=>({v})) },
            { label:'Revenue Collected 2025-26', value:'₹10,594.64 Cr', sub:'89.09% of ₹15,000 Cr target', color:'#F59E0B',
              spark: [1000,1500,2200,3100,4000,5000,6200,7500,9000,10594].map(v=>({v})) },
            { label:'Expenditure 2024-25',       value:'₹338.21 Cr',    sub:'2.87% of revenue collected',   color:'#34D399',
              spark: [106,121,132,145,155,335,279,491,271,338].map(v=>({v})) },
          ].map(card => (
            <Card key={card.label} style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 20px' }}>
              <div style={{ width:80, height:44, flexShrink:0 }}>
                <ResponsiveContainer width="100%" height={44}>
                  <LineChart data={card.spark}>
                    <Line type="monotone" dataKey="v" stroke={card.color} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div style={{ fontSize:18, fontWeight:700, color:'#1F2937' }}>{card.value}</div>
                <div style={{ fontSize:12, color:'#374151', fontWeight:600, marginTop:2, lineHeight:1.3 }}>{card.label}</div>
                <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{card.sub}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <DetailModal
        open={!!selectedYear}
        onClose={() => setSelectedYear(null)}
        title={`Driving Licenses — ${selectedYear?.year}`}
        subtitle="Cumulative DLs as on 31st March"
        rows={selectedYear ? [
          ['Total DLs', selectedYear.total.toLocaleString('en-IN')],
          ...(selectedYear.growth !== null ? [['YoY Growth', `+${selectedYear.growth}%`]] : []),
        ] : []}
      />

      <DetailModal
        open={!!selectedRto}
        onClose={() => setSelectedRto(null)}
        title={selectedRto?.rto}
        subtitle="DL Issued (Non-Professional) 2024-25"
        rows={selectedRto ? [
          ['DL Issued', selectedRto.total.toLocaleString('en-IN')],
          ['Rank Among Listed RTOs', `#${selectedRto.rank} of ${topRTOs.length}`],
        ] : []}
      />
    </div>
  )
}
