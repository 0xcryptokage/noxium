'use client';
import { useEffect, useState } from 'react';
import { auditWalletSecurity, SecurityIssue, getSecurityScore } from '@/lib/security-audit';

export default function SecurityAudit({ wallet }: { wallet: string }) {
  const [issues, setIssues] = useState<SecurityIssue[]>([]);
  const [score, setScore] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet) {
      auditWalletSecurity(wallet)
        .then(result => {
          setIssues(result);
          setScore(getSecurityScore(result));
        })
        .finally(() => setLoading(false));
    }
  }, [wallet]);

  if (loading) return null;

  return (
    <div style={{marginTop: '3rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#9ca3af'}}>
          Security Audit
        </div>
        <div style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: score > 80 ? 'rgba(16,185,129,0.2)' : score > 60 ? 'rgba(251,191,36,0.2)' : 'rgba(239,68,68,0.2)',
          color: score > 80 ? '#10b981' : score > 60 ? '#fbbf24' : '#ef4444',
          fontWeight: '700'
        }}>
          Score: {score}/100
        </div>
      </div>

      {issues.length === 0 ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          color: '#10b981'
        }}>
          ✅ No security issues detected
        </div>
      ) : (
        <div style={{display: 'grid', gap: '1rem'}}>
          {issues.map((issue, i) => (
            <div key={i} style={{
              background: issue.severity === 'critical' ? 'rgba(239,68,68,0.1)' : 
                          issue.severity === 'high' ? 'rgba(249,115,22,0.1)' :
                          'rgba(251,191,36,0.1)',
              border: `1px solid ${issue.severity === 'critical' ? '#ef4444' : issue.severity === 'high' ? '#f97316' : '#fbbf24'}`,
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
                <div style={{fontWeight: '700', fontSize: '1rem', color: '#fff'}}>
                  {issue.description}
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(0,0,0,0.3)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  color: issue.severity === 'critical' ? '#ef4444' : issue.severity === 'high' ? '#f97316' : '#fbbf24'
                }}>
                  {issue.severity}
                </div>
              </div>
              
              {issue.token && (
                <div style={{fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem'}}>
                  Token: {issue.token}
                </div>
              )}
              
              <div style={{fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1rem'}}>
                {issue.recommendation}
              </div>
              
              <button style={{
                width: '100%',
                padding: '0.75rem',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Revoke Access
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
