// Jupiter swap integration for selling risky tokens

export interface SwapRoute {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  priceImpact: number;
}

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

export async function getSwapQuote(
  inputMint: string,
  amount: number
): Promise<SwapRoute | null> {
  try {
    const lamports = Math.floor(amount * 1e9);
    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${USDC_MINT}&amount=${lamports}&slippageBps=50`
    );
    
    const data = await response.json();
    
    if (data.error) return null;
    
    return {
      inputMint,
      outputMint: USDC_MINT,
      inAmount: data.inAmount,
      outAmount: data.outAmount,
      priceImpact: parseFloat(data.priceImpactPct || '0')
    };
  } catch {
    return null;
  }
}

export function getJupiterSwapUrl(inputMint: string): string {
  return `https://jup.ag/swap/${inputMint}-${USDC_MINT}`;
}
