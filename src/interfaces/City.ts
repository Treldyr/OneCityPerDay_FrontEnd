import type { Curiosity } from "./Curiosity";
import type { Photo } from "./Photo";

export interface City {
  id: number;
  cityNameFr: string;
  cityNameEn: string;
  countryNameFr: string;
  countryNameEn: string;
  date: string; // LocalDate → string en JSON
  descriptionFr: string[];
  descriptionEn: string[];
  curiosities: Curiosity[];
  photos: Photo[];
}
