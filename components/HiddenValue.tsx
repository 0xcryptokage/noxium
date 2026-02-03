'use client';
import { useEffect, useState } from 'react';
import { findHiddenValue, HiddenValue as HVType } from '@/lib/hidden-value';

export default function HiddenValue({ wallet, solBalance, tokens }: any) {
  const [values, setValues] = useState<HVType[]>([]);

  useEffect(() => {
    if (wallet) {
      findHiddenValue(wallet, solBalance, tokens).then(setValues);
    }
  }, [wallet, solBalance, tokens]);

  if (values.length === 0) return null;

  const totalValue = values.reduce((sum, v) => sum + v.value, 0);

  return (
    <div style={{marginTop: '3rem'}}>
      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#9ca3af', marginBottom: '0.5rem'}}>
        Hidden Value Found
      </div>
      <div style={{fontSize: '2rem', fontWeight: '900', color: '#10b981', marginBottom: '1.5rem'}}>
        ${totalValue.toFixed(2)}
      </div>
      
      <div style={{display: 'grid', gap: '1rem'}}>
        {values.map((v, i) => (
          <div key={i} style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{fontWeight: '600', color: '#10b981', marginBottom: '0.25rem'}}>
                {v.type === 'staking' ? '💰' : v.type === 'airdrop' ? '🎁' : '🔍'} {v.description}
              </div>
              {v.value > 0 && (
                <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                  Potential: ${v.value.toFixed(2)}
                </div>
              )}
            </div>
            {v.actionUrl && (
              <a href={v.actionUrl} target="_blank" rel="noopener noreferrer" style={{
                padding: '0.5rem 1rem',
                background: '#10b981',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                Claim →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
