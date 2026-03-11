'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setIsLoading(false);
    if (res?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1F3A 0%, #3B1F5E 50%, #1a3a6b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(197,157,217,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,31,94,0.3) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #C59DD9, #5A2D82)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            fontSize: '28px',
            boxShadow: '0 8px 32px rgba(197,157,217,0.35)',
          }}>🏢</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
            Rising<span style={{ color: '#C59DD9' }}>Roof</span> Admin
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', marginTop: '8px' }}>
            Sign in to manage properties, blogs & leads
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: '0 24px 72px rgba(0,0,0,0.35)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', marginBottom: '7px' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@risingroof.com"
                style={{
                  width: '100%', padding: '13px 16px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  color: '#fff', fontSize: '14px',
                  fontFamily: 'DM Sans, sans-serif',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C59DD9')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', marginBottom: '7px' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '13px 44px 13px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    color: '#fff', fontSize: '14px',
                    fontFamily: 'DM Sans, sans-serif',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#C59DD9')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px',
                }}>{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px', padding: '11px 14px',
                color: '#fca5a5', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center',
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '15px',
                background: isLoading ? 'rgba(197,157,217,0.5)' : 'linear-gradient(135deg, #C59DD9, #8B5CF6)',
                border: 'none', borderRadius: '10px',
                color: '#1a0a2e', fontWeight: 700, fontSize: '15px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                marginTop: '4px',
                transition: 'all 0.25s',
                boxShadow: '0 4px 20px rgba(197,157,217,0.3)',
              }}
            >
              {isLoading ? '⏳ Signing in...' : '🔐 Sign In to Admin Portal'}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
              Login: admin@risingroof.com &nbsp;/&nbsp; Admin@123
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
          © {new Date().getFullYear()} RisingRoof Group. All rights reserved.
        </p>
      </div>
    </div>
  );
}
