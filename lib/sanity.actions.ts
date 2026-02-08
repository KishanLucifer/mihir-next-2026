// lib/sanity.actions.ts
import { sanityFetch } from "./sanity.fetch";
import { FEATURED_PHOTOS_QUERY, CATEGORIES_QUERY } from "./sanity.queries";
import { Photo, Category } from "@/typings";

export function getFeaturedPhotos() {
  return sanityFetch<Photo[]>({
    query: FEATURED_PHOTOS_QUERY,
    tags: ["photo", "featured"],
  });
}

export function getCategories() {
  return sanityFetch<Category[]>({
    query: CATEGORIES_QUERY,
    tags: ["category"],
  });
}

export async function getCategoryById(id: string) {
  return client.fetch(`*[_type=="category" && _id==$id][0]`, { id });
}

export async function getPhotosByCategory(categoryId: string) {
  return client.fetch(
    `*[_type=="photo" && category._ref==$categoryId]{
      _id,
      title,
      "imageUrl": image.asset->url
    }`,
    { categoryId }
  );
}
