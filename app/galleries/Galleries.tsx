"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Category, Photo } from "@/typings";
import photo from "@/sanity/schemaTypes/photo";
import Header from "@/components/Header";

interface GalleriesProps {
  categories: Category[];
  photo?: Photo;
  // relatedPhotos?: Photo[];
}

export default function Galleries({
  categories,
  photo,
  // relatedPhotos,
}: GalleriesProps) {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Header />
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
                href={`/galleries/${category.slug}`}
                className="group block space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={urlFor(category.coverImage).width(1600).url()}
                    alt={category.name || "Gallery cover image"}
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
                    {category.name}
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
