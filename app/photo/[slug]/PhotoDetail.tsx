"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Share2, ChevronLeft, ChevronRight } from "lucide-react";
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
  const mainImageUrl = urlFor(photo.image).width(1600).url();
  const galleryUrls = photo.galleryUrls ?? [];
  const allImageUrls = useMemo(
    () => [mainImageUrl, ...galleryUrls],
    [mainImageUrl, galleryUrls]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = allImageUrls.length > 1;

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? allImageUrls.length - 1 : i - 1));
  };
  const goNext = () => {
    setCurrentIndex((i) => (i >= allImageUrls.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close Button */}
      <Link
        href={`/galleries`}
        className="fixed top-24 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Image Carousel (main + gallery from Sanity) */}
      <div className="h-[85vh] w-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={allImageUrls[currentIndex]}
              alt={currentIndex === 0 ? photo.title : `${photo.title} – image ${currentIndex + 1}`}
              width={1600}
              height={1200}
              unoptimized
              className="max-h-full max-w-full object-contain shadow-2xl select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next buttons */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/70 transition-all border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/70 transition-all border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-sm text-white/80 border border-white/10">
              {currentIndex + 1} / {allImageUrls.length}
            </div>
          </>
        )}

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
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
                    href={`/photo/${p.slug}`}
                    className="aspect-square rounded-lg overflow-hidden group relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <Image
                      src={p.image || "/placeholder.jpg"}
                      width={400}
                      height={400}
                      alt={p.title}
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
