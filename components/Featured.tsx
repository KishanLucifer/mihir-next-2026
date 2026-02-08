import { urlFor } from "@/sanity/lib/image";
import { Photo } from "@/typings";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface FeaturedProps {
  photos: Photo[];
}

export default function Featured({ photos }: FeaturedProps) {
  return (
    <>
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold">Featured Captures</h2>
            <p className="text-muted-foreground">
              Curated selection of finest moments.
            </p>
          </div>

          <Link
            href="/galleries"
            className="flex items-center gap-2 text-primary">
            View All <MoveRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Link
              key={photo._id}
              href={`/photo/${photo._id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={urlFor(photo.image).width(800).height(1000).url()}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{photo.title}</h3>
                <p className="text-sm text-white/80 line-clamp-2">
                  {photo.story}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
