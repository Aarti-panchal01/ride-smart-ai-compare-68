
import React from 'react';
import RideOption, { RideOptionProps } from './RideOption';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface RideOptionsProps {
  source?: string;
  destination?: string;
}

const RideOptions: React.FC<RideOptionsProps> = ({ source, destination }) => {
  // This would come from our backend in a real application
  const rideOptions: RideOptionProps[] = [
    {
      provider: 'uber',
      type: 'UberGo',
      fare: 254,
      eta: 4,
      travelTime: 24,
      recommended: true,
      recommendReason: 'Best overall value'
    },
    {
      provider: 'ola',
      type: 'Ola Mini',
      fare: 224,
      eta: 8,
      travelTime: 22,
      recommendReason: 'Lowest price'
    },
    {
      provider: 'rapido',
      type: 'Bike',
      fare: 129,
      eta: 3,
      travelTime: 18,
      recommendReason: 'Fastest arrival'
    },
    {
      provider: 'uber',
      type: 'Premier',
      fare: 356,
      eta: 6,
      travelTime: 24,
    },
    {
      provider: 'ola',
      type: 'Prime Sedan',
      fare: 328,
      eta: 7,
      travelTime: 22,
    },
  ];

  const showMockResults = source && destination;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Available Rides</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">AI Recommended</Badge>
        </div>
      </div>

      {showMockResults ? (
        <Tabs defaultValue="all">
          <TabsList className="glass w-full mb-4">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="economy" className="flex-1">Economy</TabsTrigger>
            <TabsTrigger value="premium" className="flex-1">Premium</TabsTrigger>
            <TabsTrigger value="fastest" className="flex-1">Fastest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rideOptions.map((option, index) => (
                <RideOption key={index} {...option} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="economy" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rideOptions
                .filter(option => option.fare < 300)
                .map((option, index) => (
                  <RideOption key={index} {...option} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="premium" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rideOptions
                .filter(option => option.fare >= 300)
                .map((option, index) => (
                  <RideOption key={index} {...option} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fastest" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rideOptions
                .sort((a, b) => (a.eta + a.travelTime) - (b.eta + b.travelTime))
                .slice(0, 3)
                .map((option, index) => (
                  <RideOption 
                    key={index} 
                    {...option} 
                    recommended={index === 0}
                    recommendReason={index === 0 ? "Fastest option" : undefined}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="glass p-8 text-center">
          <p className="text-white/70">Enter pickup and destination to see available rides</p>
        </div>
      )}
    </div>
  );
};

export default RideOptions;
