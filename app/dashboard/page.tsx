'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (connected && publicKey) {
      // Fetch tokens from Helius
      fetch('/api/wallet/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: publicKey.toString() }),
      })
        .then(res => res.json())
        .then(data => setTokens(data.tokens || []));
    }
  }, [connected, publicKey]);

  if (!connected) {
    return <div>Connect wallet to continue</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Wallet: {publicKey?.toString().slice(0, 8)}...</h1>
      <div>Tokens: {tokens.length}</div>
    </div>
  );
}
