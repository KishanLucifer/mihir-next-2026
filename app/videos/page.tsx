import { sanityFetch } from "@/lib/sanity.fetch";
import Videos from "./Videos";
import { getVideos } from "@/lib/sanity.actions";
import { Video } from "@/typings";

export const revalidate = 60; // ISR

export default async function VideosPage() {
  const videos: Video[] = await getVideos();

  return <Videos videos={videos} />;
}
