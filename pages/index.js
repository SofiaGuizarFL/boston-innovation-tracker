import Layout from '../components/Layout';
import CompanyCard from '../components/CompanyCard';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Company from '../models/Company';
import Industry from '../models/Industry';

export default function Home({ featuredCompanies, stats, industries }) {
  return (
    <Layout title="Home">
      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '100px 0 80px',
        background: 'linear-gradient(180deg, rgba(200,16,46,0.06) 0%, transparent 100%)',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(200,16,46,0.1)',
              border: '1px solid rgba(200,16,46,0.2)',
              fontSize: 13, color: '#ff8a95',
              marginBottom: 28,
            }}>
              <span>🏙️</span> Boston's Innovation Hub
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}>
              Discover Boston's<br />
              <span style={{
                background: 'linear-gradient(135deg, #c8102e, #e8b44a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Tech Ecosystem</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'var(--text-secondary)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 560,
            }}>
              Explore the companies shaping the future of technology in one of America's most vibrant innovation hubs. From HubSpot to emerging startups.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/companies" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
                Explore Companies →
              </Link>
              <Link href="/industries" className="btn btn-outline" style={{ padding: '14px 28px', fontSize: 15 }}>
                Browse Industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            padding: '32px 0',
          }}>
            {[
              { label: 'Companies', value: stats.total, icon: '🏢' },
              { label: 'Industries', value: industries.length, icon: '⚡' },
              { label: 'Featured', value: stats.featured, icon: '⭐' },
              { label: 'Cities', value: '6+', icon: '📍' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{
                textAlign: 'center', padding: '12px 0',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#c8102e' }}>{value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries grid */}
      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 12 }}>Browse by Industry</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Explore Boston's diverse technology sectors</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {industries.map((ind) => (
              <Link key={ind._id} href={`/companies?industry=${encodeURIComponent(ind.industry_name)}`}>
                <div className="card" style={{ padding: 20, cursor: 'pointer' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{ind.icon}</div>
                  <h3 style={{ fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 6 }}>{ind.industry_name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{ind.description}</p>
                  <span style={{ fontSize: 12, color: '#c8102e', fontWeight: 600 }}>
                    {ind.company_count} {ind.company_count === 1 ? 'company' : 'companies'} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured companies */}
      {featuredCompanies.length > 0 && (
        <section style={{ padding: '0 0 80px' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 8 }}>Featured Companies</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Spotlight on Boston's top innovators</p>
              </div>
              <Link href="/companies" style={{ fontSize: 14, color: '#c8102e' }}>View all →</Link>
            </div>

            <div className="grid-companies">
              {featuredCompanies.map((company) => (
                <div key={company._id} style={{ animation: 'fadeUp 0.5s ease forwards' }}>
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{
        margin: '0 24px 80px',
        borderRadius: 20,
        padding: '60px 48px',
        background: 'linear-gradient(135deg, rgba(200,16,46,0.15), rgba(232,180,74,0.08))',
        border: '1px solid rgba(200,16,46,0.2)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>Know a Boston Tech Company?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
          Help us grow the most comprehensive directory of Boston's technology companies.
        </p>
        <Link href="/companies/new" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
          Add a Company
        </Link>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const [featuredCompanies, allCompanies, industries, industryList] = await Promise.all([
    Company.find({ featured: true }).limit(3).lean(),
    Company.find({}).lean(),
    Industry.find({}).lean(),
    Company.aggregate([{ $group: { _id: '$industry', count: { $sum: 1 } } }]),
  ]);

  const industriesWithCounts = industries.map(ind => ({
    ...ind,
    _id: ind._id.toString(),
    company_count: industryList.find(i => i._id === ind.industry_name)?.count || 0,
  }));

  return {
    props: {
      featuredCompanies: featuredCompanies.map(c => ({ ...c, _id: c._id.toString(), createdAt: c.createdAt?.toString() || null, updatedAt: c.updatedAt?.toString() || null })),
      stats: {
        total: allCompanies.length,
        featured: allCompanies.filter(c => c.featured).length,
      },
      industries: industriesWithCounts,
    },
  };
}
