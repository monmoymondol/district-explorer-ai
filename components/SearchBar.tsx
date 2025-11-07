
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (prompt: string) => void;
  isLoading: boolean;
  isReady: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, isReady }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading && isReady) {
      onSearch(prompt.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex gap-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={isReady ? "e.g., 'quiet parks with benches' or 'late night pizza'" : "Waiting for location..."}
        className="flex-grow bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 placeholder-slate-500 disabled:opacity-50"
        disabled={isLoading || !isReady}
      />
      <button
        type="submit"
        disabled={isLoading || !isReady || !prompt.trim()}
        className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/30"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : 'Explore'}
      </button>
    </form>
  );
};

export default SearchBar;
