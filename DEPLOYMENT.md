# Noxium Deployment Guide

## Prerequisites

- Node.js 18+
- Helius API Key (free tier: https://helius.dev)
- Vercel account (or any Next.js hosting)

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key_here
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add environment variable: `NEXT_PUBLIC_HELIUS_API_KEY`
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Wallet Analysis
```
POST /api/wallet/health
Body: { "wallet": "SolanaAddress..." }
```

### Token Data
```
POST /api/wallet/tokens
Body: { "wallet": "SolanaAddress..." }
```

## Features

- ✅ Wallet connection (Phantom/Solflare)
- ✅ Token risk scoring
- ✅ Jupiter swap integration
- ✅ DeFi position monitoring
- ✅ Security audit
- ✅ Hidden value finder
- 🔄 Real Kamino SDK (in progress)

## Performance

- First load: ~2s
- Token fetch: ~1-3s (depends on wallet size)
- Risk calculation: <100ms per token

## Monitoring

Check Vercel dashboard for:
- Build logs
- Runtime logs
- Analytics

## Support

- GitHub: https://github.com/0xcryptokage/noxium
- Demo: https://noxium-sol.vercel.app
