import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area,
} from 'recharts'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

// Real year-wise revenue data from PDF (₹ Crores)
const revenueHistory = [
  { year: '2014-15', target: 3984,  collected: 4145,  pct: 104.00, exp: 106 },
  { year: '2015-16', target: 4397,  collected: 4608,  pct: 104.81, exp: 121 },
  { year: '2016-17', target: 5026,  collected: 5262,  pct: 104.68, exp: 123 },
  { year: '2017-18', target: 5561,  collected: 5954,  pct: 107.06, exp: 132 },
  { year: '2018-19', target: 6167,  collected: 6205,  pct: 100.62, exp: 145 },
  { year: '2019-20', target: 6601,  collected: 6348,  pct: 96.16,  exp: 155 },
  { year: '2020-21', target: 5518,  collected: 5625,  pct: 101.93, exp: 335 },
  { year: '2021-22', target: 6986,  collected: 6747,  pct: 96.57,  exp: 279 },
  { year: '2022-23', target: 9007,  collected: 9487,  pct: 105.33, exp: 491 },
  { year: '2023-24', target: 11500, collected: 11106, pct: 96.58,  exp: 271 },
  { year: '2024-25', target: 12500, collected: 11744, pct: 97.67,  exp: 338 },
  { year: '2025-26*',target: 15000, collected: 10594, pct: 89.09,  exp: 260 },
]

// EV Registration year-wise (from PDF)
const evGrowth = [
  { year: '2019-20', total: 7157,   scooter: 4616,   car: 186 },
  { year: '2020-21', total: 12992,  scooter: 9466,   car: 701 },
  { year: '2021-22', total: 46143,  scooter: 35740,  car: 1717 },
  { year: '2022-23', total: 113999, scooter: 95160,  car: 4509 },
  { year: '2023-24', total: 170488, scooter: 143433, car: 10299 },
  { year: '2024-25', total: 173841, scooter: 137569, car: 12191 },
]

// EV category breakdown 2024-25
const evCategories = [
  { name: 'M-Cycle/Scooter',         value: 137569, color: '#7C3AED', pct: '89%' },
  { name: 'Scooter (Used for Hire)',  value: 5226,   color: '#60A5FA', pct: '3%'  },
  { name: 'Motor Car',                value: 12191,  color: '#34D399', pct: '8%'  },
]

// GSDP Road Transport data (₹ Crores, Current Prices)
const gsdpRoadTransport = [
  { year: '2018-19', value: 47055 },
  { year: '2019-20', value: 55154 },
  { year: '2020-21', value: 50330 },
]

export default function TaxRevenue() {
  const latest = revenueHistory[revenueHistory.length - 1]
  const prev   = revenueHistory[revenueHistory.length - 2]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Top Stats – Latest Revenue */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding:'8px 20px 6px', borderBottom:'1px solid #F3F4F6' }}>
          <span style={{ fontSize:11.5, color:'#9CA3AF', fontWeight:500 }}>
            Karnataka Transport Revenue · 2025-26 (up to 31-01-2026)
          </span>
        </div>
        <div style={{ display:'flex' }}>
          {[
            { value:`₹${latest.target.toLocaleString('en-IN')} Cr`, label:'Revenue Target 2025-26' },
            { value:`₹10,594.64 Cr`,                                label:'Revenue Collected' },
            { value:`${latest.pct}%`,                               label:'% of Collection' },
            { value:`₹${latest.exp} Cr`,                            label:'Total Expenditure' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex:1, textAlign:'center', padding:'20px 16px',
              borderRight: i < arr.length-1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize:24, fontWeight:700, color:'#1F2937', marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:12.5, color:'#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Trend – full history */}
      <Card>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:4 }}>
          Year-wise Revenue: Target vs Collected (₹ Crores)
        </h3>
        <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:14 }}>
          * 2025-26 collection as on 31-01-2026
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={revenueHistory} margin={{ top:5, right:10, left:10, bottom:0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize:9.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:10.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${v.toLocaleString('en-IN')}`} />
            <Tooltip formatter={(v, n) => [`₹${v.toLocaleString('en-IN')} Cr`, n === 'target' ? 'Target' : 'Collected']} />
            <Bar dataKey="target"    fill="#EDE9FE" radius={[3,3,0,0]} maxBarSize={22} name="Target" />
            <Bar dataKey="collected" fill="#7C3AED" radius={[3,3,0,0]} maxBarSize={22} name="Collected" />
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{ display:'flex', gap:16, marginTop:8 }}>
          {[['#EDE9FE','Target'],['#7C3AED','Collected']].map(([c,l]) => (
            <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#6B7280' }}>
              <span style={{ width:8,height:8,borderRadius:'50%',background:c,display:'inline-block',border:'1px solid #D1D5DB' }}/>{l}
            </span>
          ))}
        </div>
      </Card>

      {/* Revenue % Collection Table */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding:'16px 20px 10px', borderBottom:'1px solid #F3F4F6' }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937' }}>Year-wise Revenue Details</h3>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:600 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #F3F4F6', background:'#FAFAFA' }}>
                {['Year', 'Target (₹ Cr)', 'Collected (₹ Cr)', '% Collection', 'Expenditure (₹ Cr)', '% Exp'].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:12, fontWeight:500, color:'#6B7280', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueHistory.map((row, i) => (
                <tr key={row.year} style={{
                  borderBottom: i < revenueHistory.length-1 ? '1px solid #F9FAFB' : 'none',
                  background: i === revenueHistory.length-1 ? '#FFF8F0' : i === revenueHistory.length-2 ? '#F5F3FF' : 'white',
                }}>
                  <td style={{ padding:'10px 14px', fontSize:13, fontWeight: i >= revenueHistory.length-2 ? 700 : 400, color:'#374151' }}>{row.year}</td>
                  <td style={{ padding:'10px 14px', fontSize:13, color:'#374151' }}>{row.target.toLocaleString('en-IN')}</td>
                  <td style={{ padding:'10px 14px', fontSize:13, fontWeight:600, color:'#374151' }}>{row.collected.toLocaleString('en-IN')}</td>
                  <td style={{ padding:'10px 14px' }}>
                    <span style={{
                      fontSize:12.5, fontWeight:600,
                      color: row.pct >= 100 ? '#22C55E' : '#F59E0B',
                    }}>{row.pct}%</span>
                  </td>
                  <td style={{ padding:'10px 14px', fontSize:13, color:'#374151' }}>{row.exp}</td>
                  <td style={{ padding:'10px 14px', fontSize:12.5, color:'#9CA3AF' }}>
                    {((row.exp/row.collected)*100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'8px 16px', background:'#F9FAFB', borderTop:'1px solid #F3F4F6', display:'flex', gap:24 }}>
          <span style={{ fontSize:11, color:'#9CA3AF' }}>
            <span style={{ display:'inline-block',width:10,height:10,background:'#F5F3FF',border:'1px solid #DDD6FE',borderRadius:2,marginRight:4 }}/>
            2024-25 (Latest Full Year)
          </span>
          <span style={{ fontSize:11, color:'#9CA3AF' }}>
            <span style={{ display:'inline-block',width:10,height:10,background:'#FFF8F0',border:'1px solid #FDE68A',borderRadius:2,marginRight:4 }}/>
            2025-26 (Up to 31-01-2026)
          </span>
        </div>
      </Card>

      {/* EV Registration */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:18 }}>
        <Card>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:4 }}>Electric Vehicle Registration – Year-wise Growth</h3>
          <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:14 }}>Source: Parivahan, Karnataka State</p>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={evGrowth} margin={{ top:5, right:10, left:10, bottom:0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize:10, fill:'#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10.5, fill:'#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v, n) => [v.toLocaleString('en-IN'), n === 'total' ? 'Total EVs' : n === 'scooter' ? 'M-Cycle/Scooter' : 'Motor Car']} />
              <Area type="monotone" dataKey="total"   stroke="#7C3AED" fill="#EDE9FE" strokeWidth={2.5} dot={false} name="Total EVs" />
              <Line type="monotone" dataKey="scooter" stroke="#60A5FA" strokeWidth={2} dot={false} name="M-Cycle/Scooter" />
              <Line type="monotone" dataKey="car"     stroke="#34D399" strokeWidth={2} dot={false} name="Motor Car" />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:14, marginTop:8 }}>
            {[['#7C3AED','Total EVs'],['#60A5FA','Scooter'],['#34D399','Car']].map(([c,l]) => (
              <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#6B7280' }}>
                <span style={{ width:8,height:8,borderRadius:'50%',background:c,display:'inline-block' }}/>{l}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#1F2937', marginBottom:4 }}>EV Breakdown 2024-25</h3>
          <p style={{ fontSize:11, color:'#9CA3AF', marginBottom:12 }}>Total: 1,73,841 vehicles</p>
          <div style={{ position:'relative', width:'100%', height:160 }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={evCategories} cx="50%" cy="50%"
                  innerRadius={48} outerRadius={70} dataKey="value" strokeWidth={2} stroke="white">
                  {evCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)',
              fontSize:16, fontWeight:700, color:'#1F2937', textAlign:'center', lineHeight:1.2,
            }}>
              1.74L<div style={{ fontSize:10, color:'#9CA3AF', fontWeight:400 }}>EVs</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
            {evCategories.map(item => (
              <div key={item.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'#6B7280' }}>
                  <span style={{ width:7,height:7,borderRadius:'50%',background:item.color,display:'inline-block' }}/>
                  <span style={{ lineHeight:1.3 }}>{item.name}</span>
                </span>
                <span style={{ fontSize:12, fontWeight:700, color:'#374151' }}>
                  {item.value.toLocaleString('en-IN')}
                  <span style={{ color:'#9CA3AF', fontWeight:400, marginLeft:4, fontSize:11 }}>({item.pct})</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* GSDP Road Transport Contribution */}
      <Card>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937', marginBottom:4 }}>
          GSDP – Road Transport Contribution (₹ Crores, Current Prices)
        </h3>
        <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:14 }}>Karnataka State Road Transport's contribution to Gross State Domestic Product</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14 }}>
          {gsdpRoadTransport.map(item => (
            <div key={item.year} style={{
              background:'#F5F3FF', borderRadius:10, padding:'16px 20px', textAlign:'center',
              border:'1px solid #EDE9FE',
            }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#7C3AED' }}>₹{item.value.toLocaleString('en-IN')} Cr</div>
              <div style={{ fontSize:13, color:'#6B7280', marginTop:4 }}>{item.year}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, padding:'10px 14px', background:'#FAFAFA', borderRadius:8, fontSize:12.5, color:'#6B7280' }}>
          Road Transport consistently ranks as the <strong style={{ color:'#7C3AED' }}>highest contributing industry</strong> among transport sectors in Karnataka GSDP,
          surpassing Railways, Air Transport, and Water Transport combined.
        </div>
      </Card>
    </div>
  )
}
