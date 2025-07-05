import React from 'react';

const AnimatedBackground = React.memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Top-right orb: Purple to Light Purple gradient */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
    
    {/* Bottom-left orb: Blue to Light Blue gradient */}
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-blue-200 to-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
    
    {/* Center-left orb: Indigo to Light Indigo gradient */}
    <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
  </div>
));

export default AnimatedBackground;