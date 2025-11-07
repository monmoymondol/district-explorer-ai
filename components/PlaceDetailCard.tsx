import React from 'react';
import { Place } from '../types';
import { getIconForPlace } from './Icons';

interface PlaceDetailCardProps {
  place: Place;
  onClose: () => void;
}

export const PlaceDetailCard: React.FC<PlaceDetailCardProps> = ({ place, onClose }) => {
  const IconComponent = getIconForPlace(place.title);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg animate-slide-in-down w-full max-w-2xl mx-auto flex items-center justify-between gap-4">
       <style>{`
        @keyframes slide-in-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-down { animation: slide-in-down 0.4s ease-out forwards; }
      `}</style>
      <div className="flex items-center gap-4 flex-grow min-w-0">
        <div className="flex-shrink-0 bg-slate-700 p-3 rounded-full">
            <IconComponent className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-grow min-w-0">
            <h3 className="font-bold text-lg text-slate-100 truncate" title={place.title}>{place.title}</h3>
            <a 
                href={place.uri} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
                View on Google Maps
            </a>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="text-slate-500 hover:text-slate-300 transition-colors p-2 rounded-full hover:bg-slate-700 flex-shrink-0"
        aria-label="Close details"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
