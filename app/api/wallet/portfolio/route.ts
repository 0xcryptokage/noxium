import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

export async function POST(request: NextRequest) {
  const { wallet } = await request.json();
  
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const pubkey = new PublicKey(wallet);
    
    // Get SOL balance
    const lamports = await connection.getBalance(pubkey);
    const solBalance = lamports / 1e9;
    
    // Get token accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      pubkey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    
    const tokens = tokenAccounts.value.map(account => {
      const data = account.account.data.parsed.info;
      return {
        mint: data.mint,
        balance: parseFloat(data.tokenAmount.uiAmount || '0'),
        decimals: data.tokenAmount.decimals
      };
    }).filter(t => t.balance > 0);
    
    // Calculate total value (simplified - would need price oracle)
    const totalValue = solBalance * 150; // Assume $150/SOL
    
    return NextResponse.json({
      wallet,
      solBalance,
      tokenCount: tokens.length,
      tokens: tokens.slice(0, 20), // Limit response size
      estimatedValue: totalValue,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}
