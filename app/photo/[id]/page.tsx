// import { sanityFetch } from "@/lib/sanity.fetch";
// import { getFeaturedPhotos, getCategories } from "@/lib/sanity.actions";
// import PhotoDeail from "@/components/PhotoDetail";

// export default async function PhotoPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const photo = await sanityFetch<any>({
//     query: getFeaturedPhotos(),
//     params: { id: params.id },
//     tags: ["photo", params.id],
//   });

//   if (!photo) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Photo not found
//       </div>
//     );
//   }

//   const relatedPhotos = await sanityFetch<any[]>({
//     query: getCategories(),
//     params: { categoryId: photo.category._id },
//     tags: ["photo", "category"],
//   });

//   return <PhotoDeail photo={photo} relatedPhotos={relatedPhotos} />;
// }
import { sanityFetch } from "@/lib/sanity.fetch";
import { PHOTO_BY_ID_QUERY, CATEGORIES_QUERY } from "@/lib/sanity.queries";
import type { Photo } from "@/typings";
import PhotoDetail from "@/components/PhotoDetail";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ REQUIRED

  const photo = await sanityFetch<Photo>({
    query: PHOTO_BY_ID_QUERY,
    params: { id },
    tags: ["photo", id],
  });

  if (!photo) {
    return (
      <div className="h-screen flex items-center justify-center">
        Photo not found
      </div>
    );
  }

  const relatedPhotos = await sanityFetch<Photo[]>({
    query: CATEGORIES_QUERY,
    params: { categoryId: photo.category?._id },
    tags: ["photo", "category"],
    // tags: ["photo", "related", photo._id],
  });

  return <PhotoDetail photo={photo} relatedPhotos={relatedPhotos} />;
}
