import type { Image } from "sanity";

export interface Category {
  _id: string;
  title: string;
  description?: string;
  coverImage: string;
}

export interface Photo {
  _id: string;
  title: string;
  story?: string;
  description?: string;
  location?: string;
  place?: string;
  dateTaken?: string;
  image: Image;
  isFeatured?: boolean;
  
  category?: CategoryRef;
}
