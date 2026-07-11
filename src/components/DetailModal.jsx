import { X } from 'lucide-react'

export default function DetailModal({ open, onClose, title, subtitle, accent = '#7C3AED', rows = [], children }) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 16, width: '100%', maxWidth: 460,
          maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{
          padding: '18px 22px', borderBottom: '1px solid #F3F4F6',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          borderTop: `3px solid ${accent}`, borderRadius: '16px 16px 0 0',
        }}>
          <div>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: '#1F2937' }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 3 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} style={{
            background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <X size={14} color="#6B7280" />
          </button>
        </div>

        {rows.length > 0 && (
          <div style={{ padding: '6px 22px' }}>
            {rows.map(([label, value], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '11px 0', borderBottom: i < rows.length - 1 ? '1px solid #F9FAFB' : 'none',
              }}>
                <span style={{ fontSize: 12.5, color: '#6B7280' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {children && <div style={{ padding: '4px 22px 20px' }}>{children}</div>}
      </div>
    </div>
  )
}
