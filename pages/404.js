import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="404 - Not Found">
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', textAlign: 'center', padding: '80px 24px',
      }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🏙️</div>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: '#c8102e', lineHeight: 1, marginBottom: 16 }}>404</h1>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, marginBottom: 36 }}>
          This page has wandered off the Freedom Trail. Let's get you back to the innovation hub.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/" className="btn btn-primary" style={{ padding: '12px 24px' }}>Go Home</Link>
          <Link href="/companies" className="btn btn-outline" style={{ padding: '12px 24px' }}>Browse Companies</Link>
        </div>
      </div>
    </Layout>
  );
}
