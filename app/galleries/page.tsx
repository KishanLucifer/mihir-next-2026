import { getCategories } from "@/lib/sanity.actions";
import Galleries from "./Galleries";
import { Category } from "@/typings";
// import GalleryClient from "./GalleryClient";

export default async function GalleriesPage() {
  const categories: Category[] = await getCategories();

  return <Galleries categories={categories} />;
}
