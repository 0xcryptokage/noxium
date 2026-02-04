export default function ErrorDisplay({ message, retry }: { message: string; retry?: () => void }) {
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'center',
      margin: '2rem 0'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
      <div style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.5rem' }}>
        {message}
      </div>
      {retry && (
        <button
          onClick={retry}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
