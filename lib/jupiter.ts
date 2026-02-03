// Jupiter API Integration
export interface SwapQuote {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  priceImpactPct: number;
}

export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number
): Promise<SwapQuote | null> {
  try {
    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
    );
    const data = await response.json();
    
    if (data.error) return null;
    
    return {
      inputMint,
      outputMint,
      inAmount: data.inAmount,
      outAmount: data.outAmount,
      priceImpactPct: data.priceImpactPct * 100,
    };
  } catch {
    return null;
  }
}
