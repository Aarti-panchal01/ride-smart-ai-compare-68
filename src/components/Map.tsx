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
      const fetchRouteInfo = setTimeout(() => {
        const getRouteDetails = () => {
          const knownRoutes: Record<string, RouteInfo> = {
            'pesu rr-reva university': { distance: '38.8 km', duration: '1 hr 10 min' },
            'pesu rr-downtown': { distance: '12.3 km', duration: '35 min' },
            'downtown-marina': { distance: '5.7 km', duration: '15 min' },
            'park view-green park': { distance: '7.9 km', duration: '22 min' },
            'current location-reva university': { distance: '40.2 km', duration: '1 hr 15 min' },
            'current location-downtown': { distance: '10.5 km', duration: '30 min' },
          };

          const routeKey = `${source.toLowerCase()}-${destination.toLowerCase()}`;
          const reverseRouteKey = `${destination.toLowerCase()}-${source.toLowerCase()}`;

          if (knownRoutes[routeKey]) {
            return knownRoutes[routeKey];
          } else if (knownRoutes[reverseRouteKey]) {
            return knownRoutes[reverseRouteKey];
          }

          const combinedLength = (source.length + destination.length) % 10;
          const baseDistance = 5 + combinedLength * 3.5;
          const baseDuration = Math.round(baseDistance * 1.8);

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
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden glass relative">
      {/* Beautiful map background with enhanced styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Map grid with enhanced styling */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-16 grid-rows-12 h-full w-full">
            {Array.from({ length: 192 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-foreground/10"></div>
            ))}
          </div>
        </div>
        
        {/* Enhanced road network */}
        <div className="absolute inset-0">
          {/* Main highways */}
          <div className="absolute top-1/4 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
          <div className="absolute left-1/4 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-foreground/30 to-transparent"></div>
          <div className="absolute left-3/4 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-foreground/30 to-transparent"></div>
          
          {/* Secondary roads */}
          <div className="absolute top-[15%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
          <div className="absolute top-[60%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
          <div className="absolute left-[15%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent"></div>
          <div className="absolute left-[85%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent"></div>
          
          {/* Diagonal connections */}
          <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent origin-bottom-left rotate-45 left-0 top-0"></div>
          <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent origin-top-left -rotate-45 left-0 bottom-0"></div>
        </div>
        
        {/* Enhanced city areas and landmarks */}
        <div className="absolute inset-0">
          {/* Business districts */}
          <div className="absolute top-[18%] left-[25%] w-[20%] h-[15%] rounded-lg bg-primary/10 blur-sm"></div>
          <div className="absolute bottom-[20%] right-[15%] w-[25%] h-[12%] rounded-lg bg-accent-cyan/10 blur-sm"></div>
          <div className="absolute top-[55%] left-[10%] w-[15%] h-[12%] rounded-lg bg-accent-purple/10 blur-sm"></div>
          
          {/* Important landmarks with glowing effect */}
          <div className="absolute top-[12%] left-[35%] w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50"></div>
          <div className="absolute top-[40%] left-[15%] w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-lg shadow-accent-cyan/50"></div>
          <div className="absolute top-[65%] left-[70%] w-2 h-2 rounded-full bg-accent-purple animate-pulse shadow-lg shadow-accent-purple/50"></div>
          <div className="absolute top-[25%] left-[80%] w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50"></div>
          <div className="absolute top-[50%] right-[20%] w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-lg shadow-accent-cyan/50"></div>
          
          {/* Buildings with enhanced styling */}
          <div className="absolute top-[10%] left-[10%] w-3 h-4 bg-foreground/20 rounded-sm shadow-lg"></div>
          <div className="absolute top-[20%] left-[50%] w-4 h-3 bg-foreground/20 rounded-sm shadow-lg"></div>
          <div className="absolute top-[60%] left-[75%] w-3 h-4 bg-foreground/20 rounded-sm shadow-lg"></div>
          <div className="absolute top-[70%] left-[20%] w-5 h-3 bg-foreground/20 rounded-sm shadow-lg"></div>
          <div className="absolute top-[40%] right-[10%] w-3 h-3 bg-foreground/20 rounded-sm shadow-lg"></div>
          
          {/* Water bodies with reflection effect */}
          <div className="absolute top-[45%] left-[50%] w-[18%] h-[18%] rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/30 shadow-inner"></div>
          
          {/* Parks and green spaces */}
          <div className="absolute top-[15%] right-[20%] w-[12%] h-[12%] bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-lg shadow-inner"></div>
        </div>
        
        {/* Enhanced map labels */}
        <div className="absolute inset-0 text-[8px] font-medium text-foreground/50 select-none">
          <div className="absolute top-[20%] left-[27%]">Business District</div>
          <div className="absolute bottom-[23%] right-[17%]">Marina Bay</div>
          <div className="absolute top-[57%] left-[12%]">Tech Park</div>
          <div className="absolute top-[48%] left-[51%]">Central Lake</div>
          <div className="absolute top-[16%] right-[24%]">City Park</div>
        </div>
      </div>

      {/* Route visualization when both locations are selected */}
      {(source && destination) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {/* Enhanced route line */}
          <div className="relative w-4/5 h-2 bg-gradient-to-r from-transparent via-foreground/30 to-transparent rounded-full">
            {/* Start point with glow */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-green-400 rounded-full shadow-lg shadow-green-400/50 flex items-center justify-center">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Animated route line */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2 bg-gradient-to-r from-green-400 via-primary to-red-400 rounded-full animate-pulse"
                style={{width: '100%'}}></div>
            
            {/* End point with glow */}
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-red-400 rounded-full shadow-lg shadow-red-400/50 flex items-center justify-center">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced location labels */}
          <div className="flex justify-between w-4/5 mt-6 px-0">
            <div className="text-sm text-foreground font-semibold glass px-3 py-2 rounded-lg">
              📍 {source}
            </div>
            <div className="text-sm text-foreground font-semibold glass px-3 py-2 rounded-lg">
              🎯 {destination}
            </div>
          </div>

          {/* Enhanced distance and time display */}
          <div className="glass px-6 py-3 rounded-xl mt-6 border border-primary/20">
            <div className="flex items-center space-x-4 text-foreground">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{routeInfo.distance}</div>
                <div className="text-xs text-foreground/70 font-medium">Distance</div>
              </div>
              <div className="w-px h-8 bg-foreground/20"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent-cyan">{routeInfo.duration}</div>
                <div className="text-xs text-foreground/70 font-medium">Duration</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center glass px-6 py-4 rounded-xl border border-primary/20">
            <div className="text-2xl mb-2">🗺️</div>
            <p className="text-lg font-semibold text-foreground">Enter Pickup & Destination</p>
            <p className="text-sm mt-2 text-foreground/70 font-medium">We'll calculate the best route for you</p>
          </div>
        </div>
      )}

      {/* Subtle animated overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10 rounded-xl pointer-events-none"></div>
    </div>
  );
};

export default Map;