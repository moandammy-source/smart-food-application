import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F7F4', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <h1 style={{ fontSize: 42, margin: 0, color: '#1E5D46' }}>404</h1>
        <p style={{ marginTop: 12, fontSize: 18, color: '#4E5B55' }}>This page could not be found.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: 20, padding: '12px 18px', borderRadius: 999, background: '#1E5D46', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
