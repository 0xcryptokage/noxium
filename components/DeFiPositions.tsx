'use client';
import { useEffect, useState } from 'react';
import { getAllDeFiPositions, DeFiPosition, calculatePositionRisk } from '@/lib/defi-positions';

export default function DeFiPositions({ wallet }: { wallet: string }) {
  const [positions, setPositions] = useState<DeFiPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet) {
      getAllDeFiPositions(wallet)
        .then(setPositions)
        .finally(() => setLoading(false));
    }
  }, [wallet]);

  if (loading) return <div style={{color: '#9ca3af'}}>Loading DeFi positions...</div>;
  if (positions.length === 0) return null;

  return (
    <div style={{marginTop: '3rem'}}>
      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#9ca3af', marginBottom: '1.5rem'}}>
        DeFi Positions ({positions.length})
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem'}}>
        {positions.map((pos, i) => {
          const risk = calculatePositionRisk(pos);
          return (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(147, 51, 234, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <div>
                  <div style={{fontSize: '1.1rem', fontWeight: '700', color: '#fff'}}>{pos.asset}</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase'}}>{pos.protocol}</div>
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  background: risk === 'critical' ? 'rgba(239,68,68,0.2)' : risk === 'warning' ? 'rgba(251,191,36,0.2)' : 'rgba(16,185,129,0.2)',
                  color: risk === 'critical' ? '#ef4444' : risk === 'warning' ? '#fbbf24' : '#10b981',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {risk === 'critical' ? '🔴 CRITICAL' : risk === 'warning' ? '🟡 WARNING' : '🟢 SAFE'}
                </div>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                <div>
                  <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Supplied</div>
                  <div style={{fontSize: '1rem', fontWeight: '600', color: '#fff'}}>{pos.supplied.toFixed(2)}</div>
                </div>
                <div>
                  <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Borrowed</div>
                  <div style={{fontSize: '1rem', fontWeight: '600', color: '#fff'}}>{pos.borrowed.toFixed(2)}</div>
                </div>
              </div>
              
              <div style={{marginBottom: '0.5rem'}}>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Health Factor</div>
                <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#a855f7'}}>{pos.healthFactor.toFixed(2)}</div>
              </div>
              
              <div style={{fontSize: '0.85rem', color: '#6b7280'}}>
                APY: {pos.apy.toFixed(2)}%
              </div>
              
              {risk !== 'safe' && (
                <button style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(147, 51, 234, 0.2)',
                  border: '1px solid #9333ea',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Add Collateral
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
