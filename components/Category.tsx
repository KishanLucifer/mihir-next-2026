"use client";
import { urlFor } from "@/lib/saniyty.image";
import Link from "next/link";
import type { Category } from "@/typings";

export default function Category({ categories }: { categories: Category[] }) {
  return (
    <>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/gallery/${cat.slug}`}
              className="relative aspect-square overflow-hidden rounded-2xl">
              <img
                src={urlFor(cat.coverImage).width(600).height(600).url()}
                className="w-full h-full object-cover"
                alt={cat.title}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{cat.title}</h3>
                <p className="text-sm text-white/70">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
