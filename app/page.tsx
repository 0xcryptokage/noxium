'use client';

export default function Home() {
  const connectWallet = () => {
    const hero = document.getElementById('hero');
    const dashboard = document.getElementById('dashboard');
    if (hero) hero.style.display = 'none';
    if (dashboard) dashboard.classList.add('active');
  };

  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Courier New', monospace;
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        .neon-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }
        
        .glow-1 { top: -200px; left: -200px; animation: float1 15s infinite; }
        .glow-2 { bottom: -200px; right: -200px; animation: float2 20s infinite; }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, 100px); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-100px, -100px); }
        }
        
        .container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        header {
          text-align: center;
          padding: 6rem 2rem 4rem;
        }
        
        .logo {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: 0.3rem;
          text-transform: uppercase;
          background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
          margin-bottom: 1rem;
          animation: pulse 3s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        
        .tagline {
          font-size: 1.5rem;
          color: #a855f7;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
        }
        
        .description {
          font-size: 1rem;
          color: #9ca3af;
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }
        
        .neon-btn {
          display: inline-block;
          padding: 1.2rem 3rem;
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          color: #ffffff;
          background: transparent;
          border: 3px solid #9333ea;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 
            0 0 10px rgba(147, 51, 234, 0.5),
            0 0 20px rgba(147, 51, 234, 0.3),
            inset 0 0 10px rgba(147, 51, 234, 0.2);
        }
        
        .neon-btn:hover {
          background: rgba(147, 51, 234, 0.2);
          box-shadow: 
            0 0 20px rgba(147, 51, 234, 0.8),
            0 0 40px rgba(147, 51, 234, 0.6),
            inset 0 0 20px rgba(147, 51, 234, 0.4);
          transform: translateY(-2px);
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        
        .feature-card {
          background: rgba(20, 20, 30, 0.8);
          border: 2px solid rgba(147, 51, 234, 0.3);
          padding: 2.5rem;
          position: relative;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }
        
        .feature-card:hover {
          border-color: #9333ea;
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.8));
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin-bottom: 1rem;
          color: #a855f7;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        
        .feature-desc {
          color: #9ca3af;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .dashboard {
          display: none;
          margin-top: 3rem;
        }
        
        .dashboard.active {
          display: block;
        }
        
        .health-score {
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%);
          border: 2px solid #9333ea;
          padding: 4rem;
          text-align: center;
          margin-bottom: 3rem;
          box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
        }
        
        .score-number {
          font-size: 6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .score-label {
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          color: #a855f7;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .dashboard-card {
          background: rgba(20, 20, 30, 0.9);
          border: 2px solid rgba(147, 51, 234, 0.4);
          padding: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(147, 51, 234, 0.3);
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          color: #a855f7;
        }
        
        .action-btn {
          background: transparent;
          border: 2px solid #10b981;
          color: #10b981;
          padding: 1rem 2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          cursor: pointer;
          margin-top: 1.5rem;
          width: 100%;
          transition: all 0.3s;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }
        
        .action-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
        }
        
        .action-btn.danger {
          border-color: #ef4444;
          color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
        }
        
        .action-btn.danger:hover {
          background: rgba(239, 68, 68, 0.2);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
        }
        
        footer {
          text-align: center;
          padding: 4rem 2rem 2rem;
          color: #6b7280;
          font-size: 0.9rem;
          letter-spacing: 0.1rem;
        }
      `}</style>
      
      <div className="bg-grid"></div>
      <div className="neon-glow glow-1"></div>
      <div className="neon-glow glow-2"></div>
      
      <div className="container">
        <div id="hero">
          <header>
            <div className="logo">NOXIUM</div>
            <p className="tagline">Wallet Intelligence</p>
            <p className="description">
              Advanced Solana portfolio analysis. Detect risks, monitor liquidations, 
              audit security, and discover hidden value—all in real-time.
            </p>
            <button className="neon-btn" onClick={connectWallet}>CONNECT WALLET</button>
          </header>
          
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <div className="feature-title">Risk Scanner</div>
              <div className="feature-desc">AI-powered token analysis. Detect scams instantly. One-click liquidation to USDC.</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <div className="feature-title">Liquidation Monitor</div>
              <div className="feature-desc">Real-time DeFi position tracking. Get alerts before liquidation hits.</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <div className="feature-title">Security Audit</div>
              <div className="feature-desc">Scan for dangerous approvals. Revoke unauthorized access instantly.</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <div className="feature-title">Value Finder</div>
              <div className="feature-desc">Discover unclaimed airdrops, idle assets, and hidden opportunities.</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <div className="feature-title">Health Score</div>
              <div className="feature-desc">Comprehensive portfolio health rating. Know your risk level instantly.</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📡</div>
              <div className="feature-title">Live Monitoring</div>
              <div className="feature-desc">24/7 wallet surveillance. Instant alerts for suspicious activity.</div>
            </div>
          </div>
        </div>
        
        <div id="dashboard" className="dashboard">
          <div className="health-score">
            <div className="score-number">68</div>
            <div className="score-label">Health Score</div>
            <div style={{marginTop: '1.5rem', fontSize: '1.2rem', color: '#fbbf24'}}>⚠️ WARNING - 2 RISKS DETECTED</div>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <div style={{fontSize: '2rem'}}>🔍</div>
                <div className="card-title">Risky Tokens</div>
              </div>
              <p style={{color: '#9ca3af', marginBottom: '1rem'}}>3 tokens flagged with risk scores &gt; 70</p>
              <p style={{marginBottom: '0.5rem', color: '#ef4444'}}>$SCAM - Risk: 95/100 🔴</p>
              <p style={{marginBottom: '0.5rem', color: '#fbbf24'}}>$PUMP - Risk: 72/100 🟡</p>
              <button className="action-btn danger">LIQUIDATE ALL</button>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <div style={{fontSize: '2rem'}}>⚠️</div>
                <div className="card-title">DeFi Positions</div>
              </div>
              <p style={{color: '#9ca3af', marginBottom: '1rem'}}>2 active positions monitored</p>
              <p style={{marginBottom: '0.5rem', color: '#10b981'}}>Kamino: Health 1.82 🟢</p>
              <p style={{marginBottom: '0.5rem', color: '#fbbf24'}}>MarginFi: Health 1.12 🟡</p>
              <button className="action-btn">ADD COLLATERAL</button>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <div style={{fontSize: '2rem'}}>🛡️</div>
                <div className="card-title">Security</div>
              </div>
              <p style={{color: '#9ca3af', marginBottom: '1rem'}}>3 dangerous approvals found</p>
              <p style={{marginBottom: '0.5rem', color: '#ef4444'}}>USDC - Unlimited access 🔴</p>
              <button className="action-btn danger">REVOKE ALL</button>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <div style={{fontSize: '2rem'}}>💰</div>
                <div className="card-title">Hidden Value</div>
              </div>
              <p style={{color: '#9ca3af', marginBottom: '1rem'}}>$87 discovered</p>
              <p style={{marginBottom: '0.5rem', color: '#10b981'}}>Jupiter Airdrop: $45</p>
              <p style={{marginBottom: '0.5rem', color: '#10b981'}}>Idle SOL: $28</p>
              <button className="action-btn">CLAIM ALL</button>
            </div>
          </div>
        </div>
        
        <footer>
          NOXIUM // COLOSSEUM AGENT HACKATHON 2026 // BUILT BY ACE ⚡
        </footer>
      </div>
    </>
  );
}
