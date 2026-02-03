'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            Sol<span className="text-purple-400">Pulse</span> ⚡
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Your Solana wallet's vital signs, in real-time.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Check your wallet health in 30 seconds. Find risks, fix problems, and discover hidden value—all in one click.
          </p>
          
          {/* Connect Wallet Button */}
          <div className="flex justify-center">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !px-8 !py-4 !text-lg" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard 
            icon="🔍"
            title="Token Risk Scanner"
            description="Detect scam tokens instantly. One-click sell to USDC."
          />
          <FeatureCard 
            icon="⚠️"
            title="Liquidation Monitor"
            description="Track DeFi positions. Get alerts before liquidation."
          />
          <FeatureCard 
            icon="🛡️"
            title="Security Audit"
            description="Find dangerous token approvals. Revoke with one click."
          />
          <FeatureCard 
            icon="💰"
            title="Hidden Value Finder"
            description="Unclaimed airdrops. Idle assets. Free money found."
          />
          <FeatureCard 
            icon="📊"
            title="Health Score"
            description="Overall wallet safety rating. Green, yellow, or red."
          />
          <FeatureCard 
            icon="📅"
            title="Daily Digest"
            description="Morning summary. Action items. Weekly recap."
          />
        </div>

        {/* Stats */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-sm">
            Built for the Colosseum Agent Hackathon by Ace ⚡
          </p>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
