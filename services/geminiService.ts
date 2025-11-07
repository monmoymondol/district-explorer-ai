
import { GoogleGenAI } from "@google/genai";
import type { Location, MapGroundingChunk, Place } from '../types';

// Helper to generate a unique enough ID
const generateId = (): string => Math.random().toString(36).substring(2, 11);

// Helper to get random grid positions, minimizing overlaps for better visualization.
const generateUniqueGridPositions = (count: number, gridSize: number): Array<{ rowStart: number; colStart: number }> => {
    const positions = new Set<string>();
    const maxAttempts = count * 5; 
    let attempts = 0;

    while (positions.size < count && attempts < maxAttempts) {
        const row = Math.floor(Math.random() * gridSize) + 1;
        const col = Math.floor(Math.random() * gridSize) + 1;
        positions.add(`${row}-${col}`);
        attempts++;
    }
    
    return Array.from(positions).map(p => {
        const [row, col] = p.split('-').map(Number);
        return { rowStart: row, colStart: col };
    });
};

export const fetchDistrictFeatures = async (
  prompt: string,
  location: Location
): Promise<{ summary: string; places: Place[] }> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fullPrompt = `Based on the user's request, find relevant places in a single, well-defined district or neighborhood near their location. Provide a brief, engaging one-paragraph summary of the district and the types of places found. User request: "${prompt}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      }
    });

    const summary = response.text;
    const groundingChunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as MapGroundingChunk[]) || [];
    
    const validPlaces = groundingChunks
        .filter(chunk => chunk.maps?.uri && chunk.maps?.title)
        .map(chunk => chunk.maps);

    // Remove duplicates based on URI
    const uniquePlaces = Array.from(new Map(validPlaces.map(p => [p.uri, p])).values());

    const gridSize = 8; // Use a slightly larger grid for better spacing
    const positions = generateUniqueGridPositions(uniquePlaces.length, gridSize);

    const places: Place[] = uniquePlaces.map((place, index) => ({
      id: generateId(),
      title: place.title,
      uri: place.uri,
      gridPosition: positions[index] || { rowStart: 1, colStart: 1 } // Fallback position
    }));
    
    return { summary, places };

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw new Error("Failed to generate district map. The AI model might be busy. Please try again.");
  }
};
