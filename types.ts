
export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapDetails {
  uri: string;
  title: string;
}

export interface MapGroundingChunk {
  maps: MapDetails;
}

export interface Place {
  id: string;
  title: string;
  uri: string;
  gridPosition: {
    rowStart: number;
    colStart: number;
  };
}
