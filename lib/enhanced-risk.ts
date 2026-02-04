// Enhanced risk scoring with Helius holder data

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

export interface EnhancedRiskData {
  mint: string;
  holderCount: number;
  topHolderPercentage: number;
  liquidityUSD: number;
  ageInDays: number;
  hasMetadata: boolean;
  marketCapUSD?: number;
}

export async function getEnhancedRiskData(mint: string): Promise<EnhancedRiskData | null> {
  try {
    // Get token supply and holder info from Helius
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
      // Extract on-chain data
      return {
        mint,
        holderCount: data.result.supply?.holder_count || 0,
        topHolderPercentage: 0, // Would need additional API call
        liquidityUSD: 0, // Would need DexScreener integration
        ageInDays: 0, // Calculate from creation_date if available
        hasMetadata: !!data.result.content?.metadata,
        marketCapUSD: 0
      };
    }
  } catch (error) {
    console.error('Failed to fetch enhanced risk data:', error);
  }
  return null;
}

export function calculateEnhancedRiskScore(data: EnhancedRiskData): number {
  let riskScore = 0;
  
  // Holder concentration risk
  if (data.holderCount < 50) riskScore += 40;
  else if (data.holderCount < 200) riskScore += 25;
  else if (data.holderCount < 1000) riskScore += 10;
  
  // Top holder concentration
  if (data.topHolderPercentage > 50) riskScore += 30;
  else if (data.topHolderPercentage > 30) riskScore += 20;
  
  // Liquidity risk
  if (data.liquidityUSD < 5000) riskScore += 20;
  else if (data.liquidityUSD < 20000) riskScore += 10;
  
  // Age risk (new tokens = higher risk)
  if (data.ageInDays < 7) riskScore += 15;
  else if (data.ageInDays < 30) riskScore += 8;
  
  // Metadata risk
  if (!data.hasMetadata) riskScore += 15;
  
  return Math.min(100, riskScore);
}
