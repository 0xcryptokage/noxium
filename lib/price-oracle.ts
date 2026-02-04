// Price oracle integration for portfolio valuation

const PRICE_CACHE = new Map<string, { price: number; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute

export async function getTokenPrice(mint: string): Promise<number> {
  // Check cache
  const cached = PRICE_CACHE.get(mint);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.price;
  }
  
  try {
    // Use Jupiter price API
    const response = await fetch(`https://price.jup.ag/v4/price?ids=${mint}`);
    const data = await response.json();
    
    if (data.data && data.data[mint]) {
      const price = data.data[mint].price;
      PRICE_CACHE.set(mint, { price, timestamp: Date.now() });
      return price;
    }
  } catch (error) {
    console.error('Price fetch error:', error);
  }
  
  return 0;
}

export async function calculatePortfolioValue(
  solBalance: number,
  tokens: Array<{ mint: string; balance: number }>
): Promise<number> {
  let totalValue = 0;
  
  // SOL value
  const solPrice = await getTokenPrice('So11111111111111111111111111111111111111112');
  totalValue += solBalance * solPrice;
  
  // Token values
  for (const token of tokens) {
    const price = await getTokenPrice(token.mint);
    totalValue += token.balance * price;
  }
  
  return totalValue;
}
