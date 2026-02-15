import { sanityClient } from "@/sanity/lib/client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  return sanityClient.fetch(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
