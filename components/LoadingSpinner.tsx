export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      gap: '1rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(147, 51, 234, 0.2)',
        borderTop: '4px solid #9333ea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>{message}</div>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
