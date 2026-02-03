import { NextRequest, NextResponse } from 'next/server';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

export async function POST(request: NextRequest) {
  const { wallet } = await request.json();
  
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getAssetsByOwner',
        params: { ownerAddress: wallet, page: 1, limit: 1000 },
      }),
    });

    const data = await response.json();
    const tokens = (data.result?.items || [])
      .filter((item: any) => item.interface === 'FungibleToken')
      .map((item: any) => ({
        mint: item.id,
        symbol: item.token_info?.symbol || 'UNKNOWN',
        balance: item.token_info?.balance || 0,
        decimals: item.token_info?.decimals || 0,
      }));

    return NextResponse.json({ tokens });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}
