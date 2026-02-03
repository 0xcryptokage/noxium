'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Connection, PublicKey } from '@solana/web3.js';

interface Token {
  mint: string;
  symbol: string;
  balance: number;
  decimals: number;
  uiBalance: number;
}

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [solBalance, setSolBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (connected && publicKey) {
      fetchWalletData();
    }
  }, [connected, publicKey]);

  const fetchWalletData = async () => {
    if (!publicKey) return;
    
    setLoading(true);
    try {
      // Get SOL balance
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 1e9);

      // Get token accounts
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
      });

      const tokenList: Token[] = tokenAccounts.value
        .map(account => {
          const data = account.account.data.parsed.info;
          return {
            mint: data.mint,
            symbol: 'UNKNOWN',
            balance: parseInt(data.tokenAmount.amount),
            decimals: data.tokenAmount.decimals,
            uiBalance: parseFloat(data.tokenAmount.uiAmount || '0')
          };
        })
        .filter(t => t.uiBalance > 0);

      setTokens(tokenList);
      
      // Simple health score: 100 - (number of tokens * 2)
      // More tokens = potentially more risk
      const score = Math.max(50, Math.min(100, 100 - tokenList.length * 2));
      setHealthScore(score);
      
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        body { 
          background: linear-gradient(180deg, #000000 0%, #0a0a0f 100%);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100vh;
        }
        .dashboard-wrap { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .wallet-bar { 
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0 3rem;
          border-bottom: 1px solid rgba(147, 51, 234, 0.1);
          margin-bottom: 3rem;
        }
        .back-btn { 
          color: #9ca3af;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-btn:hover { color: #a855f7; }
        .health-card { 
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          margin: 0 0 3rem;
        }
        .health-num { 
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 1.5rem;
        }
        .token-grid { 
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .token-card { 
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }
        .token-card:hover {
          border-color: rgba(147, 51, 234, 0.5);
          transform: translateY(-2px);
        }
        .token-symbol { 
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
        .token-balance { color: #9ca3af; font-size: 0.95rem; }
        .token-mint { font-size: 0.8rem; color: #6b7280; margin-top: 0.5rem; }
        .connect-prompt {
          text-align: center;
          padding: 6rem 2rem;
        }
        .connect-title {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .connect-subtitle {
          font-size: 1.1rem;
          color: #9ca3af;
          margin-bottom: 2rem;
        }
      `}</style>

      <div className="dashboard-wrap">
        <div className="wallet-bar">
          <div className="back-btn" onClick={() => router.push('/')}>← Back to Home</div>
          <WalletMultiButton />
        </div>

        {!connected && (
          <div className="connect-prompt">
            <div className="connect-title">Connect Your Wallet</div>
            <div className="connect-subtitle">Get instant portfolio analysis and risk insights</div>
          </div>
        )}

        {connected && (
          <>
            <div className="health-card">
              <div className="health-num">{healthScore}</div>
              <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#9ca3af', marginTop: '1rem'}}>Portfolio Health Score</div>
              <div style={{marginTop: '1rem', fontSize: '1rem', color: healthScore > 80 ? '#10b981' : healthScore > 60 ? '#fbbf24' : '#ef4444'}}>
                {healthScore > 80 ? '● Excellent' : healthScore > 60 ? '● Warning' : '● Critical'}
              </div>
              <div style={{marginTop: '1.5rem', fontSize: '0.95rem', color: '#6b7280'}}>
                SOL Balance: {solBalance.toFixed(4)} SOL
              </div>
            </div>

            <div className="section-title">
              {loading ? 'Loading tokens...' : `${tokens.length} Token${tokens.length !== 1 ? 's' : ''} Found`}
            </div>

            <div className="token-grid">
              {tokens.map((token, i) => (
                <div key={i} className="token-card">
                  <div className="token-symbol">{token.symbol}</div>
                  <div className="token-balance">
                    {token.uiBalance.toFixed(6)}
                  </div>
                  <div className="token-mint">
                    {token.mint.slice(0, 8)}...{token.mint.slice(-4)}
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
