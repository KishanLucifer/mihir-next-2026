import { getCategoryBySlug, getPhotosByCategory } from "@/lib/sanity.actions";
import Gallery from "./Gallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  // const resolvedParams = await params;

  const category = await getCategoryBySlug(slug);
  const photos = await getPhotosByCategory(slug);

  return <Gallery category={category} photos={photos} />;
}
