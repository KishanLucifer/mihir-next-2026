import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/lib/client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: string | Record<string, unknown>) {
  return builder.image(source);
}
