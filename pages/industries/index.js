import Layout from '../../components/Layout';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Industry from '../models/Industry';
import Company from '../models/Company';

export default function IndustriesPage({ industries }) {
  return (
    <Layout title="Industries">
      <section style={{
        padding: '60px 0 40px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, rgba(200,16,46,0.04) 0%, transparent 100%)',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 12 }}>Industries</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            Explore Boston's tech sectors — {industries.length} industries tracked
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {industries.map((ind, i) => (
            <Link key={ind._id} href={`/companies?industry=${encodeURIComponent(ind.industry_name)}`}>
              <div className="card" style={{
                padding: 28, cursor: 'pointer',
                animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 16 }}>
                  <div style={{
                    fontSize: 40, width: 64, height: 64,
                    background: 'rgba(200,16,46,0.08)',
                    border: '1px solid rgba(200,16,46,0.15)',
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {ind.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, marginBottom: 6 }}>{ind.industry_name}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {ind.description}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {ind.company_count} {ind.company_count === 1 ? 'company' : 'companies'}
                  </span>
                  <span style={{ fontSize: 13, color: '#c8102e', fontWeight: 600 }}>
                    Browse →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const [industries, companyCounts] = await Promise.all([
    Industry.find({}).lean(),
    Company.aggregate([{ $group: { _id: '$industry', count: { $sum: 1 } } }]),
  ]);

  const data = industries.map(ind => ({
    ...ind,
    _id: ind._id.toString(),
    company_count: companyCounts.find(c => c._id === ind.industry_name)?.count || 0,
  }));

  return { props: { industries: data } };
}
