'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 1000;
          background: rgba(147, 51, 234, 0.9);
          border: none;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          font-size: 1.5rem;
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.98);
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        }
        
        .mobile-menu-item {
          font-size: 1.5rem;
          color: white;
          text-decoration: none;
          padding: 1rem 2rem;
          border: 2px solid #9333ea;
          border-radius: 8px;
          width: 80%;
          text-align: center;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
      
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>
      
      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-item" onClick={() => { router.push('/'); setIsOpen(false); }}>
            Home
          </div>
          <div className="mobile-menu-item" onClick={() => { router.push('/dashboard'); setIsOpen(false); }}>
            Dashboard
          </div>
          <div className="mobile-menu-item" onClick={() => { window.open('https://github.com/0xcryptokage/noxium', '_blank'); setIsOpen(false); }}>
            GitHub
          </div>
        </div>
      )}
    </>
  );
}
