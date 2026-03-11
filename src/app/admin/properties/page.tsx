'use client';

import * as React from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/properties`
  : 'http://localhost:4000/properties';

const LOCALITIES = ['Gachibowli', 'Kondapur', 'Banjara Hills', 'HITEC City', 'Kompally', 'Narsingi', 'Financial District', 'Uppal', 'LB Nagar', 'Shadnagar'];
const BHKS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Plot'];
const STATUS_OPTIONS = ['Available', 'Sold Out', 'Coming Soon', 'Under Construction'];

interface Property {
  id: string;
  title: string;
  description: string;
  builderName: string;
  location: string;
  price: number;
  bhk?: string;
  status?: string;
  reraNumber?: string;
  images?: string[];
}

const EMPTY_FORM = {
  title: '', description: '', builderName: '', location: '',
  price: '', bhk: '', status: 'Available', reraNumber: '', images: '',
};

/* ─── Inline Drawer ─── */
function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '500px',
        background: '#fff', height: '100%', overflowY: 'auto',
        boxShadow: '-8px 0 40px rgba(59,31,94,0.18)',
        animation: 'drawerIn 0.3s ease',
      }}>
        <style>{`@keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        <div style={{ padding: '22px 24px', borderBottom: '1px solid #E8D8F5', background: 'linear-gradient(135deg, #3B1F5E, #5A2D82)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '18px', fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Form Field ─── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#5A2D82', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1.5px solid #DDD0EC', borderRadius: '9px',
  fontSize: '14px', fontFamily: 'DM Sans, sans-serif',
  color: '#1f1f2e', outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.2s',
};

export default function PropertiesPage() {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ ...EMPTY_FORM });
  const [saving, setSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [toast, setToast] = React.useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchProperties = async () => {
    try { const r = await axios.get(API_URL); setProperties(r.data); }
    catch { setProperties([]); }
    finally { setLoading(false); }
  };

  React.useEffect(() => { fetchProperties(); }, []);

  const openAdd = () => { setEditId(null); setForm({ ...EMPTY_FORM }); setDrawerOpen(true); };
  const openEdit = (p: Property) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, builderName: p.builderName, location: p.location, price: String(p.price), bhk: p.bhk || '', status: p.status || 'Available', reraNumber: p.reraNumber || '', images: p.images?.join(', ') || '' });
    setDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [] };
      editId ? await axios.patch(`${API_URL}/${editId}`, payload) : await axios.post(API_URL, payload);
      await fetchProperties();
      setDrawerOpen(false);
      showToast(editId ? '✅ Property updated!' : '✅ Property added!');
    } catch { alert('Failed to save. Is the backend running on port 4000?'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this property?')) return;
    try { await axios.delete(`${API_URL}/${id}`); await fetchProperties(); showToast('🗑️ Property deleted.'); }
    catch { alert('Delete failed.'); }
  };

  const filtered = properties.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase()) ||
    p.builderName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, background: '#3B1F5E', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', boxShadow: '0 8px 24px rgba(59,31,94,0.3)', animation: 'fadeIn 0.3s ease' }}>
          <style>{`@keyframes fadeIn { from { opacity:0;transform:translateY(-10px) } to { opacity:1;transform:translateY(0) } }`}</style>
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', color: '#3B1F5E', fontWeight: 700 }}>🏢 Properties</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>{properties.length} total listing{properties.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 22px', background: 'linear-gradient(135deg, #3B1F5E, #5A2D82)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(59,31,94,0.3)', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '18px' }}>+</span> Add Property
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '18px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search by title, location, builder..."
          style={{ ...inputStyle, width: '100%', maxWidth: '420px', background: '#fff' }}
          onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')}
          onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8D8F5', boxShadow: '0 2px 12px rgba(59,31,94,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#9CA3AF' }}>⏳ Loading properties...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏢</div>
            <p style={{ color: '#9CA3AF', fontSize: '15px' }}>{search ? 'No properties match your search.' : 'No properties yet. Add your first listing!'}</p>
            {!search && <button onClick={openAdd} style={{ marginTop: '16px', padding: '11px 24px', background: '#3B1F5E', color: '#fff', border: 'none', borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '14px' }}>+ Add First Property</button>}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#F2EAF7' }}>
                  {['Property', 'Builder', 'Location', 'BHK', 'Price', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#5A2D82', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #F0E8FA', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FDFBFF')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#3B1F5E', fontSize: '14px' }}>{p.title}</div>
                      {p.reraNumber && <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>RERA: {p.reraNumber}</div>}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B7280' }}>{p.builderName}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B7280' }}>{p.location}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B7280' }}>{p.bhk || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#3B1F5E', whiteSpace: 'nowrap' }}>
                      ₹{p.price?.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                        background: p.status === 'Available' ? '#d1fae5' : p.status === 'Sold Out' ? '#fee2e2' : '#fef3c7',
                        color: p.status === 'Available' ? '#065f46' : p.status === 'Sold Out' ? '#991b1b' : '#92400e',
                      }}>
                        {p.status || 'Available'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <button onClick={() => openEdit(p)} style={{ background: '#F2EAF7', border: 'none', color: '#5A2D82', fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', marginRight: '6px', fontFamily: 'inherit', transition: 'all 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#5A2D82', e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#F2EAF7', e.currentTarget.style.color = '#5A2D82')}
                      >✏️ Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', fontSize: '13px', fontWeight: 500, padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#DC2626', e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#FEF2F2', e.currentTarget.style.color = '#DC2626')}
                      >🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editId ? '✏️ Edit Property' : '🏢 Add New Property'}>
        <form onSubmit={handleSave}>
          <Field label="Property Title" required>
            <input style={inputStyle} required placeholder="e.g. Luxury 3BHK in Gachibowli" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Builder Name" required>
              <input style={inputStyle} required placeholder="e.g. Prestige Group" value={form.builderName} onChange={e => setForm({ ...form, builderName: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
            </Field>
            <Field label="Location" required>
              <select style={inputStyle} required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                <option value="">Select locality</option>
                {LOCALITIES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Price (₹)" required>
              <input style={inputStyle} type="number" required placeholder="e.g. 8500000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
            </Field>
            <Field label="BHK Type">
              <select style={inputStyle} value={form.bhk} onChange={e => setForm({ ...form, bhk: e.target.value })}>
                <option value="">Select BHK</option>
                {BHKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Status">
              <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="RERA Number">
              <input style={inputStyle} placeholder="e.g. P02400003001" value={form.reraNumber} onChange={e => setForm({ ...form, reraNumber: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
            </Field>
          </div>
          <Field label="Description" required>
            <textarea style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} required placeholder="Describe the property in detail..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <Field label="Image URLs (comma separated)">
            <input style={inputStyle} placeholder="https://img1.jpg, https://img2.jpg" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <div style={{ paddingTop: '16px', borderTop: '1px solid #F0E8FA', display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button type="button" onClick={() => setDrawerOpen(false)} style={{ padding: '11px 20px', background: '#F2EAF7', border: 'none', borderRadius: '9px', color: '#5A2D82', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '11px 24px', background: 'linear-gradient(135deg, #3B1F5E, #5A2D82)', border: 'none', borderRadius: '9px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: saving ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '7px' }}>
              {saving ? '⏳ Saving...' : (editId ? '✅ Update Property' : '+ Save Property')}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
