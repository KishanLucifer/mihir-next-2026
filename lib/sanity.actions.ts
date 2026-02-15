import { sanityFetch } from "./sanity.fetch";
import { Photo, Category } from "@/typings";

/* =========================
   FEATURED PHOTOS
========================= */
export function getFeaturedPhotos() {
  return sanityFetch<Photo[]>({
    query: `
      *[_type == "photo" && isFeatured == true]
      | order(dateTaken desc) {
        _id,
        title,
        "slug": slug.current,
        story,
        "image": image.asset->url
      }
    `,
    tags: ["photo", "featured"],
  });
}

/* =========================
   ALL CATEGORIES
========================= */
export function getCategories() {
  return sanityFetch<Category[]>({
    query: `
      *[_type == "category"]
      | order(title asc) {
        _id,
        title,
        name,
        description,
        coverImage,
        "slug": slug.current
      }
    `,
    tags: ["category"],
  });
}

/* =========================
   SINGLE CATEGORY BY SLUG
========================= */
export function getCategoryBySlug(slug: string) {
  return sanityFetch<Category>({
    query: `
      *[_type == "category" && slug.current == $slug][0]{
        _id,
        title,
        description,
        coverImage,
        "slug": slug.current
      }
    `,
    params: { slug },
    tags: ["category"],
  });
}

/* =========================
   PHOTOS BY CATEGORY SLUG
========================= */
export function getPhotosByCategory(slug: string) {
  return sanityFetch<Photo[]>({
    query: `
      *[_type == "photo" && category->slug.current == $slug]
      | order(dateTaken desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        Gallery,
        "image": image.asset->url
      }
    `,
    params: { slug },
    tags: ["photo"],
  });
}

/* =========================
   SINGLE PHOTO BY SLUG
========================= */
export function getPhotoBySlug(slug: string) {
  return sanityFetch<Photo>({
    query: `
      *[_type == "photo" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        story,
        description,
        location,
        dateTaken,
        "image": image.asset->url,
        category->{
          _id,
          title,
          "slug": slug.current
        }
      }
    `,
    params: { slug },
    tags: ["photo"],
  });
}
