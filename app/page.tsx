// app/page.tsx
export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#0f0f12',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial'
    }}>
      <div style={{textAlign: 'center'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '.5rem'}}>techaccs.com.br</h1>
        <p style={{opacity: .8, marginBottom: '1.5rem'}}>
          Site em Next.js — tudo certo por aqui 🚀
        </p>
        <a
          href="https://github.com/augustoCCS/techaccs.com.br"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '10px 16px',
            border: '1px solid #444',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#fff'
          }}
        >
          Ver repositório
        </a>
      </div>
    </main>
  );
}
