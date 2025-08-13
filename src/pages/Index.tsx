
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LocationInput from '@/components/LocationInput';
import Map from '@/components/Map';
import RideOptions from '@/components/RideOptions';
import UserPreferences from '@/components/UserPreferences';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [source, setSource] = useState<string | undefined>();
  const [destination, setDestination] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSourceChange = (location: string) => {
    setSource(location);
  };
  
  const handleDestinationChange = (location: string) => {
    setDestination(location);
  };
  
  const handleRefreshRides = () => {
    if (source && destination) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen pb-8">
      <Navbar />
      
      <main className="container mx-auto px-4 mt-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Find Your Smartest Ride</h1>
          <p className="text-white/70">
            Compare fares and ETAs across Ola, Uber & Rapido with AI personalization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Location inputs */}
            <div className="glass p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <LocationInput 
                  label="Pickup Location"
                  onLocationSelected={handleSourceChange}
                />
                <LocationInput 
                  label="Destination"
                  onLocationSelected={handleDestinationChange}
                />
                
                <Button 
                  className="w-full compare-button"
                  onClick={handleRefreshRides}
                  disabled={!source || !destination || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Finding best rides...
                    </>
                  ) : (
                    'Compare Rides'
                  )}
                </Button>
              </div>
            </div>

            {/* Map */}
            <Map source={source} destination={destination} />
            
            {/* Ride options */}
            <RideOptions source={source} destination={destination} />
          </div>
          
          <div>
            {/* User preferences */}
            <UserPreferences />
            
            {/* AI insights (placeholder for future feature) */}
            <div className="glass p-4 rounded-lg mt-6">
              <h3 className="font-medium mb-3">AI Insights</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Surge pricing likely in 30 mins for Ola</p>
                <p>• Uber prices are 12% higher than average</p>
                <p>• Lower fares typically available after 8pm</p>
                <p>• Based on your history, you prefer Rapido for this route</p>
              </div>
            </div>
            
            {/* Recent rides */}
            <div className="glass p-4 rounded-lg mt-6">
              <h3 className="font-medium mb-3">Recent Rides</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Office → Home</span>
                  <span className="text-white/70">Yesterday</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Home → Mall</span>
                  <span className="text-white/70">May 1</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Airport → Hotel</span>
                  <span className="text-white/70">Apr 28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 mt-12 text-center text-white/50 text-sm">
        <p>© 2025 RideCompare.AI • AI-powered urban mobility assistant</p>
      </footer>
    </div>
  );
};

export default Index;
