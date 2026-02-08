"use client";
import Link from "next/link";
// import { usePhoto, usePhotos } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Photo } from "@/typings";
import Image from "next/image";
import { urlFor } from "@/lib/saniyty.image";

export default function PhotoDetail({
  photo,
  relatedPhotos,
}: {
  photo: Photo;
  relatedPhotos: Photo[];
}) {
  // if (isLoading) return <div className="h-screen bg-background" />;
  // if (!photo)
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       Photo not found
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close Button */}
      <Link
        href={`/gallery/${photo.category._id}`}
        className="fixed top-24 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Main Image Stage */}
      <div className="h-[85vh] w-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
        <Image
          src={urlFor(photo.image).width(1600).url()}
          alt={photo.title}
          width={1600}
          height={1200}
          unoptimized
          className="max-h-full max-w-full object-contain shadow-2xl"
        />
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 relative -mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                {photo.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                {photo.dateTaken && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {format(new Date(photo.dateTaken), "MMMM d, yyyy")}
                  </div>
                )}
                {photo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {photo.location}
                  </div>
                )}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <h3 className="text-xl font-bold text-primary mb-4 font-display">
              The Story
            </h3>
            <p className="leading-relaxed text-white/80 whitespace-pre-wrap">
              {photo.story}
            </p>
          </div>
        </motion.div>

        {/* More from collection */}
        {relatedPhotos && relatedPhotos.length > 1 && (
          <div className="mt-24">
            <h3 className="text-2xl font-display font-bold mb-8 text-center">
              More from this Collection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPhotos
                .filter((p) => p._id !== photo._id)
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p._id}
                    href={`/photo/${p._id}`}
                    className="aspect-square rounded-lg overflow-hidden group relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <Image
                      src={urlFor(photo.image).width(1600).url()}
                      width={1600}
                      height={1200}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ("use client");

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowLeft, Calendar, MapPin } from "lucide-react";
// import { format } from "date-fns";
// import { Photo } from "@/typings";
// import Image from "next/image";
// import { urlFor } from "@/lib/saniyty.image";

// export default function PhotoClient({
//   photo,
//   relatedPhotos,
// }: {
//   photo: Photo;
//   relatedPhotos: Photo[];
// }) {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Link
//         href={`/gallery/${photo.category._id}`}
//         className="fixed top-24 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full">
//         <ArrowLeft className="w-6 h-6" />
//       </Link>

//       {/* Image */}
//       <div className="h-[85vh] flex items-center justify-center bg-zinc-900">
//         <Image
//           src={urlFor(photo.image).width(1600).url()}
//           alt={photo.title}
//           width={1600}
//           height={1200}
//           unoptimized
//           className="max-h-full max-w-full object-contain"
//         />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-12 -mt-20">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold mb-4">{photo.title}</h1>

//           <div className="flex gap-6 text-white/60 mb-6">
//             {photo.dateTaken && (
//               <div className="flex items-center gap-2">
//                 <Calendar size={16} />
//                 {format(new Date(photo.dateTaken), "MMMM d, yyyy")}
//               </div>
//             )}
//             {photo.location && (
//               <div className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 {photo.location}
//               </div>
//             )}
//           </div>

//           <p className="text-white/80 whitespace-pre-wrap">{photo.story}</p>
//         </motion.div>

//         {relatedPhotos?.length > 1 && (
//           <div className="mt-24">
//             <h3 className="text-2xl font-bold mb-8 text-center">
//               More from this Collection
//             </h3>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedPhotos
//                 .filter((p) => p._id !== photo._id)
//                 .slice(0, 4)
//                 .map((p) => (
//                   <Link key={p._id} href={`/photo/${p._id}`}>
//                     <Image
//                       src={urlFor(photo.image).width(1600).url()}
//                       width={1600}
//                       height={1200}
//                       alt={p.title}
//                       className="rounded-lg"
//                       unoptimized
//                     />
//                   </Link>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
