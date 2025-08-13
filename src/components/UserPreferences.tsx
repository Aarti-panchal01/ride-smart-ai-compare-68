
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Banknote, 
  Clock, 
  Thermometer, 
  Shield, 
  Umbrella
} from 'lucide-react';

const UserPreferences = () => {
  return (
    <div className="glass p-4 rounded-lg">
      <h3 className="font-medium mb-4">Smart Preferences</h3>
      
      <div className="space-y-6">
        {/* Price vs Time preference */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <Banknote className="h-3 w-3 mr-1" />
              <span>Save Money</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Save Time</span>
            </div>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
        
        {/* Comfort preference */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <span>Basic</span>
            </div>
            <div className="flex items-center">
              <span>Premium</span>
            </div>
          </div>
          <Slider defaultValue={[30]} max={100} step={1} />
        </div>
        
        {/* Weather adaptation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Umbrella className="h-4 w-4 text-gray-400" />
            <Label htmlFor="weather-adapt" className="text-sm">Weather adaptation</Label>
          </div>
          <Switch id="weather-adapt" />
        </div>
        
        {/* Safety priority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <Label htmlFor="safety-priority" className="text-sm">Prioritize safety</Label>
          </div>
          <Switch id="safety-priority" defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
