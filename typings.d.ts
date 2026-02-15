import type { Image } from "sanity";

export interface Category {
  _id: string;
  title: string;
  name: string;
  description?: string;
  coverImage: string;
  slug: string;
}

export interface Photo {
  _id: string;
  title: string;
  story?: string;
  description?: string;
  location?: string;
  place?: string;
  dateTaken?: string;
  image: string;
  imageUrl: string;
  url?: string;
  isFeatured?: boolean;
  slug: string;
  Gallery: Array;
  category?: {
    _id: string;
    type: CategoryRef;
    title: string;
    slug: string;
  };
  isFeatured?: boolean;
}
