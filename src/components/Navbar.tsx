
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-bold text-white">
            RideCompare<span className="text-cyan-300">.AI</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
          <Button className="bg-white text-purple-700 hover:bg-white/90 font-medium">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
