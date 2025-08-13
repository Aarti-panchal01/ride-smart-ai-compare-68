
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-6">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-4xl font-bold text-white tracking-tight">
          RideCompare<span className="text-cyan-300 animate-pulse-light">.AI</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
