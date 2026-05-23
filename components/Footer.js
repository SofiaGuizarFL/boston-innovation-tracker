import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: 80,
      padding: '48px 0 32px',
      color: 'var(--text-secondary)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40, marginBottom: 40,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'linear-gradient(135deg, #c8102e, #e8b44a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>🏙️</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>
                Boston<span style={{ color: '#c8102e' }}>Tech</span>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
              Tracking and celebrating the innovation happening in Boston's world-class technology ecosystem.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 14 }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/companies', label: 'All Companies' },
                { href: '/industries', label: 'Industries' },
                { href: '/companies/new', label: 'Add Company' },
                { href: '/about', label: 'About' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#c8102e'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 14 }}>Industries</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Software & SaaS', 'Healthcare Technology', 'Artificial Intelligence', 'Fintech'].map(ind => (
                <li key={ind}>
                  <Link href={`/companies?industry=${encodeURIComponent(ind)}`}
                    style={{ fontSize: 13, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#c8102e'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{ind}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12 }}>© {new Date().getFullYear()} BostonTech Tracker. Built with Next.js & MongoDB.</p>
          <p style={{ fontSize: 12 }}>Capstone Project — Springboard Software Engineering</p>
        </div>
      </div>
    </footer>
  );
}
