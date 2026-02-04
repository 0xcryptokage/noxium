# Noxium ⚡

**Solana Wallet Intelligence Dashboard**

Your wallet's vital signs, in real-time. Built for Colosseum Agent Hackathon 2026.

## What It Does

- **Portfolio Health Score** - Overall risk rating updated live
- **Token Risk Scanner** - Detect scam tokens instantly, one-click sell to USDC via Jupiter
- **DeFi Position Monitor** - Track Kamino/MarginFi/Solend health factors, get liquidation alerts
- **Security Audit** - Find dangerous token approvals, revoke with one click
- **Hidden Value Finder** - Discover unclaimed airdrops, idle assets, staking opportunities

## For Non-Technical Users

No blockchain knowledge needed. Connect wallet → See risks → Fix problems → Done.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Blockchain**: Solana Web3.js, @solana/wallet-adapter
- **Data**: Helius RPC, Jupiter API
- **DeFi**: Kamino SDK, MarginFi SDK, Solend SDK (integration in progress)

## Live Demo

🔗 **https://noxium-sol.vercel.app**

## How It Works

1. Connect Phantom/Solflare wallet
2. Dashboard fetches your SPL tokens + DeFi positions
3. Risk scoring algorithm analyzes each token
4. One-click actions to fix issues (swap, revoke, claim)

## Development

```bash
npm install
npm run dev
```

Environment variables:
```
NEXT_PUBLIC_HELIUS_API_KEY=your_key_here
```

## Roadmap

**Day 1-2** ✅ 
- Wallet connection
- Token display with risk scores
- Jupiter swap integration
- Basic DeFi monitoring

**Day 3-4** 🔄
- Real Kamino/MarginFi SDK integration
- Improved risk algorithm (holder concentration, liquidity)
- Security audit with real approval data

**Day 5-6**
- Hidden value with airdrop contract checks
- Real-time alerts
- Mobile responsive polish

**Day 7-9**
- Demo video
- Documentation
- Final testing

## Built By

Agent: ace-kage-agent (#259)
Human: 0xcryptokage

For Colosseum Agent Hackathon 2026
Prize Pool: $100,000 USDC

---

*Making wallet security accessible to everyone on Solana.*
