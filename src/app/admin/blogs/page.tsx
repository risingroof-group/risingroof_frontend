'use client';

import * as React from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/blogs`
  : 'http://localhost:4000/blogs';

const CATEGORIES = ['Market Update', 'Investment Guide', 'Area Guide', 'Legal & RERA', 'NRI Corner', 'First-Time Buyer', 'Property Tips', 'News'];

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  category?: string;
  coverImage?: string;
  author?: string;
  published?: boolean;
}

const EMPTY = { title: '', summary: '', content: '', category: '', coverImage: '', author: 'RisingRoof Team', published: false };

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  React.useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: '560px', background: '#fff', height: '100%', overflowY: 'auto', boxShadow: '-8px 0 40px rgba(59,31,94,0.18)', animation: 'drawerIn 0.3s ease' }}>
        <style>{`@keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        <div style={{ padding: '22px 24px', borderBottom: '1px solid #E8D8F5', background: 'linear-gradient(135deg, #0B1F3A, #1a3a6b)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '18px', fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0B1F3A', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>
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
  color: '#1f1f2e', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
};

export default function BlogsPage() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ ...EMPTY });
  const [saving, setSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [toast, setToast] = React.useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200); };

  const fetchBlogs = async () => {
    try { const r = await axios.get(API_URL); setBlogs(r.data); }
    catch { setBlogs([]); }
    finally { setLoading(false); }
  };
  React.useEffect(() => { fetchBlogs(); }, []);

  const openAdd = () => { setEditId(null); setForm({ ...EMPTY }); setDrawerOpen(true); };
  const openEdit = (b: Blog) => {
    setEditId(b.id);
    setForm({ title: b.title, summary: b.summary, content: b.content, category: b.category || '', coverImage: b.coverImage || '', author: b.author || 'RisingRoof Team', published: b.published ?? false });
    setDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      editId ? await axios.patch(`${API_URL}/${editId}`, form) : await axios.post(API_URL, form);
      await fetchBlogs(); setDrawerOpen(false);
      showToast(editId ? '✅ Blog updated!' : '✅ Blog published!');
    } catch { alert('Failed to save. Is the backend running on port 4000?'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try { await axios.delete(`${API_URL}/${id}`); await fetchBlogs(); showToast('🗑️ Blog deleted.'); }
    catch { alert('Delete failed.'); }
  };

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, background: '#0B1F3A', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', boxShadow: '0 8px 24px rgba(11,31,58,0.3)', animation: 'fadeIn 0.3s ease' }}>
          <style>{`@keyframes fadeIn { from { opacity:0;transform:translateY(-10px) } to { opacity:1;transform:translateY(0) } }`}</style>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', color: '#0B1F3A', fontWeight: 700 }}>📝 Blog Posts</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>{blogs.length} total post{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 22px', background: 'linear-gradient(135deg, #0B1F3A, #1a3a6b)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(11,31,58,0.25)', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '18px' }}>+</span> Write Blog Post
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '18px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by title or category..."
          style={{ ...inputStyle, width: '100%', maxWidth: '400px', background: '#fff' }}
          onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
      </div>

      {/* Blog Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>⏳ Loading blog posts...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8D8F5', padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
          <p style={{ color: '#9CA3AF', fontSize: '15px' }}>{search ? 'No posts match your search.' : 'No blog posts yet. Write your first post!'}</p>
          {!search && <button onClick={openAdd} style={{ marginTop: '16px', padding: '11px 24px', background: '#0B1F3A', color: '#fff', border: 'none', borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '14px' }}>+ Write First Post</button>}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
          {filtered.map(b => (
            <div key={b.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8D8F5', overflow: 'hidden', boxShadow: '0 2px 12px rgba(59,31,94,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,31,94,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(59,31,94,0.06)'; }}
            >
              {/* Cover */}
              <div style={{ height: '120px', background: b.coverImage ? `url(${b.coverImage}) center/cover` : 'linear-gradient(135deg, #0B1F3A, #1a3a6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', position: 'relative' }}>
                {!b.coverImage && '📰'}
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <span style={{ background: b.published ? '#d1fae5' : '#fef3c7', color: b.published ? '#065f46' : '#92400e', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '12px' }}>
                    {b.published ? '✅ Published' : '📋 Draft'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '18px' }}>
                {b.category && <span style={{ background: '#F2EAF7', color: '#5A2D82', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '4px', letterSpacing: '0.04em' }}>{b.category}</span>}
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#0B1F3A', fontSize: '16px', fontWeight: 700, margin: '10px 0 8px', lineHeight: 1.35 }}>{b.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>{b.summary?.slice(0, 110)}{b.summary?.length > 110 ? '...' : ''}</p>
                {b.author && <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '16px' }}>By {b.author}</div>}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEdit(b)} style={{ flex: 1, padding: '9px', background: '#F2EAF7', border: 'none', color: '#5A2D82', fontSize: '13px', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#5A2D82'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F2EAF7'; e.currentTarget.style.color = '#5A2D82'; }}
                  >✏️ Edit</button>
                  <button onClick={() => handleDelete(b.id)} style={{ width: '40px', padding: '9px', background: '#FEF2F2', border: 'none', color: '#DC2626', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#DC2626'; }}
                  >🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editId ? '✏️ Edit Blog Post' : '📝 Write New Blog Post'}>
        <form onSubmit={handleSave}>
          <Field label="Blog Title" required>
            <input style={inputStyle} required placeholder="e.g. Top 5 Areas to Invest in Hyderabad 2025" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Category">
              <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Author">
              <input style={inputStyle} placeholder="e.g. RisingRoof Team" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
            </Field>
          </div>
          <Field label="Summary / Excerpt" required>
            <textarea style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }} required placeholder="Brief description shown in blog cards (150 chars)..." value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <Field label="Full Content" required>
            <textarea style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }} required placeholder="Write your complete blog article here..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <Field label="Cover Image URL">
            <input style={inputStyle} placeholder="https://example.com/image.jpg" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = '#0B1F3A')} onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')} />
          </Field>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: '#F2EAF7', borderRadius: '10px', marginBottom: '16px' }}>
            <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3B1F5E' }} />
            <label htmlFor="published" style={{ fontSize: '14px', fontWeight: 600, color: '#0B1F3A', cursor: 'pointer' }}>
              Publish immediately (visible on website)
            </label>
          </div>
          <div style={{ paddingTop: '16px', borderTop: '1px solid #F0E8FA', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setDrawerOpen(false)} style={{ padding: '11px 20px', background: '#F0F4F8', border: 'none', borderRadius: '9px', color: '#0B1F3A', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '11px 24px', background: 'linear-gradient(135deg, #0B1F3A, #1a3a6b)', border: 'none', borderRadius: '9px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: saving ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '7px' }}>
              {saving ? '⏳ Saving...' : (editId ? '✅ Update Post' : (form.published ? '🚀 Publish Post' : '💾 Save Draft'))}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
