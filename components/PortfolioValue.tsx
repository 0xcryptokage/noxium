'use client';
import { useEffect, useState } from 'react';
import { calculatePortfolioValue } from '@/lib/price-oracle';

export default function PortfolioValue({ 
  solBalance, 
  tokens 
}: { 
  solBalance: number; 
  tokens: Array<{ mint: string; uiBalance: number }> 
}) {
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculatePortfolioValue(
      solBalance,
      tokens.map(t => ({ mint: t.mint, balance: t.uiBalance }))
    )
      .then(setValue)
      .finally(() => setLoading(false));
  }, [solBalance, tokens]);

  if (loading) {
    return (
      <div style={{fontSize: '0.95rem', color: '#6b7280'}}>
        Calculating value...
      </div>
    );
  }

  return (
    <div style={{marginTop: '1.5rem'}}>
      <div style={{fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem'}}>
        Estimated Portfolio Value
      </div>
      <div style={{fontSize: '2rem', fontWeight: '900', color: '#10b981'}}>
        ${value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
}
