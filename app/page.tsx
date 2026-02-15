import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { getCategories, getFeaturedPhotos } from "@/lib/sanity.actions";
import Category from "@/components/Category";

export default async function Home() {
  const photos = await getFeaturedPhotos();
  const categories = await getCategories();

  return (
    <>
      <Header />
      <Hero />
      <Featured photos={photos} />
      <Category categories={categories} />
      {/* <Video /> */}
      {/* <About /> */}
      {/* <Contact /> */}
    </>
  );
}
