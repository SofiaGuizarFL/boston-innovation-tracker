import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Company from '../models/Company';

export default function CompanyDetail({ company }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  if (!company) {
    return (
      <Layout title="Not Found">
        <div style={{ textAlign: 'center', padding: '120px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🏢</div>
          <h2>Company not found</h2>
          <Link href="/companies" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            Back to Companies
          </Link>
        </div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${company.name}?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/companies/${company._id}`, { method: 'DELETE' });
      if (res.ok) router.push('/companies');
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  return (
    <Layout title={company.name}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-secondary)', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <span>›</span>
          <Link href="/companies" style={{ color: 'var(--text-secondary)' }}>Companies</Link>
          <span>›</span>
          <span style={{ color: 'var(--text-primary)' }}>{company.name}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

          {/* Main content */}
          <div>
            {/* Company header */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 32 }}>
              <div style={{
                width: 80, height: 80, borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, overflow: 'hidden',
              }}>
                {company.logo_url ? (
                  <img src={company.logo_url} alt={`${company.name} logo`}
                    style={{ width: 60, height: 60, objectFit: 'contain' }}
                    onError={e => e.target.style.display = 'none'} />
                ) : <span style={{ fontSize: 36 }}>🏢</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>{company.name}</h1>
                  {company.featured && <span className="badge-featured">⭐ Featured</span>}
                </div>
                <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)', fontSize: 14, flexWrap: 'wrap' }}>
                  <span>📍 {company.headquarters_location}</span>
                  {company.founded_year && <span>📅 Founded {company.founded_year}</span>}
                  {company.employee_size && <span>👥 {company.employee_size} employees</span>}
                </div>
              </div>
            </div>

            {/* Industry */}
            <div style={{ marginBottom: 28 }}>
              <span style={{
                display: 'inline-block', padding: '6px 16px',
                background: 'rgba(200,16,46,0.1)',
                border: '1px solid rgba(200,16,46,0.2)',
                borderRadius: 8, fontSize: 14, color: '#ff8a95', fontWeight: 500,
              }}>
                {company.industry}
              </span>
            </div>

            {/* Description */}
            <div style={{
              background: 'var(--card-bg)', border: '1px solid var(--card-border)',
              borderRadius: 12, padding: 28, marginBottom: 28,
            }}>
              <h2 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 14 }}>About</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                {company.description}
              </p>
            </div>

            {/* Tags */}
            {company.tags && company.tags.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 12 }}>Tags</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {company.tags.map(tag => (
                    <Link key={tag} href={`/companies?search=${encodeURIComponent(tag)}`}>
                      <span className="tag" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: 13 }}>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <Link href={`/companies/${company._id}/edit`} className="btn btn-outline">
                ✏️ Edit
              </Link>
              <button
                className="btn"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  background: 'rgba(200,16,46,0.1)',
                  border: '1px solid rgba(200,16,46,0.2)',
                  color: '#ff6b7a',
                }}
              >
                {deleting ? 'Deleting...' : '🗑 Delete'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Quick info */}
            <div style={{
              background: 'var(--card-bg)', border: '1px solid var(--card-border)',
              borderRadius: 12, padding: 24,
            }}>
              <h3 style={{ fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 16 }}>Company Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Headquarters', value: company.headquarters_location, icon: '📍' },
                  { label: 'Industry', value: company.industry, icon: '🏭' },
                  { label: 'Founded', value: company.founded_year || 'N/A', icon: '📅' },
                  { label: 'Employees', value: company.employee_size || 'N/A', icon: '👥' },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{icon} {label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Website link */}
            {company.website_url && (
              <a href={company.website_url} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 14 }}>
                🌐 Visit Website ↗
              </a>
            )}

            {/* Browse more */}
            <Link href={`/companies?industry=${encodeURIComponent(company.industry)}`}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14 }}>
              More in {company.industry}
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  try {
    const company = await Company.findById(params.id).lean();
    if (!company) return { notFound: true };
    return {
      props: {
        company: {
          ...company,
          _id: company._id.toString(),
          createdAt: company.createdAt?.toString() || null,
          updatedAt: company.updatedAt?.toString() || null,
        }
      }
    };
  } catch {
    return { notFound: true };
  }
}
