// Token metadata and risk scoring

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

export interface TokenMetadata {
  mint: string;
  symbol: string;
  name: string;
  logoURI?: string;
  decimals: number;
}

export interface RiskScore {
  score: number; // 0-100 (100 = highest risk)
  level: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  flags: string[];
}

export async function getTokenMetadata(mint: string): Promise<TokenMetadata | null> {
  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getAsset',
        params: { id: mint }
      })
    });
    
    const data = await response.json();
    
    if (data.result) {
      return {
        mint,
        symbol: data.result.content?.metadata?.symbol || 'UNKNOWN',
        name: data.result.content?.metadata?.name || 'Unknown Token',
        logoURI: data.result.content?.links?.image,
        decimals: data.result.token_info?.decimals || 0
      };
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
  }
  return null;
}

export function calculateRiskScore(metadata: TokenMetadata, holderCount?: number): RiskScore {
  let score = 0;
  const flags: string[] = [];
  
  // Basic heuristics (will improve with real data)
  if (metadata.symbol === 'UNKNOWN' || !metadata.name) {
    score += 30;
    flags.push('No metadata');
  }
  
  if (!metadata.logoURI) {
    score += 10;
    flags.push('No logo');
  }
  
  if (holderCount && holderCount < 100) {
    score += 25;
    flags.push('Low holder count');
  }
  
  // Determine level
  let level: RiskScore['level'] = 'safe';
  if (score >= 90) level = 'critical';
  else if (score >= 70) level = 'high';
  else if (score >= 50) level = 'medium';
  else if (score >= 30) level = 'low';
  
  return { score, level, flags };
}
