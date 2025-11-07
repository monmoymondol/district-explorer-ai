import React, { useState, useRef, MouseEvent, WheelEvent } from 'react';
import { Place } from '../types';
import { PlaceCard } from './PlaceCard';
import { PlusIcon, MinusIcon, ArrowPathIcon } from './Icons';

interface MapGridProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  onDeselect: () => void;
  selectedPlaceId: string | null;
}

export const MapGrid: React.FC<MapGridProps> = ({ places, onSelectPlace, onDeselect, selectedPlaceId }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);


  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;

  const handleZoom = (direction: 'in' | 'out', amount: number = 0.2) => {
    setScale(prevScale => {
      const newScale = direction === 'in' ? prevScale + amount : prevScale - amount;
      return Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    });
  };

  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleZoom(e.deltaY > 0 ? 'out' : 'in');
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;
    startPosRef.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const newX = e.clientX - startPosRef.current.x;
    const newY = e.clientY - startPosRef.current.y;

    if (!hasDraggedRef.current && (Math.abs(newX - offset.x) > 5 || Math.abs(newY - offset.y) > 5)) {
      hasDraggedRef.current = true;
    }

    setOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!hasDraggedRef.current && e.target === containerRef.current) {
        onDeselect();
    }
  }

  const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab';

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto aspect-square p-2 sm:p-4 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl mt-8 animate-fade-in ${cursorClass} overflow-hidden touch-none`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drag if mouse leaves container
      onWheel={handleWheel}
      onClick={handleClick}
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .touch-none { touch-action: none; }
      `}</style>
      
      <div
        className="h-full w-full"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          transformOrigin: 'center',
        }}
      >
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-1 sm:gap-2">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelectPlace}
              isSelected={place.id === selectedPlaceId}
            />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 -z-10 pointer-events-none">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border-r border-b border-slate-700/50"></div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button onClick={() => handleZoom('in')} className="bg-slate-700/80 hover:bg-slate-600 rounded-full p-2 text-white shadow-lg transition-colors" aria-label="Zoom in">
          <PlusIcon className="w-5 h-5" />
        </button>
        <button onClick={() => handleZoom('out')} className="bg-slate-700/80 hover:bg-slate-600 rounded-full p-2 text-white shadow-lg transition-colors" aria-label="Zoom out">
          <MinusIcon className="w-5 h-5" />
        </button>
        <button onClick={handleReset} className="bg-slate-700/80 hover:bg-slate-600 rounded-full p-2 text-white shadow-lg transition-colors mt-2" aria-label="Reset view">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
