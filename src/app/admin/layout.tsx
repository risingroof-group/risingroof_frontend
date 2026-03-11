'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/properties', icon: '🏢', label: 'Properties' },
  { href: '/admin/blogs', icon: '📝', label: 'Blogs' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const initials = (session?.user?.name || 'Admin')
    .split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F2EAF7', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-nav-link { display:flex; align-items:center; gap:11px; padding:11px 14px; border-radius:10px; text-decoration:none; font-size:14px; font-weight:500; color:rgba(255,255,255,0.65); transition:all 0.2s; margin-bottom:2px; }
        .admin-nav-link:hover { background:rgba(255,255,255,0.1); color:#fff; }
        .admin-nav-link.active { background:rgba(197,157,217,0.2); color:#C59DD9; border-left:3px solid #C59DD9; padding-left:11px; }
        .admin-nav-link span.icon { font-size:18px; width:22px; text-align:center; }
        @media (max-width:768px) {
          .admin-sidebar { transform: translateX(-100%); transition: transform 0.3s; }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-overlay { display: block !important; }
        }
      `}</style>

      {/* Sidebar */}
      <div className={`admin-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: '240px', flexShrink: 0,
        background: 'linear-gradient(180deg, #0B1F3A 0%, #1a0a2e 100%)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 200,
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #C59DD9, #5A2D82)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏢</div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '16px', fontWeight: 700, lineHeight: 1.2 }}>Rising<span style={{ color: '#C59DD9' }}>Roof</span></div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.08em' }}>ADMIN PORTAL</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '0.1em', padding: '4px 14px 10px', fontWeight: 600 }}>MAIN MENU</div>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${pathname.startsWith(item.href) ? ' active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '16px 0' }} />
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '0.1em', padding: '4px 14px 10px', fontWeight: 600 }}>WEBSITE</div>
          <Link href="/" className="admin-nav-link" target="_blank">
            <span className="icon">🌐</span>
            View Website
          </Link>
        </nav>

        {/* User */}
        <div style={{ padding: '14px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #C59DD9, #5A2D82)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.user?.name || 'Admin'}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.user?.email || 'admin@risingroof.com'}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ width: '100%', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '9px', color: '#fca5a5', fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{ display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 199 }}
        />
      )}

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          height: '64px',
          background: '#fff',
          borderBottom: '1px solid #E8D8F5',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: '12px',
          position: 'sticky', top: 0, zIndex: 100,
          boxShadow: '0 2px 8px rgba(59,31,94,0.06)',
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
            className="admin-mobile-btn"
          >☰</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
              {NAV.find(n => pathname.startsWith(n.href))?.icon} {NAV.find(n => pathname.startsWith(n.href))?.label || 'Admin Portal'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="/" target="_blank" style={{ color: '#5A2D82', fontSize: '13px', fontWeight: 500, textDecoration: 'none', padding: '6px 14px', background: 'rgba(90,45,130,0.08)', borderRadius: '8px', border: '1px solid rgba(90,45,130,0.15)', transition: 'all 0.2s' }}>
              🌐 View Site
            </a>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #C59DD9, #5A2D82)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>{initials}</div>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
