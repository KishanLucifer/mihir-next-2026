import { getCategories } from "@/lib/sanity.actions";
import Galleries from "@/components/Galleries";
import { Category } from "@/typings";

export default async function GalleriesPage() {
  const categories: Category[] = await getCategories();

  return <Galleries categories={categories} />;
}
