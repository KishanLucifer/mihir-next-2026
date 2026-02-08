"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/typings";

export default function Galleries({ categories }: { categories: Category[] }) {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">
            Collections
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Visual Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse collections categorized by species.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Link
                href={`/gallery/${category._id}`}
                className="group block space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={urlFor(category.coverImage).width(1600).url()}
                    alt={category.title || "Gallery cover image"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="px-2">
                  <h2 className="text-3xl font-display font-bold">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { useCategories } from "@/hooks/use-content";
// import { ArrowUpRight } from "lucide-react";

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
