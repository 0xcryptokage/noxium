// Helius API Integration for Noxium
// Free tier: 100k requests/day

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || 'YOUR_KEY_HERE';
const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

export interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  uiAmount: number;
  symbol?: string;
  name?: string;
  logoURI?: string;
}

export interface TokenRiskScore {
  mint: string;
  riskScore: number; // 0-100 (100 = highest risk)
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  flags: string[];
  holderConcentration?: number;
  liquidityUSD?: number;
  ageInDays?: number;
}

// Fetch all tokens for a wallet
export async function getWalletTokens(walletAddress: string): Promise<TokenBalance[]> {
  try {
    const response = await fetch(HELIUS_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: walletAddress,
          page: 1,
          limit: 1000,
        },
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Helius API error:', data.error);
      return [];
    }

    // Parse token data
    const tokens: TokenBalance[] = [];
    
    for (const asset of data.result?.items || []) {
      if (asset.interface === 'FungibleToken') {
        tokens.push({
          mint: asset.id,
          amount: asset.token_info?.balance || 0,
          decimals: asset.token_info?.decimals || 0,
          uiAmount: (asset.token_info?.balance || 0) / Math.pow(10, asset.token_info?.decimals || 0),
          symbol: asset.token_info?.symbol,
          name: asset.content?.metadata?.name,
          logoURI: asset.content?.links?.image,
        });
      }
    }

    return tokens;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

// Calculate risk score for a token
export async function calculateTokenRisk(mint: string): Promise<TokenRiskScore> {
  // This is a simplified version - real implementation would:
  // 1. Check holder concentration via on-chain data
  // 2. Check liquidity pools
  // 3. Check against known scam database
  // 4. Analyze token age and transaction patterns
  
  // For MVP, we'll use heuristics and mock data
  // TODO: Integrate with DexScreener, Jupiter, or other APIs
  
  const riskScore = Math.floor(Math.random() * 100); // Placeholder
  
  let riskLevel: TokenRiskScore['riskLevel'] = 'safe';
  if (riskScore >= 90) riskLevel = 'critical';
  else if (riskScore >= 70) riskLevel = 'high';
  else if (riskScore >= 50) riskLevel = 'medium';
  else if (riskScore >= 30) riskLevel = 'low';
  
  const flags: string[] = [];
  if (riskScore > 70) flags.push('High holder concentration');
  if (riskScore > 80) flags.push('Low liquidity');
  if (riskScore > 90) flags.push('Possible scam');
  
  return {
    mint,
    riskScore,
    riskLevel,
    flags,
    holderConcentration: riskScore > 50 ? 75 + Math.random() * 20 : 20 + Math.random() * 30,
    liquidityUSD: riskScore > 70 ? 1000 + Math.random() * 5000 : 10000 + Math.random() * 100000,
    ageInDays: Math.floor(Math.random() * 365),
  };
}

// Get SOL balance
export async function getSOLBalance(walletAddress: string): Promise<number> {
  try {
    const response = await fetch(HELIUS_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [walletAddress],
      }),
    });

    const data = await response.json();
    const lamports = data.result?.value || 0;
    return lamports / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
}

// Calculate overall portfolio health score
export function calculateHealthScore(tokens: TokenBalance[], riskScores: TokenRiskScore[]): number {
  if (tokens.length === 0) return 100;
  
  // Weighted average of token risk scores
  let totalValue = 0;
  let weightedRisk = 0;
  
  tokens.forEach((token, index) => {
    const value = token.uiAmount; // Simplified - should use USD value
    const risk = riskScores[index]?.riskScore || 0;
    
    totalValue += value;
    weightedRisk += value * risk;
  });
  
  const avgRisk = totalValue > 0 ? weightedRisk / totalValue : 0;
  
  // Invert score (higher risk = lower health)
  return Math.max(0, Math.min(100, 100 - avgRisk));
}
