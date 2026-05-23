import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/companies', label: 'Companies' },
    { href: '/industries', label: 'Industries' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,13,13,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #c8102e, #e8b44a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🏙️</div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em',
          }}>
            Boston<span style={{ color: '#c8102e' }}>Tech</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex', gap: 8, listStyle: 'none',
          alignItems: 'center',
        }} className="desktop-nav">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{
                padding: '6px 14px', borderRadius: 6,
                fontSize: 14, fontWeight: 500,
                color: router.pathname === href ? '#fff' : 'var(--text-secondary)',
                background: router.pathname === href ? 'rgba(200,16,46,0.15)' : 'transparent',
                transition: 'all 0.2s',
              }}>{label}</Link>
            </li>
          ))}
          <li>
            <Link href="/companies/new" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
              + Add Company
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--text-primary)', cursor: 'pointer', fontSize: 22,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              onClick={() => setMenuOpen(false)}
              style={{ padding: '10px 0', color: router.pathname === href ? '#c8102e' : 'var(--text-primary)' }}>
              {label}
            </Link>
          ))}
          <Link href="/companies/new" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: 8 }}>
            + Add Company
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
