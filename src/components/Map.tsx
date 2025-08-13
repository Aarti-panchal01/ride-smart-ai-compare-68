import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MapProps {
  source?: string;
  destination?: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
}

const Map: React.FC<MapProps> = ({ source, destination }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
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

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      projection: 'globe' as any,
      zoom: 2,
      center: [77.5946, 12.9716], // Bangalore coordinates
      pitch: 50,
      bearing: 0,
      antialias: true
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(220, 159, 159)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.4,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.35
      });
    });

    // Rotation animation settings
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    // Spin globe function
    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Event listeners for interaction
    map.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    map.current.on('dragstart', () => {
      userInteracting = true;
    });
    
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });
    
    map.current.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on('moveend', () => {
      spinGlobe();
    });

    // Start the globe spinning
    spinGlobe();

    // Add route markers when source and destination are available
    if (source && destination) {
      // Add source marker
      new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat([77.5946, 12.9716])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${source}</h3>`))
        .addTo(map.current);

      // Add destination marker  
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat([77.6347, 12.9082])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${destination}</h3>`))
        .addTo(map.current);

      // Fit to show both markers
      const bounds = new mapboxgl.LngLatBounds()
        .extend([77.5946, 12.9716])
        .extend([77.6347, 12.9082]);
      
      map.current.fitBounds(bounds, { padding: 100 });
    }

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden glass relative flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Enable 3D Map</h3>
          <p className="text-sm text-foreground/70 mb-4">
            Enter your Mapbox public token to see a beautiful 3D globe map. Get your free token at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-background/50 border-border text-foreground"
            />
            <Button 
              onClick={handleTokenSubmit}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Initialize Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-xl shadow-2xl" />
      
      {/* Route information overlay */}
      {(source && destination) && (
        <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-foreground">{source}</span>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-foreground">{routeInfo.distance}</div>
              <div className="text-xs text-foreground/70">{routeInfo.duration}</div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">{destination}</span>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20 rounded-xl" />
    </div>
  );
};

export default Map;