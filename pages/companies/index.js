import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CompanyCard from '../../components/CompanyCard';

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeSize, setEmployeeSize] = useState('');
  const [sort, setSort] = useState('name');

  const industries = [
    'Software & SaaS', 'Healthcare Technology', 'Artificial Intelligence',
    'Fintech', 'Biotech', 'Cybersecurity', 'E-Commerce', 'EdTech',
  ];

  const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'];

  const fetchCompanies = useCallback(async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 12, sort });
    if (search) params.set('search', search);
    if (industry) params.set('industry', industry);
    if (employeeSize) params.set('employee_size', employeeSize);

    try {
      const res = await fetch(`/api/companies?${params}`);
      const data = await res.json();
      if (data.success) {
        setCompanies(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, industry, employeeSize, sort]);

  // Sync URL query params to state
  useEffect(() => {
    if (router.isReady) {
      if (router.query.industry) setIndustry(router.query.industry);
      if (router.query.search) setSearch(router.query.search);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCompanies();
  };

  const clearFilters = () => {
    setSearch('');
    setIndustry('');
    setEmployeeSize('');
    setSort('name');
  };

  const hasFilters = search || industry || employeeSize || sort !== 'name';

  return (
    <Layout title="Companies">
      {/* Page header */}
      <section style={{
        padding: '60px 0 40px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, rgba(200,16,46,0.04) 0%, transparent 100%)',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 12 }}>
            Boston Tech Companies
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            {pagination.total ? `${pagination.total} companies` : 'Loading...'} in Boston's innovation ecosystem
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Filters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 32,
          padding: 20,
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 12,
        }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8 }}>
            <input
              className="input"
              placeholder="Search companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
              🔍
            </button>
          </form>

          <select className="input" value={industry} onChange={e => setIndustry(e.target.value)}>
            <option value="">All Industries</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <select className="input" value={employeeSize} onChange={e => setEmployeeSize(e.target.value)}>
            <option value="">All Sizes</option>
            {sizes.map(s => <option key={s} value={s}>{s} employees</option>)}
          </select>

          <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="name">Sort: Name A–Z</option>
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>

          {hasFilters && (
            <button className="btn btn-outline" onClick={clearFilters} style={{ whiteSpace: 'nowrap' }}>
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* Active filter tags */}
        {(industry || employeeSize) && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {industry && (
              <span className="tag" style={{ cursor: 'pointer' }} onClick={() => setIndustry('')}>
                {industry} ✕
              </span>
            )}
            {employeeSize && (
              <span className="tag" style={{ cursor: 'pointer' }} onClick={() => setEmployeeSize('')}>
                {employeeSize} employees ✕
              </span>
            )}
          </div>
        )}

        {/* Company grid */}
        {loading ? (
          <div className="grid-companies">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton" style={{ height: 280 }} />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>No companies found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-primary" onClick={clearFilters} style={{ marginTop: 20 }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid-companies">
            {companies.map((company, i) => (
              <div key={company._id} style={{ animation: `fadeUp 0.4s ease ${i * 0.05}s both` }}>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 8,
            marginTop: 48,
          }}>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className="btn"
                onClick={() => fetchCompanies(page)}
                style={{
                  padding: '8px 14px',
                  background: pagination.page === page ? 'var(--boston-red)' : 'var(--card-bg)',
                  color: pagination.page === page ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--card-border)',
                  minWidth: 40,
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
