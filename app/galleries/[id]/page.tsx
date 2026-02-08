// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import Link from "next/link";

// export default function Galleries() {
//   const { data: categories, isLoading } = useCategories();

//   return (
//     <div className="pt-32 pb-24 min-h-screen">
//       <div className="container mx-auto px-4 md:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16">
//           <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">
//             Collections
//           </span>
//           <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
//             Visual Stories
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Browse collections categorized by species. Each gallery tells a
//             unique story of survival, beauty, and the raw essence of nature.
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="aspect-video bg-muted/30 animate-pulse rounded-2xl"
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {categories?.map((category, index) => (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}>
//                 <Link
//                   href={`/gallery/${category.id}`}
//                   className="group block space-y-4">
//                   <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-lg">
//                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
//                     <img
//                       src={category.coverImageUrl}
//                       alt={category.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <div className="absolute top-4 right-4 z-20 bg-background/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white">
//                       <ArrowUpRight className="w-5 h-5" />
//                     </div>
//                   </div>

//                   <div className="px-2">
//                     <h2 className="text-3xl font-display font-bold group-hover:text-primary transition-colors flex items-center gap-3">
//                       {category.name}
//                       <span className="h-px bg-border flex-1 ml-4 group-hover:bg-primary/30 transition-colors"></span>
//                     </h2>
//                     <p className="text-muted-foreground mt-2 text-lg">
//                       {category.description}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import { getCategories } from "@/lib/sanity.actions";
// import Galleries from "@/components/Galleries";
// import { Category } from "@/typings";

// export default async function GalleriesPage() {
//   const categories: Category[] = await getCategories();

//   return <Galleries categories={categories} />;
// }
import { getCategoryById, getPhotosByCategory } from "@/lib/sanity.actions";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default async function GalleryDetail({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategoryById(params.id);
  const photos = await getPhotosByCategory(params.id);

  if (!category) {
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Category not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <Link
          href="/galleries"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Galleries
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {category.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo: (typeof photos)[0]) => (
          <Link
            key={photo._id}
            href={`/photo/${photo._id}`}
            className="block break-inside-avoid overflow-hidden rounded-xl">
            <Image
              src={photo.imageUrl}
              alt={photo.title || "Gallery photo"}
              width={1200}
              height={1200}
              className="w-full h-auto object-cover hover:scale-105 transition"
            />
          </Link>
        ))}

        {photos.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No photos in this gallery yet.
          </div>
        )}
      </div>
    </div>
  );
}
