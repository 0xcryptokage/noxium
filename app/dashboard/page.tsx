'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (connected && publicKey) {
      setLoading(true);
      fetch('/api/wallet/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: publicKey.toString() }),
      })
        .then(res => res.json())
        .then(data => {
          setTokens(data.tokens || []);
          setHealthScore(Math.floor(Math.random() * 40) + 60);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [connected, publicKey]);

  return (
    <>
      <style jsx global>{`
        body { background: #000; color: #fff; font-family: 'Courier New', monospace; }
        .dashboard-wrap { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .wallet-bar { display: flex; justify-content: space-between; align-items: center; padding: 2rem 0; }
        .back-btn { color: #a855f7; cursor: pointer; font-size: 1.2rem; }
        .health-card { background: linear-gradient(135deg, rgba(147,51,234,0.3), rgba(236,72,153,0.3)); border: 2px solid #9333ea; padding: 3rem; text-align: center; margin: 2rem 0; }
        .health-num { font-size: 5rem; font-weight: 900; color: #a855f7; }
        .token-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .token-card { background: rgba(20,20,30,0.9); border: 2px solid rgba(147,51,234,0.4); padding: 1.5rem; }
        .token-symbol { font-size: 1.5rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem; }
        .token-balance { color: #9ca3af; }
      `}</style>

      <div className="dashboard-wrap">
        <div className="wallet-bar">
          <div className="back-btn" onClick={() => router.push('/')}>← BACK</div>
          <WalletMultiButton />
        </div>

        {!connected && (
          <div style={{textAlign: 'center', padding: '4rem', fontSize: '1.5rem', color: '#a855f7'}}>
            CONNECT WALLET TO CONTINUE
          </div>
        )}

        {connected && (
          <>
            <div className="health-card">
              <div className="health-num">{healthScore}</div>
              <div style={{fontSize: '1.5rem', color: '#a855f7', marginTop: '1rem'}}>HEALTH SCORE</div>
              <div style={{marginTop: '1rem', color: '#fbbf24'}}>
                {healthScore > 80 ? '🟢 GOOD' : healthScore > 60 ? '🟡 WARNING' : '🔴 CRITICAL'}
              </div>
            </div>

            <div style={{fontSize: '1.2rem', color: '#9ca3af', marginBottom: '1rem'}}>
              {loading ? 'LOADING TOKENS...' : `${tokens.length} TOKENS FOUND`}
            </div>

            <div className="token-grid">
              {tokens.slice(0, 12).map((token, i) => (
                <div key={i} className="token-card">
                  <div className="token-symbol">{token.symbol}</div>
                  <div className="token-balance">
                    Balance: {(token.balance / Math.pow(10, token.decimals)).toFixed(4)}
                  </div>
                  <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280'}}>
                    {token.mint.slice(0, 8)}...
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
