import React from 'react';
import { Place } from '../types';
import { getIconForPlace, ExternalLinkIcon } from './Icons';

interface PlaceCardProps {
  place: Place;
  onSelect: (place: Place) => void;
  isSelected: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onSelect, isSelected }) => {
  const IconComponent = getIconForPlace(place.title);
  
  const style: React.CSSProperties = {
    gridRowStart: place.gridPosition.rowStart,
    gridColumnStart: place.gridPosition.colStart,
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('a')) {
        return;
    }
    e.stopPropagation();
    onSelect(place);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement === e.currentTarget.querySelector('a')) {
          return;
      }
      e.preventDefault();
      e.stopPropagation();
      onSelect(place);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const selectedClasses = isSelected 
    ? 'ring-2 ring-cyan-400 scale-110 bg-slate-600/70' 
    : 'hover:border-cyan-500 transform hover:-translate-y-1 hover:bg-slate-600/70';

  return (
    <div
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      style={style} 
      className={`relative group flex flex-col items-center justify-center p-2 bg-slate-700/50 rounded-lg border border-slate-600 shadow-md ${selectedClasses} transition-all duration-300 ease-in-out animate-fade-in cursor-pointer focus:outline-none focus-within:ring-2 focus-within:ring-cyan-500`}
      title={place.title}
    >
      <a
        href={place.uri}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className="absolute top-1 right-1 z-10 p-1 text-slate-400 hover:text-cyan-400 rounded-full bg-slate-700/80 hover:bg-slate-600/80 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
        aria-label={`View ${place.title} on Google Maps`}
      >
        <ExternalLinkIcon className="w-4 h-4" />
      </a>

      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-cyan-400 flex-shrink-0" />
      <span className="text-xs font-semibold text-center leading-tight text-slate-200 line-clamp-2">
        {place.title}
      </span>
    </div>
  );
};