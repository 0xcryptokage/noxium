import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

export async function POST(request: NextRequest) {
  const { wallet } = await request.json();
  
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    
    // Get SOL balance
    const balance = await connection.getBalance(new PublicKey(wallet));
    const solBalance = balance / 1e9;
    
    // Get token accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(wallet),
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    
    const tokenCount = tokenAccounts.value.length;
    
    // Simple health calculation
    let healthScore = 85;
    
    // Deduct for complexity
    if (tokenCount > 20) healthScore -= 10;
    if (tokenCount > 50) healthScore -= 10;
    
    // Deduct for low SOL (rent issues)
    if (solBalance < 0.05) healthScore -= 15;
    
    return NextResponse.json({
      healthScore: Math.max(0, Math.min(100, healthScore)),
      solBalance,
      tokenCount,
      metrics: {
        complexity: tokenCount > 20 ? 'high' : 'normal',
        rentRisk: solBalance < 0.05 ? 'critical' : 'safe'
      }
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze wallet' }, { status: 500 });
  }
}
