import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";

export default function GalleryDetail() {
  const params = useParams();
  const categoryId = params.id ? parseInt(params.id) : 0;

  const { data: category, isLoading: isLoadingCategory } =
    useCategory(categoryId);
  const { data: photos, isLoading: isLoadingPhotos } = usePhotos(
    String(categoryId)
  );

  if (isLoadingCategory || isLoadingPhotos) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!category)
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Category not found
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <Link
          href="/galleries"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Galleries
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos?.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="break-inside-avoid">
              <Link
                href={`/photo/${photo.id}`}
                className="group block relative rounded-xl overflow-hidden mb-6 bg-card">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {photo.story}
                  </p>
                </div>
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
            </motion.div>
          ))}

          {photos?.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No photos in this gallery yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
