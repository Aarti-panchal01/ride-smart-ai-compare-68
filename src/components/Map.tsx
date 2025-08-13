
import React, { useEffect, useState } from 'react';

interface MapProps {
  source?: string;
  destination?: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
}

const Map: React.FC<MapProps> = ({ source, destination }) => {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    distance: '0',
    duration: '0'
  });

  // Simulate fetching route information when source and destination change
  useEffect(() => {
    if (source && destination) {
      // Simulate API call delay
      const fetchRouteInfo = setTimeout(() => {
        // Calculate a more realistic distance based on the locations
        const getRouteDetails = () => {
          // Define some known routes with more accurate distances
          const knownRoutes: Record<string, RouteInfo> = {
            'pesu rr-reva university': { distance: '38.8 km', duration: '1 hr 10 min' },
            'pesu rr-downtown': { distance: '12.3 km', duration: '35 min' },
            'downtown-marina': { distance: '5.7 km', duration: '15 min' },
            'park view-green park': { distance: '7.9 km', duration: '22 min' },
            'current location-reva university': { distance: '40.2 km', duration: '1 hr 15 min' },
            'current location-downtown': { distance: '10.5 km', duration: '30 min' },
          };

          // Create normalized keys for lookup
          const routeKey = `${source.toLowerCase()}-${destination.toLowerCase()}`;
          const reverseRouteKey = `${destination.toLowerCase()}-${source.toLowerCase()}`;

          // Return known route if it exists
          if (knownRoutes[routeKey]) {
            return knownRoutes[routeKey];
          } else if (knownRoutes[reverseRouteKey]) {
            return knownRoutes[reverseRouteKey];
          }

          // Generate realistic random values for unknown routes
          // Use source and destination strings to create a deterministic but seemingly random distance
          const combinedLength = (source.length + destination.length) % 10;
          const baseDistance = 5 + combinedLength * 3.5; // Between 5-40 km
          const baseDuration = Math.round(baseDistance * 1.8); // Approx 1.8 min per km

          return {
            distance: `${baseDistance.toFixed(1)} km`,
            duration: baseDuration >= 60 
              ? `${Math.floor(baseDuration / 60)} hr ${baseDuration % 60} min` 
              : `${baseDuration} min`
          };
        };

        setRouteInfo(getRouteDetails());
      }, 500);

      return () => clearTimeout(fetchRouteInfo);
    }
  }, [source, destination]);

  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden glass relative">
      {/* Purple map background */}
      <div className="absolute inset-0 bg-indigo-900/90">
        {/* Map grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 84 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10"></div>
          ))}
        </div>
        
        {/* Main roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-[2px] bg-white/20"></div>
          <div className="absolute top-3/4 left-0 w-full h-[2px] bg-white/20"></div>
          <div className="absolute left-1/4 top-0 h-full w-[2px] bg-white/20"></div>
          <div className="absolute left-3/4 top-0 h-full w-[2px] bg-white/20"></div>
          
          {/* Diagonal roads */}
          <div className="absolute w-[150%] h-[2px] bg-white/15 origin-bottom-left rotate-45 left-0 top-0"></div>
          <div className="absolute w-[150%] h-[2px] bg-white/15 origin-top-left -rotate-45 left-0 bottom-0"></div>
        </div>
        
        {/* Map locations/points of interest */}
        <div className="absolute inset-0">
          {/* Areas */}
          <div className="absolute top-[20%] left-[30%] w-[15%] h-[15%] rounded-full bg-purple-500/10 blur-sm"></div>
          <div className="absolute bottom-[25%] right-[20%] w-[20%] h-[10%] rounded-full bg-blue-500/10 blur-sm"></div>
          <div className="absolute top-[60%] left-[15%] w-[10%] h-[10%] rounded-full bg-green-500/10 blur-sm"></div>
          
          {/* Location markers */}
          <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-white"></div>
          <div className="absolute top-[45%] left-[20%] w-1.5 h-1.5 rounded-full bg-white/80"></div>
          <div className="absolute top-[70%] left-[75%] w-1 h-1 rounded-full bg-white"></div>
          <div className="absolute top-[30%] left-[65%] w-1.5 h-1.5 rounded-full bg-white/80"></div>
          <div className="absolute top-[60%] left-[35%] w-1 h-1 rounded-full bg-white"></div>
          <div className="absolute top-[25%] left-[85%] w-1 h-1 rounded-full bg-white/70"></div>
          <div className="absolute top-[55%] right-[25%] w-1.5 h-1.5 rounded-full bg-white/80"></div>
          
          {/* Buildings */}
          <div className="absolute top-[15%] left-[15%] w-2 h-3 bg-white/10"></div>
          <div className="absolute top-[25%] left-[55%] w-2.5 h-2 bg-white/10"></div>
          <div className="absolute top-[65%] left-[80%] w-2 h-2.5 bg-white/10"></div>
          <div className="absolute top-[75%] left-[25%] w-3 h-2 bg-white/10"></div>
          <div className="absolute top-[45%] right-[15%] w-2 h-2 bg-white/10"></div>
          
          {/* Water body */}
          <div className="absolute top-[50%] left-[55%] w-[15%] h-[15%] rounded-full bg-blue-400/20"></div>
          
          {/* Park/green area */}
          <div className="absolute top-[20%] right-[25%] w-[10%] h-[10%] bg-green-400/20 rounded-sm"></div>
        </div>
        
        {/* Map labels */}
        <div className="absolute inset-0 text-[6px] font-mono text-white/30">
          <div className="absolute top-[22%] left-[32%]">Downtown</div>
          <div className="absolute bottom-[28%] right-[22%]">Marina</div>
          <div className="absolute top-[62%] left-[17%]">Park View</div>
          <div className="absolute top-[53%] left-[56%]">Lake</div>
          <div className="absolute top-[21%] right-[29%]">Green Park</div>
        </div>
      </div>

      {/* Source and destination route visualization */}
      {(source && destination) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {/* Route line with points */}
          <div className="relative w-3/4 h-1 bg-white/20">
            {/* Start point (green) */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-green-400 rounded-full"></div>
            
            {/* Route line (white) */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1.5 bg-white/80"
                style={{width: '100%'}}></div>
            
            {/* End point (red) */}
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-red-400 rounded-full"></div>
          </div>

          {/* Location labels */}
          <div className="flex justify-between w-3/4 mt-5 px-0">
            <div className="text-sm text-white font-medium bg-black/30 px-2 py-1 rounded">
              {source}
            </div>
            <div className="text-sm text-white font-medium bg-black/30 px-2 py-1 rounded">
              {destination}
            </div>
          </div>

          {/* Distance and time - updated to use routeInfo */}
          <div className="text-md font-medium text-white bg-black/30 px-3 py-1 rounded mt-8">
            {routeInfo.distance} • {routeInfo.duration}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center text-white bg-black/40 px-4 py-3 rounded-lg">
            <p className="text-lg font-medium">Enter your pickup and destination</p>
            <p className="text-sm mt-2 text-white/80 font-medium">We'll show you the best ride options</p>
          </div>
        </div>
      )}

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '80px 80px'
           }}
      ></div>
    </div>
  );
};

export default Map;
