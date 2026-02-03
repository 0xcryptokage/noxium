'use client';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%);
          color: #ffffff;
          min-height: 100vh;
        }
        
        .gradient-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 0%, rgba(147, 51, 234, 0.15), transparent 60%),
                      radial-gradient(ellipse at 100% 50%, rgba(236, 72, 153, 0.1), transparent 60%);
          z-index: 0;
        }
        
        .container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .hero {
          text-align: center;
          padding: 8rem 2rem 6rem;
        }
        
        .logo {
          font-size: 6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }
        
        .tagline {
          font-size: 2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .description {
          font-size: 1.25rem;
          color: #9ca3af;
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }
        
        .cta-btn {
          display: inline-block;
          padding: 1.25rem 3rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(147, 51, 234, 0.4);
        }
        
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(147, 51, 234, 0.6);
        }
        
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 6rem 0;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s;
        }
        
        .stat-card:hover {
          border-color: rgba(147, 51, 234, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1.1rem;
          color: #9ca3af;
          font-weight: 500;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.3s;
        }
        
        .feature-card:hover {
          border-color: rgba(147, 51, 234, 0.5);
          transform: translateY(-4px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        
        .feature-desc {
          color: #9ca3af;
          line-height: 1.6;
        }
        
        footer {
          text-align: center;
          padding: 4rem 2rem 2rem;
          color: #6b7280;
          font-size: 0.95rem;
        }
        
        @media (max-width: 768px) {
          .logo { font-size: 3.5rem; }
          .tagline { font-size: 1.5rem; }
          .description { font-size: 1rem; }
          .hero { padding: 4rem 1rem 3rem; }
          .stats { grid-template-columns: 1fr; }
          .features { grid-template-columns: 1fr; }
        }
      `}</style>
      
      <div className="gradient-bg"></div>
      
      <div className="container">
        <div className="hero">
          <div className="logo">NOXIUM</div>
          <h1 className="tagline">Solana Wallet Intelligence</h1>
          <p className="description">
            Real-time portfolio analysis. Detect risks, monitor positions, 
            audit security, and discover hidden value—all in one dashboard.
          </p>
          <a href="/dashboard" className="cta-btn">Launch App</a>
        </div>
        
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">On-Chain</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">&lt;1s</div>
            <div className="stat-label">Analysis Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Monitoring</div>
          </div>
        </div>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <div className="feature-title">Token Risk Scanner</div>
            <div className="feature-desc">AI-powered analysis detects scam tokens and risky holdings instantly.</div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚠️</div>
            <div className="feature-title">Liquidation Monitor</div>
            <div className="feature-desc">Track DeFi positions across Kamino, MarginFi, and Solend in real-time.</div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">Security Audit</div>
            <div className="feature-desc">Scan for dangerous token approvals and revoke with one click.</div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <div className="feature-title">Hidden Value Finder</div>
            <div className="feature-desc">Discover unclaimed airdrops, idle assets, and staking opportunities.</div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Portfolio Health Score</div>
            <div className="feature-desc">Comprehensive risk rating updated in real-time.</div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📡</div>
            <div className="feature-title">Live Alerts</div>
            <div className="feature-desc">Instant notifications for suspicious activity and critical events.</div>
          </div>
        </div>
        
        <footer>
          Built for Colosseum Agent Hackathon 2026 • Powered by Helius & Jupiter
        </footer>
      </div>
    </>
  );
}
