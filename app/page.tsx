import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { getFeaturedPhotos } from "@/lib/sanity.actions";

export default async function Home() {
  const photos = await getFeaturedPhotos();

  return (
    <>
      <Header />
      <Hero />
      <Featured photos={photos} />
      {/* <Category /> */}
    </>
  );
}
