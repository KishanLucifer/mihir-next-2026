import { sanityFetch } from "@/lib/sanity.fetch";
import type { Photo } from "@/typings";
import PhotoDetail from "./PhotoDetail";
import { notFound } from "next/navigation";

export default async function PhotoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const photo = await sanityFetch<Photo | null>({
    query: `
      *[_type == "photo" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        story,
        description,
        location,
        dateTaken,
        image,
        category->{
          _id,
          title,
          "slug": slug.current
        }
      }
    `,
    params: { slug },
    tags: ["photo", slug],
  });

  if (!photo) {
    notFound();
  }

  let relatedPhotos: Photo[] = [];

  if (photo.category?._id) {
    relatedPhotos = await sanityFetch<Photo[]>({
      query: `
        *[_type == "photo" 
          && category->_id == $categoryId 
          && slug.current != $slug]
        | order(dateTaken desc)[0...4]{
          _id,
          title,
          "slug": slug.current,
          image
        }
      `,
      params: {
        categoryId: photo.category._id,
        slug,
      },
      tags: ["photo", photo.category._id, slug],
    });
  }

  return <PhotoDetail photo={photo} relatedPhotos={relatedPhotos} />;
}
