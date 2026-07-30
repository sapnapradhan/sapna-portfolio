'use client';

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Client side script binding for WebGL Engine
    const script = document.createElement('script');
    script.src = '/app.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#050507', color: '#FFF' }}>
      <iframe
        src="/index.html"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100
        }}
        title="Sapna AI OS Portfolio Engine"
      />
    </main>
  );
}
