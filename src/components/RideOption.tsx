
import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface RideOptionProps {
  provider: 'uber' | 'ola' | 'rapido';
  type: string;
  fare: number;
  eta: number;
  travelTime: number;
  rating?: number;
  recommended?: boolean;
  recommendReason?: string;
}

const RideOption: React.FC<RideOptionProps> = ({
  provider,
  type,
  fare,
  eta,
  travelTime,
  rating = 4.5,
  recommended = false,
  recommendReason,
}) => {
  return (
    <div
      className={cn(
        'glass ride-card p-4 rounded-lg border',
        `${provider}`,
        recommended && 'recommended'
      )}
    >
      {recommended && (
        <div className="absolute top-0 right-0 z-10">
          <div className="text-xs font-bold rotate-45 translate-x-9 translate-y-4 text-white">
            BEST
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Replaced logo with text representation */}
          <div className="text-lg font-bold">
            {provider === 'uber' && 'Uber'}
            {provider === 'ola' && 'Ola'}
            {provider === 'rapido' && 'Rapido'}
          </div>
          <div className="text-sm font-medium">{type}</div>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-end">
        <div>
          <div className="text-2xl font-bold">₹{fare}</div>
          <div className="flex items-center text-xs font-medium text-white/80 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>ETA: {eta} min</span>
            <span className="mx-2">•</span>
            <span>{travelTime} min travel</span>
          </div>
          {recommended && recommendReason && (
            <div className="mt-2 text-xs font-medium px-2 py-1 bg-white/20 rounded-full inline-block">
              {recommendReason}
            </div>
          )}
        </div>
        <Button size="sm" className="bg-white/30 hover:bg-white/40 text-white font-medium">
          Book <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default RideOption;
