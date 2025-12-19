export default interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: string;
  photos?: string[];
}

export interface TripStatistics {
  totalTrips: number;
  totalPhotos: number;
  totalCountries: number;
}
