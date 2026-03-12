import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import {
  getCategories,
  getFeaturedPhotos,
  getVideos,
} from "@/lib/sanity.actions";
import Category from "@/components/Category";
import Footer from "@/components/Footer";

export default async function Home() {
  const photos = await getFeaturedPhotos();
  const categories = await getCategories();
  // const videos = await getVideos();

  return (
    <>
      <Hero />
      <Featured photos={photos} />
      <Category categories={categories} />

      {/* <About /> */}
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
