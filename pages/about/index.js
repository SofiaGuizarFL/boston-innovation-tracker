import Layout from '../../components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout title="About">
      <section style={{ padding: '80px 0 60px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.2)', fontSize: 13, color: '#ff8a95', marginBottom: 28 }}>
            About This Project
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 20 }}>Boston Company<br />Innovation Tracker</h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            A capstone project built to explore and showcase the vibrant technology ecosystem in Boston, MA — one of America's leading innovation hubs.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px', maxWidth: 760 }}>
        {[
          {
            title: 'Project Overview',
            icon: '🎯',
            content: 'This application is a full-stack web platform that tracks and displays information about Boston-based technology companies, with a primary focus on HubSpot and the broader Boston startup ecosystem. It demonstrates real-world integration of a RESTful API, MongoDB database, and a modern React/Next.js frontend.',
          },
          {
            title: 'Technology Stack',
            icon: '⚙️',
            items: [
              { label: 'Frontend', value: 'Next.js 14, React 18, CSS3' },
              { label: 'Backend', value: 'Node.js, Next.js API Routes (REST)' },
              { label: 'Database', value: 'MongoDB with Mongoose ODM' },
              { label: 'Deployment', value: 'Render / Vercel' },
              { label: 'Version Control', value: 'GitHub' },
            ],
          },
          {
            title: 'Core Features',
            icon: '✨',
            list: [
              'Browse a comprehensive directory of Boston tech companies',
              'Filter companies by industry, employee size, and founding year',
              'Full-text search across company names, descriptions, and tags',
              'Detailed individual company profile pages',
              'Create, Read, Update, and Delete (CRUD) company records',
              'Responsive design for mobile and desktop',
              'Industry overview pages with company counts',
              'Featured company spotlights on the homepage',
            ],
          },
          {
            title: 'Data Model',
            icon: '🗄️',
            content: 'Companies are stored in MongoDB with fields including name, headquarters location, industry, founded year, employee size, description, website URL, logo URL, and tags. Industries are tracked in a separate collection with name, description, and icon fields.',
          },
        ].map(({ title, icon, content, items, list }) => (
          <div key={title} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span>{icon}</span> {title}
            </h2>
            {content && <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>{content}</p>}
            {items && (
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, overflow: 'hidden' }}>
                {items.map(({ label, value }, i) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '14px 20px', fontSize: 14,
                    borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
            {list && (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c8102e', flexShrink: 0 }}>→</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div style={{
          background: 'linear-gradient(135deg, rgba(200,16,46,0.1), rgba(232,180,74,0.05))',
          border: '1px solid rgba(200,16,46,0.2)',
          borderRadius: 16, padding: 32, textAlign: 'center',
        }}>
          <h3 style={{ marginBottom: 12 }}>Explore the Directory</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
            Capstone project — Springboard Software Engineering Program
          </p>
          <Link href="/companies" className="btn btn-primary" style={{ padding: '12px 28px' }}>
            Browse Companies →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
