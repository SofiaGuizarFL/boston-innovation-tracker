import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

const industries = [
  'Software & SaaS', 'Healthcare Technology', 'Artificial Intelligence',
  'Fintech', 'Biotech', 'Cybersecurity', 'E-Commerce', 'EdTech',
];

const employeeSizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'];

export default function NewCompany() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const [form, setForm] = useState({
    name: '', headquarters_location: '', industry: '',
    founded_year: '', employee_size: '', description: '',
    website_url: '', logo_url: '', featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...form, tags };
    if (payload.founded_year) payload.founded_year = parseInt(payload.founded_year);

    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/companies/${data.data._id}`);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { marginBottom: 20 };
  const labelStyle = {
    display: 'block', fontSize: 13, fontWeight: 500,
    color: 'var(--text-secondary)', marginBottom: 6,
  };

  return (
    <Layout title="Add Company">
      {/* Header */}
      <section style={{
        padding: '48px 0 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
            <Link href="/companies">Companies</Link> <span>›</span> <span style={{ color: 'var(--text-primary)' }}>Add New</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Add a Company</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Help grow Boston's tech directory</p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px', maxWidth: 760 }}>
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 32, marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 24 }}>Basic Information</h2>

            <div style={inputStyle}>
              <label style={labelStyle}>Company Name *</label>
              <input className="input" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. HubSpot" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={inputStyle}>
                <label style={labelStyle}>Industry *</label>
                <select className="input" name="industry" value={form.industry} onChange={handleChange} required>
                  <option value="">Select industry</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div style={inputStyle}>
                <label style={labelStyle}>Headquarters *</label>
                <input className="input" name="headquarters_location" value={form.headquarters_location} onChange={handleChange} required placeholder="e.g. Cambridge, MA" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={inputStyle}>
                <label style={labelStyle}>Founded Year</label>
                <input className="input" type="number" name="founded_year" value={form.founded_year} onChange={handleChange} placeholder="e.g. 2010" min="1800" max={new Date().getFullYear()} />
              </div>
              <div style={inputStyle}>
                <label style={labelStyle}>Employee Size</label>
                <select className="input" name="employee_size" value={form.employee_size} onChange={handleChange}>
                  <option value="">Select range</option>
                  {employeeSizes.map(s => <option key={s} value={s}>{s} employees</option>)}
                </select>
              </div>
            </div>

            <div style={inputStyle}>
              <label style={labelStyle}>Description</label>
              <textarea className="input" name="description" value={form.description} onChange={handleChange}
                placeholder="Brief description of the company..."
                rows={4}
                style={{ resize: 'vertical' }} />
            </div>
          </div>

          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 16, padding: 32, marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 24 }}>Links & Media</h2>

            <div style={inputStyle}>
              <label style={labelStyle}>Website URL</label>
              <input className="input" name="website_url" value={form.website_url} onChange={handleChange} type="url" placeholder="https://example.com" />
            </div>
            <div style={inputStyle}>
              <label style={labelStyle}>Logo URL</label>
              <input className="input" name="logo_url" value={form.logo_url} onChange={handleChange} type="url" placeholder="https://logo.clearbit.com/example.com" />
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                Tip: Use https://logo.clearbit.com/[domain] for automatic logos
              </p>
            </div>
            <div style={inputStyle}>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input className="input" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="e.g. CRM, SaaS, Marketing" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange}
                style={{ width: 16, height: 16, accentColor: '#c8102e', cursor: 'pointer' }} />
              <label htmlFor="featured" style={{ fontSize: 14, cursor: 'pointer' }}>Mark as Featured Company</label>
            </div>
          </div>

          {error && (
            <div style={{
              padding: 16, borderRadius: 8, background: 'rgba(200,16,46,0.1)',
              border: '1px solid rgba(200,16,46,0.2)', color: '#ff6b7a',
              marginBottom: 20, fontSize: 14,
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: '14px 32px', fontSize: 15 }}>
              {loading ? 'Adding...' : '+ Add Company'}
            </button>
            <Link href="/companies" className="btn btn-outline" style={{ padding: '14px 24px' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
