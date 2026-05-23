import Link from 'next/link';
import Image from 'next/image';

export default function CompanyCard({ company }) {
  const {
    _id, name, industry, headquarters_location,
    founded_year, employee_size, description,
    website_url, logo_url, tags, featured,
  } = company;

  return (
    <Link href={`/companies/${_id}`} style={{ display: 'block' }}>
      <div className="card" style={{ padding: 24, height: '100%', cursor: 'pointer' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', flexShrink: 0,
            }}>
              {logo_url ? (
                <img
                  src={logo_url}
                  alt={`${name} logo`}
                  style={{ width: 36, height: 36, objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span style={{ fontSize: 20 }}>🏢</span>
              )}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{name}</h3>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{headquarters_location}</span>
            </div>
          </div>
          {featured && (
            <span className="badge-featured">⭐ Featured</span>
          )}
        </div>

        {/* Industry badge */}
        <div style={{ marginBottom: 12 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 10px',
            background: 'rgba(200,16,46,0.08)',
            border: '1px solid rgba(200,16,46,0.15)',
            borderRadius: 6,
            fontSize: 12,
            color: '#ff8a95',
            fontWeight: 500,
          }}>{industry}</span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          {description}
        </p>

        {/* Meta */}
        <div style={{
          display: 'flex', gap: 16, fontSize: 12,
          color: 'var(--text-secondary)', marginBottom: 14,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 14,
        }}>
          {founded_year && (
            <span>📅 Founded {founded_year}</span>
          )}
          {employee_size && (
            <span>👥 {employee_size}</span>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
