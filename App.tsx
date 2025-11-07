import React, { useState, useEffect } from 'react';
import { Place, Location } from './types';
import { fetchDistrictFeatures } from './services/geminiService';
import SearchBar from './components/SearchBar';
import { MapGrid } from './components/MapGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { PlaceDetailCard } from './components/PlaceDetailCard';

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Geolocation access was denied. Please enable it in your browser settings to use this app.");
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleSearch = async (prompt: string) => {
    if (!location) {
        setError("Your location is not available. Cannot perform search.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setPlaces([]);
    setSummary('');
    setSelectedPlace(null);

    try {
      const result = await fetchDistrictFeatures(prompt, location);
      setSummary(result.summary);
      setPlaces(result.places);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(prev => (prev?.id === place.id ? null : place));
  };

  const handleDeselect = () => {
    setSelectedPlace(null);
  };
  
  const renderContent = () => {
    if (isLoading) {
        return <LoadingSpinner message="Generating your custom district map..." />;
    }
    if (error) {
        return <ErrorMessage title="An Error Occurred" message={error} />;
    }
    if (places.length > 0) {
        return (
            <div className="w-full max-w-4xl mx-auto animate-fade-in">
                <p className="text-center text-slate-300 bg-slate-800/50 p-4 rounded-lg border border-slate-700">{summary}</p>
                <MapGrid 
                  places={places} 
                  onSelectPlace={handleSelectPlace}
                  onDeselect={handleDeselect}
                  selectedPlaceId={selectedPlace?.id ?? null}
                />
            </div>
        );
    }
    return (
        <div className="text-center text-slate-400 mt-8">
            <h2 className="text-2xl font-bold text-slate-200">Welcome to the District Explorer!</h2>
            <p className="mt-2 max-w-2xl mx-auto">Tell me what you're looking for, and I'll create a mini-map of a nearby district just for you.</p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-4 sm:p-8 flex flex-col items-center">
      <style>{`
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          District Explorer AI
        </h1>
        <p className="text-slate-400 mt-2">Your personalized local guide, powered by Gemini.</p>
      </header>
      
      <main className="w-full flex-grow flex flex-col items-center">
        {locationError && <ErrorMessage title="Location Error" message={locationError} />}
        {isGettingLocation && !locationError && <LoadingSpinner message="Getting your location..." />}
        
        <div className="w-full sticky top-4 z-10 bg-slate-900/50 backdrop-blur-sm py-4 rounded-xl">
             <SearchBar onSearch={handleSearch} isLoading={isLoading} isReady={!!location} />
        </div>
        
        {selectedPlace && (
          <div className="w-full my-4">
             <PlaceDetailCard place={selectedPlace} onClose={handleDeselect} />
          </div>
        )}

        <div className="w-full mt-2">
          {renderContent()}
        </div>
      </main>
      
      <footer className="text-center text-slate-600 mt-12 text-sm">
        <p>Map data grounded by Google Maps.</p>
      </footer>
    </div>
  );
}

export default App;
