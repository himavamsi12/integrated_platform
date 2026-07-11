import { Download } from 'lucide-react'
import { downloadCsv } from '../utils/csv'

export default function ExportButton({ filename, headers, rows, label = 'Export CSV' }) {
  return (
    <button
      onClick={() => downloadCsv(filename, headers, rows)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
        border: '1px solid #E5E7EB', borderRadius: 8, background: 'white',
        fontSize: 12.5, fontWeight: 600, color: '#374151', cursor: 'pointer',
      }}
    >
      <Download size={13} /> {label}
    </button>
  )
}
