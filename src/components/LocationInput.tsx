
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, LocateFixed } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LocationInputProps {
  label: string;
  onLocationSelected: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ label, onLocationSelected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [value, setValue] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    // Simulating geolocation API call
    setTimeout(() => {
      if (label.toLowerCase().includes('pickup')) {
        setValue('Current Location');
        onLocationSelected('Current Location');
      } else {
        toast({
          title: "Location Detection",
          description: "Please enter your destination manually",
        });
      }
      setIsDetecting(false);
    }, 1500);
  };

  const handleBlur = () => {
    if (value.trim()) {
      onLocationSelected(value);
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
        <MapPin className="h-5 w-5" />
      </div>
      <Input
        className="pl-10 pr-12 py-6 location-input font-medium"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-white hover:bg-white/10"
        onClick={handleDetectLocation}
        disabled={isDetecting}
      >
        {isDetecting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LocateFixed className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default LocationInput;
