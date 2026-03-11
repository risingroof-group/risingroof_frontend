'use client';

import * as React from 'react';
import Link from 'next/link';

const stats = [
  { icon: '🏢', label: 'Total Properties', value: '12', change: '+2 this month', color: '#5A2D82' },
  { icon: '📝', label: 'Active Blogs', value: '8', change: '+1 this week', color: '#0B5394' },
  { icon: '👁️', label: 'Monthly Views', value: '1,432', change: '+24% vs last month', color: '#1E6B3C' },
  { icon: '📞', label: 'New Leads', value: '45', change: '+4 today', color: '#92400E' },
];

const quickActions = [
  { icon: '🏢', label: 'Add Property', href: '/admin/properties', desc: 'Post a new property listing', color: '#3B1F5E' },
  { icon: '📝', label: 'Write Blog', href: '/admin/blogs', desc: 'Publish an article or guide', color: '#0B1F3A' },
];

export default function DashboardPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#3B1F5E', fontWeight: 700 }}>
          Dashboard
        </h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '5px' }}>
          Welcome back! Here&apos;s an overview of your RisingRoof portal.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '22px',
            border: '1px solid #E8D8F5',
            boxShadow: '0 2px 12px rgba(59,31,94,0.06)',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: '#3B1F5E', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '7px' }}>{s.change}</div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E8D8F5', boxShadow: '0 2px 12px rgba(59,31,94,0.06)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#3B1F5E', marginBottom: '18px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quickActions.map(a => (
              <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 16px',
                  background: `linear-gradient(135deg, ${a.color}08, ${a.color}04)`,
                  border: `1px solid ${a.color}18`,
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a.color}12`; e.currentTarget.style.borderColor = `${a.color}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${a.color}08, ${a.color}04)`; e.currentTarget.style.borderColor = `${a.color}18`; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: a.color, fontSize: '14px' }}>{a.label}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{a.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#C59DD9', fontSize: '18px' }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: 'linear-gradient(135deg, #3B1F5E, #5A2D82)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(59,31,94,0.2)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#fff', marginBottom: '16px' }}>📈 Portal Tips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '🏢', text: 'Add RERA number to all property listings for trust' },
              { icon: '📸', text: 'Use high-quality images to get 3x more leads' },
              { icon: '📝', text: 'Blog posts about localities drive organic traffic' },
              { icon: '📞', text: 'Respond to leads within 2 hours for best results' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{tip.icon}</span>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.55 }}>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E8D8F5', boxShadow: '0 2px 12px rgba(59,31,94,0.06)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#3B1F5E', marginBottom: '18px' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { icon: '🏢', action: 'Add your first property', desc: 'Go to Properties → Add Property', time: '', cta: '/admin/properties' },
            { icon: '📝', action: 'Write your first blog post', desc: 'Go to Blogs → Add Blog', time: '', cta: '/admin/blogs' },
          ].map((item, i) => (
            <Link key={i} href={item.cta} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px 0', borderBottom: i < 1 ? '1px solid #F0E8FA' : 'none', cursor: 'pointer' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F2EAF7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#3B1F5E' }}>{item.action}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{item.desc}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#C59DD9' }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
