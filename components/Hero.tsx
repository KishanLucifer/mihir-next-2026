// import { Link } from "wouter";
// import { motion } from "framer-motion";
// import { ArrowRight, MoveRight, Camera } from "lucide-react";
// import { usePhotos, useCategories } from "@/hooks/use-content";

// export default function Home() {
//   const { data: FEATURED_PHOTOS_QUERY } = usePhotos(undefined, "true");
//   const { data: categories } = useCategories();

//   // Animations
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const stagger = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Image - Dynamic if available, else static placeholder */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute inset-0 bg-black/40 z-10" />
//           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

//           {/* Use Unsplash image as placeholder for Hero */}
//           {/* majestic eagle landing on water */}
//           <img
//             src="https://images.unsplash.com/photo-1480044965905-02098d419e96?q=80&w=2070&auto=format&fit=crop"
//             alt="Hero Background"
//             className="w-full h-full object-cover scale-105 animate-pulse-slow"
//           />
//         </div>

//         <div className="container relative z-20 px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter drop-shadow-lg">
//               Through the <span className="text-primary italic">Wild</span> Lens
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
//               Witness the untold stories of nature. Capturing fleeting moments of the wild in their purest form.
//             </p>

//             <div className="flex flex-col md:flex-row gap-4 justify-center">
//               <Link
//                 href="/galleries"
//                 className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
//               >
//                 Explore Galleries
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link
//                 href="/about"
//                 className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-all flex items-center justify-center"
//               >
//                 Meet the Photographer
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Featured Work Section */}
//       <section className="py-24 bg-background relative z-10">
//         <div className="container mx-auto px-4 md:px-6">
//           <motion.div
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             variants={fadeIn}
//             className="flex justify-between items-end mb-12"
//           >
//             <div>
//               <h2 className="text-4xl font-display font-bold mb-2">Featured Captures</h2>
//               <p className="text-muted-foreground">Curated selection of my finest moments.</p>
//             </div>
//             <Link href="/galleries" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
//               View All <MoveRight className="w-4 h-4" />
//             </Link>
//           </motion.div>

//           {/* Masonry-style Grid for Featured */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {FEATURED_PHOTOS_QUERY && FEATURED_PHOTOS_QUERY.length > 0 ? (
//               FEATURED_PHOTOS_QUERY.slice(0, 3).map((photo, index) => (
//                 <motion.div
//                   key={photo.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
//                 >
//                   <Link href={`/photo/${photo.id}`}>
//                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
//                     <img
//                       src={photo.url}
//                       alt={photo.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                       <span className="text-xs font-bold text-primary tracking-wider uppercase mb-1 block">Featured</span>
//                       <h3 className="text-2xl font-display font-bold text-white mb-2">{photo.title}</h3>
//                       <p className="text-white/80 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
//                         {photo.story}
//                       </p>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))
//             ) : (
//               // Empty state / Loading placeholders
//               [1, 2, 3].map((i) => (
//                 <div key={i} className="aspect-[4/5] bg-muted/20 animate-pulse rounded-xl" />
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-24 bg-card/50 backdrop-blur-sm border-t border-border/40">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Explore by Category</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Dive into specific collections categorized by species and habitat.
//             </p>
//           </div>

//           <motion.div
//             variants={stagger}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {categories?.map((cat) => (
//               <motion.div variants={fadeIn} key={cat.id}>
//                 <Link href={`/gallery/${cat.id}`} className="group block relative aspect-square rounded-2xl overflow-hidden border border-white/5">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
//                   <img
//                     src={cat.coverImageUrl}
//                     alt={cat.name}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
//                   />
//                   <div className="absolute bottom-6 left-6 z-20">
//                     <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
//                     <p className="text-white/60 text-sm group-hover:text-white/90 transition-colors">{cat.description}</p>
//                   </div>
//                 </Link>
//               </motion.div>
//             )) || (
//               // Placeholder for categories
//               [1, 2, 3, 4].map((i) => (
//                 <div key={i} className="aspect-square bg-muted animate-pulse rounded-2xl" />
//               ))
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedPhotos, getCategories } from "@/lib/sanity.actions"; // Import the functions

export default async function Hero() {
  const [featuredPhotos, categories] = await Promise.all([
    getFeaturedPhotos(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1480044965905-02098d419e96"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            Through the <span className="text-primary italic">Wild</span> Lens
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Witness the untold stories of nature.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/galleries"
              className="px-8 py-4 bg-primary rounded-full text-white flex items-center gap-2">
              Explore Galleries <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
