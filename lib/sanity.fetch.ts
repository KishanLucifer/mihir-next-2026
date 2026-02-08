// import { sanityClient } from "../sanity/lib/client";
// import { FEATURED_PHOTOS_QUERY, CATEGORIES_QUERY } from "./sanity.queries";

// export async function getFeaturedPhotos() {
//   return sanityClient.fetch(FEATURED_PHOTOS_QUERY);
// }

// export async function getCategories() {
//   return sanityClient.fetch(CATEGORIES_QUERY);
// }
// lib/sanity.fetch.ts
import { sanityClient } from "@/sanity/lib/client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  return sanityClient.fetch(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
