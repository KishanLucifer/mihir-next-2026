import { getPhotoBySlug } from "@/lib/sanity.actions";
import { sanityFetch } from "@/lib/sanity.fetch";
import type { Photo } from "@/typings";
import PhotoDetail from "./PhotoDetail";
import { notFound } from "next/navigation";

export default async function PhotoPage({
  params,
}: {
  params?: Promise<{ slug: string }>;
}) {
  // Next.js expects props.params to be a promise. We `await` it to get the actual
  // slug object. It should always be defined for this route.
  const { slug } = await params!;

  const photo = await getPhotoBySlug(slug);

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
