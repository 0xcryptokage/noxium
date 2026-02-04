'use client';
import { getJupiterSwapUrl } from '@/lib/jupiter-swap';

interface Token {
  mint: string;
  symbol: string;
  name?: string;
  logoURI?: string;
  uiBalance: number;
  riskScore?: number;
  riskLevel?: string;
}

export default function TokenList({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) return null;

  return (
    <div className="token-grid">
      {tokens.map((token, i) => (
        <div key={i} className="token-card">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
            {token.logoURI && (
              <img src={token.logoURI} alt={token.symbol} style={{width: '32px', height: '32px', borderRadius: '50%'}} />
            )}
            <div>
              <div className="token-symbol">{token.symbol}</div>
              {token.name && <div style={{fontSize: '0.8rem', color: '#6b7280'}}>{token.name}</div>}
            </div>
          </div>
          <div className="token-balance">
            {token.uiBalance.toFixed(6)}
          </div>
          {token.riskScore !== undefined && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              borderRadius: '6px',
              background: token.riskLevel === 'critical' ? 'rgba(239,68,68,0.1)' : 
                          token.riskLevel === 'high' ? 'rgba(249,115,22,0.1)' :
                          token.riskLevel === 'medium' ? 'rgba(251,191,36,0.1)' :
                          'rgba(16,185,129,0.1)',
              color: token.riskLevel === 'critical' ? '#ef4444' : 
                     token.riskLevel === 'high' ? '#f97316' :
                     token.riskLevel === 'medium' ? '#fbbf24' :
                     '#10b981',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              Risk: {token.riskScore}/100
            </div>
          )}
          {token.riskScore && token.riskScore >= 70 && (
            <a
              href={getJupiterSwapUrl(token.mint)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                marginTop: '0.75rem',
                padding: '0.5rem',
                background: '#ef4444',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              Sell to USDC →
            </a>
          )}
          <div className="token-mint" style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280'}}>
            {token.mint.slice(0, 8)}...{token.mint.slice(-4)}
          </div>
        </div>
      ))}
    </div>
  );
}
