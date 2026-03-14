import { sanityFetch } from "./sanity.fetch";
import { Photo, Category, Video, About, Contact } from "@/typings";

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
        name,
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
        gallery,
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
      "galleryUrls": gallery[].asset->url,
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

export async function getVideos() {
  return sanityFetch<Video[]>({
    query: `*[_type == "video"] | order(_createdAt desc) {
  _id,
  title,
  story,
  videoUrl,
  videoFile {
    asset->{
      _id,
      url
    }
  },
  // expose preview URL directly for easier consumption in the UI
  "previewImageUrl": previewImage.asset->url,
  category->{
    _id,
    title
  }
}
`,
    tags: ["video"],
    revalidate: 60,
  });
}

export function getAbout() {
  return sanityFetch<About[]>({
    query: `*[_type == "about"] {
  _id,
  name,
  bio,
  "avatarUrl": avatar.asset->url,
  "coverImageUrl": coverImage.asset->url,
  "logoUrl": logo.asset->url,
  achievements[]{title, year, description},
  articles[]{title, link, publication},
  books[]{title, link, year}
}
`,

    tags: ["about"],
    revalidate: 60,
  });
}

export function getContact() {
  return sanityFetch<Contact[]>({
    query: `*[_type == "contact"] {
  _id,
  name,
  bio,
  "avatarUrl": avatar.asset->url,
  "coverImageUrl": coverImage.asset->url,
  "logoUrl": logo.asset->url,
  achievements[]{title, year, description},
  articles[]{title, link, publication},
  books[]{title, link, year}
}
`,
    tags: ["contact"],
    revalidate: 60,
  });
}
