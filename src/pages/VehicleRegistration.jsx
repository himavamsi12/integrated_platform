import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
    {children}
  </div>
)

// Real monthly data from PDF (April 2025 – Jan 2026, Karnataka State)
const monthlyKarnataka = [
  { month: 'Apr', twoWheelers: 111898, cars: 25436, total: 145364 },
  { month: 'May', twoWheelers: 94456,  cars: 20068, total: 148268 },
  { month: 'Jun', twoWheelers: 191237, cars: 33472, total: 141324 },
  { month: 'Jul', twoWheelers: 126678, cars: 26225, total: 133924 },
  { month: 'Aug', twoWheelers: 84389,  cars: 23782, total: 161214 },
  { month: 'Sep', twoWheelers: 130278, cars: 33864, total: 136234 },
  { month: 'Oct', twoWheelers: 103265, cars: 22608, total: 252420 },
  { month: 'Nov', twoWheelers: 104899, cars: 20501, total: 179735 },
  { month: 'Dec', twoWheelers: 98824,  cars: 19580, total: 130313 },
  { month: 'Jan', twoWheelers: 91321,  cars: 20006, total: 193498 },
]

// Bengaluru city monthly (2025-26)
const monthlyBengaluru = [
  { month: 'Apr', twoWheelers: 36888, cars: 12278 },
  { month: 'May', twoWheelers: 39086, cars: 11225 },
  { month: 'Jun', twoWheelers: 42210, cars: 11184 },
  { month: 'Jul', twoWheelers: 40569, cars: 11026 },
  { month: 'Aug', twoWheelers: 45595, cars: 13318 },
  { month: 'Sep', twoWheelers: 38990, cars: 9997  },
  { month: 'Oct', twoWheelers: 59863, cars: 15935 },
  { month: 'Nov', twoWheelers: 45898, cars: 13920 },
  { month: 'Dec', twoWheelers: 32874, cars: 12861 },
  { month: 'Jan', twoWheelers: 50237, cars: 17363 },
]

// Division-wise 2024-25 new registrations
const divisionData = [
  { name: 'Bangalore\nUrban', value: 627009, color: '#7C3AED' },
  { name: 'Belgavi',          value: 285046, color: '#60A5FA' },
  { name: 'Mysuru',           value: 216955, color: '#34D399' },
  { name: 'Shimoga',          value: 176602, color: '#F59E0B' },
  { name: 'Kalaburagi',       value: 185164, color: '#F87171' },
  { name: 'Bangalore\nRural', value: 146942, color: '#A78BFA' },
]

// Vehicle category data as on 31-03-2025
const categoryData = [
  { name: 'Two Wheelers',        newly2425: 1295534, total: 23700297, pct: 5.47, color: '#7C3AED' },
  { name: 'Cars',                newly2425: 266786,  total: 4916769,  pct: 5.43, color: '#60A5FA' },
  { name: 'Tractors',            newly2425: 50860,   total: 831906,   pct: 6.11, color: '#34D399' },
  { name: 'Light Motor Vehicles',newly2425: 57261,   total: 968661,   pct: 5.91, color: '#F59E0B' },
  { name: 'Motor Cabs & Taxis',  newly2425: 36057,   total: 545837,   pct: 6.61, color: '#F87171' },
  { name: 'LMV Passenger',       newly2425: 74851,   total: 1077305,  pct: 6.95, color: '#A78BFA' },
  { name: 'Trucks & Lorries',    newly2425: 16641,   total: 559862,   pct: 2.97, color: '#9CA3AF' },
  { name: 'Buses',               newly2425: 10533,   total: 289345,   pct: 3.64, color: '#06B6D4' },
]

// Revenue sparklines
const spark = (vals) => vals.map(v => ({ v }))
const revenueCards = [
  { label: 'Two Wheelers Registered', value: '11,37,245', sub: 'Cumulative Apr 25 - Jan 26', color: '#7C3AED',
    spark: spark([111898,94456,191237,126678,84389,130278,103265,104899,98824,91321]) },
  { label: 'Cars Registered',         value: '2,45,542',  sub: 'Cumulative Apr 25 - Jan 26', color: '#22C55E',
    spark: spark([25436,20068,33472,26225,23782,33864,22608,20501,19580,20006]) },
  { label: 'Bengaluru Total',          value: '6,49,550',  sub: 'Cumulative Apr 25 - Jan 26', color: '#06B6D4',
    spark: spark([49620,50722,53947,51960,59262,49386,76096,60267,46484,68098]) },
]

const rcTransactions = [
  { regNo: 'KA02PQ1122', type: 'Transfer',              status: 'Pending',    sc: '#F59E0B' },
  { regNo: 'KA01AA9832', type: 'Hypothecation Removal', status: 'Completed',  sc: '#22C55E' },
  { regNo: 'KA05MJ7763', type: 'Duplicate RC',          status: 'In Process', sc: '#60A5FA' },
]

export default function VehicleRegistration() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Top Stats – 2025-26 Cumulative (Apr 2025 to Jan 2026) */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '10px 20px 6px', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>
            Karnataka State · April 2025 – January 2026 (Cumulative)
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          {[
            { value: '16,22,294', label: 'Total Vehicles Registered' },
            { value: '14,52,407', label: 'Non-Transport Vehicles' },
            { value: '1,69,887',  label: 'Transport Vehicles' },
            { value: '6,49,550',  label: 'Bengaluru City Total' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center', padding: '18px 16px',
              borderRight: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Registration Trend */}
      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>
          Monthly Vehicle Registration Trend – Karnataka (2025-26)
        </h3>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>Source: Vahan Portal, NIC, GOI</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyKarnataka} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10.5, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v, n) => [v.toLocaleString('en-IN'), n === 'twoWheelers' ? 'Two Wheelers' : 'Cars']} />
            <Bar dataKey="twoWheelers" fill="#7C3AED" radius={[3,3,0,0]} maxBarSize={22} name="Two Wheelers" />
            <Bar dataKey="cars"        fill="#60A5FA" radius={[3,3,0,0]} maxBarSize={22} name="Cars" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
          {[['#7C3AED','Two Wheelers'],['#60A5FA','Cars']].map(([c,l]) => (
            <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#6B7280' }}>
              <span style={{ width:8,height:8,borderRadius:'50%',background:c,display:'inline-block' }}/>{l}
            </span>
          ))}
        </div>
      </Card>

      {/* Vehicle Category Details (as on 31-03-2025) + Division-wise */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
        {/* Category table */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '16px 20px 10px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Vehicle Categories – Karnataka as on 31-03-2025</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                {['Category', 'Newly Reg 2024-25', 'Total on Road', '% Growth'].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:12, fontWeight:500, color:'#6B7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryData.map((row, i) => (
                <tr key={row.name} style={{ borderBottom: i < categoryData.length-1 ? '1px solid #F9FAFB' : 'none' }}>
                  <td style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:8,height:8,borderRadius:'50%',background:row.color,flexShrink:0,display:'inline-block' }}/>
                    <span style={{ fontSize:12.5, color:'#374151' }}>{row.name}</span>
                  </td>
                  <td style={{ padding:'10px 14px', fontSize:12.5, color:'#374151' }}>{row.newly2425.toLocaleString('en-IN')}</td>
                  <td style={{ padding:'10px 14px', fontSize:12.5, color:'#374151' }}>{row.total.toLocaleString('en-IN')}</td>
                  <td style={{ padding:'10px 14px' }}>
                    <span style={{ fontSize:12.5, fontWeight:600, color: row.pct >= 5 ? '#22C55E' : '#F59E0B' }}>+{row.pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Division-wise bar chart */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>Division-wise 2024-25</h3>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>Newly Registered Vehicles</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={divisionData} layout="vertical" margin={{ top: 0, right: 30, left: 70, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10.5, fill: '#374151' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => [v.toLocaleString('en-IN'), 'Vehicles']} />
              <Bar dataKey="value" radius={[0,4,4,0]} maxBarSize={18}>
                {divisionData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* RC Transactions + Revenue Sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card style={{ padding: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', padding: '16px 20px 10px' }}>RC Transactions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                {['Reg No', 'Type', 'Status'].map(h => (
                  <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:12.5, fontWeight:500, color:'#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rcTransactions.map((row, i) => (
                <tr key={row.regNo} style={{ borderBottom: i < rcTransactions.length-1 ? '1px solid #F9FAFB':'none' }}>
                  <td style={{ padding:'13px 16px', fontSize:13.5, color:'#374151' }}>{row.regNo}</td>
                  <td style={{ padding:'13px 16px', fontSize:13.5, color:'#374151' }}>{row.type}</td>
                  <td style={{ padding:'13px 16px', fontSize:13.5, color:row.sc, fontWeight:500 }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Grand Total – Karnataka</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Total Registered (31-03-2025)', value: '3,34,71,365', color: '#7C3AED' },
              { label: 'Non-Transport Vehicles',        value: '3,00,08,187', color: '#22C55E' },
              { label: 'Transport Vehicles',            value: '34,63,178',   color: '#F59E0B' },
              { label: 'Bengaluru City (31-03-2025)',   value: '1,23,50,299', color: '#60A5FA' },
            ].map(item => (
              <div key={item.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'10px 14px', background:'#FAFAFA', borderRadius:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:8,height:8,borderRadius:'50%',background:item.color,display:'inline-block' }}/>
                  <span style={{ fontSize:12.5, color:'#6B7280' }}>{item.label}</span>
                </div>
                <span style={{ fontSize:14, fontWeight:700, color:'#1F2937' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Registration Revenue Cards with Sparklines */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Registration Trend (Monthly)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {revenueCards.map(card => (
            <Card key={card.label} style={{ display:'flex', alignItems:'center', gap:16, padding:'20px 24px' }}>
              <div style={{ width:90, height:48, flexShrink:0 }}>
                <ResponsiveContainer width="100%" height={48}>
                  <LineChart data={card.spark}>
                    <Line type="monotone" dataKey="v" stroke={card.color} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div style={{ fontSize:20, fontWeight:700, color:'#1F2937' }}>{card.value}</div>
                <div style={{ fontSize:12, color:'#374151', fontWeight:600, marginTop:2 }}>{card.label}</div>
                <div style={{ fontSize:11, color:'#9CA3AF', marginTop:1 }}>{card.sub}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 15+ Year Old Vehicles */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding:'16px 20px 10px', borderBottom:'1px solid #F3F4F6' }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#1F2937' }}>Vehicles &gt; 15 Years Old – as on 31-03-2025</h3>
        </div>
        <div style={{ display:'flex' }}>
          {[
            { label:'Bengaluru City (Total)',   value:'37,45,339' },
            { label:'Karnataka State (Total)',   value:'1,04,62,874' },
            { label:'Two Wheelers (KA)',         value:'70,49,003' },
            { label:'Cars (KA)',                  value:'15,77,937' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex:1, textAlign:'center', padding:'18px 16px',
              borderRight: i < arr.length-1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <div style={{ fontSize:22, fontWeight:700, color:'#EF4444', marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:12, color:'#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
