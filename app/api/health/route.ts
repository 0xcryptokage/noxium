import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    version: '0.1.0',
    features: [
      'wallet_connection',
      'token_risk_scoring',
      'jupiter_swap',
      'defi_monitoring',
      'security_audit',
      'hidden_value'
    ],
    endpoints: {
      wallet_tokens: '/api/wallet/tokens',
      health: '/api/health'
    }
  });
}
